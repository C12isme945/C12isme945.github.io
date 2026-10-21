"""先验中心下的可检验预测: (1) 寡糖链长台阶 (2) 盐梯度 (3) HA 浓度
观测量: 有效 CAC(ppm, 聚集态占 50% 的总肽浓度) 与 3 ppm 时模板簇占比"""
import os, sys, json
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RESULTS_DIR = os.path.join(os.path.dirname(BASE_DIR), 'results')
os.makedirs(RESULTS_DIR, exist_ok=True)
sys.path.insert(0, BASE_DIR)
from l0_model import speciation, effective_cac, ppm_to_M, MR_DISACC
from multiprocessing import Pool
TH = dict(logK=4.3, logomega=2.0, n_site=2, logKe=4.16, logsigma=-3.0, n_nuc=5, Z_rel=1.8, dG_template=-6.0)
def job(a):
    kind, dp, cHA, I = a
    MW = dp/2*MR_DISACC
    cac = effective_cac(cHA, MW, I, TH)
    ft = speciation(ppm_to_M(3.0), cHA, MW, I, TH)['f_HA_templated']
    return dict(kind=kind, dp=dp, MW_kDa=round(MW/1e3,2), cHA_gL=cHA, I_mM=I*1e3, CAC_ppm=cac, f_tmpl_3ppm=ft)
if __name__ == '__main__':
    jobs = [('oligo', dp, c, 0.01) for c in (1.0, 0.1) for dp in (8, 12, 16, 18, 20, 24, 30, 40, 50)]
    jobs += [('salt', 1994, 1.0, I) for I in (0.001, 0.01, 0.05, 0.1, 0.15)]
    jobs += [('water', 2, 0.0, 0.01)]
    with Pool(2) as p: res = p.map(job, jobs)
    json.dump(res, open(os.path.join(RESULTS_DIR, 'oligo_salt_pred.json'),'w'), indent=1)
    for r in res:
        print(f"{r['kind']:5} dp={r['dp']:>5} MW={r['MW_kDa']:>7} kDa HA={r['cHA_gL']:>4} g/L I={r['I_mM']:>5.0f} mM  CAC={r['CAC_ppm']:8.2f} ppm  f_tmpl(3ppm)={r['f_tmpl_3ppm']:.3f}")
