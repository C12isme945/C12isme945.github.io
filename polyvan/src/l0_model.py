"""
L0: 配方使用浓度下的物种分布解析模拟器
HA(有限链聚阴离子) + 阳离子脂肽(Pal-KTTKS) 耦合平衡

核心: 有限链精确转移矩阵/DP  ->  HA分子量以链长(位点数)精确进入模型
      模板化成核 = 长run中配体获得额外稳定化  ->  有效CAC下降
"""
import numpy as np
from scipy.optimize import brentq

R_GAS = 8.314462618e-3   # kJ/(mol K)
T_REF = 298.15
MR_DISACC = 401.3        # HA二糖单元, 每单元1个COO-
MR_PEP    = 802.1        # Pal-KTTKS

# ---------------------------------------------------------------- 有限链 DP
def chain_partition(N_sites, s, omega, n_site, n_nuc, t_nuc):
    """
    1D有限格点, 配体占n_site个连续位点, 近邻配体间协同因子omega,
    连续run长度>=n_nuc的配体每个额外获得t_nuc稳定化(模板成核).
    返回 ln Z (对数配分函数), 数值稳定.
    DP: g[i]=位点i空; f[i][r]=有配体恰好终止于i且当前run长(封顶n_nuc)
    """
    Rcap = max(1, int(n_nuc))
    g = np.zeros(N_sites + 1)
    f = np.zeros((N_sites + 1, Rcap + 1))
    g[0] = 1.0
    logscale = 0.0
    for i in range(1, N_sites + 1):
        g[i] = g[i-1] + f[i-1, 1:Rcap+1].sum()
        if i >= n_site:
            j = i - n_site
            # run长度1: 前一位点为空
            f[i, 1] = s * g[j]
            # run长度 2..Rcap-1
            for r in range(2, Rcap):
                f[i, r] = s * omega * f[j, r-1]
            if Rcap >= 2:
                # 达到成核长度: 对整个核回溯性给予 t^n_nuc
                reach = s * omega * f[j, Rcap-1] * (t_nuc ** Rcap)
                # 已在核内继续延长: 每个额外配体得 t
                stay  = s * omega * f[j, Rcap] * t_nuc
                f[i, Rcap] = reach + stay
            else:
                f[i, 1] = f[i, 1] * t_nuc
        # 防溢出: 逐步归一
        m = max(g[i], f[i].max())
        if m > 1e250 or (m < 1e-250 and m > 0):
            sc = 1.0 / m
            g[:i+1] *= sc; f[:i+1] *= sc
            logscale -= np.log(sc)
    Z = g[N_sites] + f[N_sites, 1:Rcap+1].sum()
    return np.log(Z) + logscale


def chain_observables(N_sites, s, omega, n_site, n_nuc, t_nuc, h=1e-4):
    """数值微分取 <配体数/链> 和 <核内配体数/链>"""
    lnZ = chain_partition(N_sites, s, omega, n_site, n_nuc, t_nuc)
    lp  = chain_partition(N_sites, s*(1+h), omega, n_site, n_nuc, t_nuc)
    lm  = chain_partition(N_sites, s*(1-h), omega, n_site, n_nuc, t_nuc)
    m_bound = (lp - lm) / (2*h)                      # s dlnZ/ds
    if t_nuc > 0:
        tp = chain_partition(N_sites, s, omega, n_site, n_nuc, t_nuc*(1+h))
        tm = chain_partition(N_sites, s, omega, n_site, n_nuc, t_nuc*(1-h))
        m_nuc = (tp - tm) / (2*h)
    else:
        m_nuc = 0.0
    return lnZ, max(m_bound, 0.0), max(m_nuc, 0.0)


# ------------------------------------------------- 自由溶液成核-延长自组装
def free_aggregate_monomers(c_f, K_e, sigma, n_nuc):
    """协同聚合: j>=n_nuc 的聚集体 [A_j]=sigma*K_e^(j-1)*c_f^j
       返回聚集体中的单体总浓度(M). CAC ~ 1/K_e"""
    y = K_e * c_f
    if y >= 0.999:
        y = 0.999
    nn = int(n_nuc)
    # sum_{j>=nn} j y^j = y^nn * (nn - (nn-1)y) / (1-y)^2
    ssum = (y**nn) * (nn - (nn-1)*y) / (1-y)**2
    return (sigma / K_e) * ssum


# -------------------------------------------------------------- 盐依赖
def salt_scaling(K0, omega0, ionic_M, Z_rel, I_ref=0.01):
    """反离子释放: K ~ I^(-Z_rel);  协同性同样被屏蔽"""
    I = max(ionic_M, 1e-4)
    fac = (I / I_ref) ** (-Z_rel)
    K = K0 * fac
    om = 1.0 + (omega0 - 1.0) * (I / I_ref) ** (-0.5 * Z_rel)
    return K, max(om, 1.0)


# -------------------------------------------------------- 主求解: 物种分布
def speciation(c_pep_tot, c_HA_gL, MW_HA, ionic_M, theta):
    """
    theta: dict(logK, logomega, n_site, logKe, logsigma, n_nuc, Z_rel, dG_template)
    返回各物种浓度(M)与占比
    """
    K0   = 10**theta['logK']
    om0  = 10**theta['logomega']
    nst  = int(round(theta['n_site']))
    K_e  = 10**theta['logKe']
    sig  = 10**theta['logsigma']
    nnuc = int(round(theta['n_nuc']))
    t    = np.exp(-theta['dG_template'] / (R_GAS * T_REF))

    K, om = salt_scaling(K0, om0, ionic_M, theta['Z_rel'])

    if c_HA_gL > 0:
        N_sites   = max(int(round(MW_HA / MR_DISACC)), 1)
        c_chain   = c_HA_gL / MW_HA          # mol/L 链
    else:
        N_sites, c_chain = 1, 0.0

    def massbal(log_cf):
        c_f = 10**log_cf
        c_agg = free_aggregate_monomers(c_f, K_e, sig, nnuc)
        if c_chain > 0:
            _, m_b, _ = chain_observables(N_sites, K*c_f, om, nst, nnuc, t)
            c_bound = c_chain * m_b
        else:
            c_bound = 0.0
        return np.log10(max(c_f + c_agg + c_bound, 1e-30)) - np.log10(c_pep_tot)

    lo, hi = -14.0, np.log10(c_pep_tot)
    try:
        log_cf = brentq(massbal, lo, hi, xtol=1e-9, rtol=1e-12, maxiter=200)
    except ValueError:
        log_cf = hi
    c_f = 10**log_cf

    c_agg = free_aggregate_monomers(c_f, K_e, sig, nnuc)
    if c_chain > 0:
        _, m_b, m_n = chain_observables(N_sites, K*c_f, om, nst, nnuc, t)
        c_bound = c_chain * m_b
        c_tmpl  = c_chain * m_n           # 模板化多价簇中的肽
        c_bmono = c_bound - c_tmpl
        occupancy = m_b * nst / N_sites
    else:
        c_bound = c_tmpl = c_bmono = 0.0
        m_b = m_n = occupancy = 0.0

    tot = c_f + c_agg + c_bound
    return dict(
        c_free_monomer = c_f,
        c_free_aggregate = c_agg,
        c_HA_bound_monomer = max(c_bmono, 0.0),
        c_HA_templated_cluster = c_tmpl,
        f_free_monomer = c_f/tot,
        f_free_aggregate = c_agg/tot,
        f_HA_bound_monomer = max(c_bmono,0.0)/tot,
        f_HA_templated = c_tmpl/tot,
        peptides_per_chain = m_b,
        peptides_in_nuclei_per_chain = m_n,
        lattice_occupancy = occupancy,
        N_sites = N_sites,
        chain_conc_M = c_chain,
    )


def ppm_to_M(ppm, Mr=MR_PEP):
    return ppm * 1e-3 / Mr        # ppm = mg/L

def M_to_ppm(M, Mr=MR_PEP):
    return M * Mr * 1e3


# ------------------------------------------------- 有效CAC (探针可观测量)
def effective_cac(c_HA_gL, MW_HA, ionic_M, theta, lo_ppm=0.01, hi_ppm=500.0):
    """定义: 聚集态(自由聚集体+模板簇)占总肽50%的总浓度 -> 对应探针拐点"""
    def g(lp):
        sp = speciation(ppm_to_M(10**lp), c_HA_gL, MW_HA, ionic_M, theta)
        return (sp['f_free_aggregate'] + sp['f_HA_templated']) - 0.5
    a, b = np.log10(lo_ppm), np.log10(hi_ppm)
    ga, gb = g(a), g(b)
    if ga > 0: return lo_ppm
    if gb < 0: return np.nan
    return 10**brentq(g, a, b, xtol=1e-6)
