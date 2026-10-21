"""
用 LLM 的核心架构(因果掩码 Transformer, 自回归分解)求解 HA链上肽的玻尔兹曼分布
p(s) = prod_i p(s_i | s_<i)   <-- 与 GPT 预测下一个token完全同构
训练目标: 最小化变分自由能 F_q = E_q[E(s)] + kT*E_q[ln q(s)]  >=  F_exact
无需任何训练数据: 能量函数本身即监督信号

验证策略: 先在近邻模型上(有精确DP解)对照, 再加远程耦合(DP失效)
"""
import torch, torch.nn as nn, numpy as np, math, time
torch.manual_seed(0); np.random.seed(0)
torch.set_num_threads(2)

N = 20           # 位点数(穷举 2^20 精确对照)
mu, J = -1.0, 2.0   # 化学势(单位kT), 近邻协同耦合(单位kT)

def energy(s, J_long=0.0, lc=None):
    """s: (B,N) in {0,1}. 近邻协同 + 可选远程(成环)耦合"""
    e = -mu*s.sum(1) - J*(s[:,1:]*s[:,:-1]).sum(1)
    if J_long != 0.0:
        # 远程耦合: |i-j|>=3 的占据对, 权重~接触概率 ∝ |i-j|^-1.5
        e = e - J_long * torch.einsum('bi,ij,bj->b', s, lc, s)
    return e

# ------------------- 精确解: 穷举 2^24 = 1677万构型 (分块) -------------------
def exact(J_long=0.0, lc=None):
    tot = 2**N; chunk = 2**20
    logZ_parts=[]; mean_occ_num=0.0; Zsum=None
    bits = (1 << torch.arange(N))
    lZ = -float('inf'); acc_occ = 0.0; acc_w=0.0
    ws=[]; occs=[]
    for start in range(0, tot, chunk):
        idx = torch.arange(start, min(start+chunk, tot))
        s = ((idx[:,None] & bits) > 0).float()
        le = -energy(s, J_long, lc)
        ws.append(torch.logsumexp(le,0))
        occs.append(torch.logsumexp(le + torch.log(s.sum(1).clamp_min(1e-30)),0))
    logZ = torch.logsumexp(torch.stack(ws),0)
    mean_occ = torch.exp(torch.logsumexp(torch.stack(occs),0) - logZ)
    return (-logZ).item(), mean_occ.item()/N

# ------------------------- 因果 Transformer (mini-GPT) -------------------------
class MiniGPT(nn.Module):
    def __init__(s_, N, d=48, h=4, L=2):
        super().__init__()
        s_.N=N
        s_.tok = nn.Embedding(3, d)          # 0,1, 2=<BOS>
        s_.pos = nn.Embedding(N, d)
        layer = nn.TransformerEncoderLayer(d, h, 4*d, dropout=0.0, batch_first=True, norm_first=True)
        s_.tf = nn.TransformerEncoder(layer, L)
        s_.out = nn.Linear(d, 1)
        s_.register_buffer('mask', torch.triu(torch.full((N,N), float('-inf')), 1))
    def logits(s_, s):
        B=s.shape[0]
        inp = torch.cat([torch.full((B,1),2,dtype=torch.long), s[:,:-1].long()],1)  # 右移: 预测下一个
        x = s_.tok(inp) + s_.pos(torch.arange(s_.N))
        x = s_.tf(x, mask=s_.mask, is_causal=True)
        return s_.out(x).squeeze(-1)
    def log_prob(s_, s):
        lg = s_.logits(s)
        return -nn.functional.binary_cross_entropy_with_logits(lg, s, reduction='none').sum(1)
    @torch.no_grad()
    def sample(s_, B):
        s = torch.zeros(B, s_.N)
        for i in range(s_.N):                # 逐位点采样 = 逐token生成
            p = torch.sigmoid(s_.logits(s)[:, i])
            s[:, i] = torch.bernoulli(p)
        return s

def train(J_long=0.0, lc=None, steps=1000, B=256, tag=""):
    net = MiniGPT(N); opt = torch.optim.Adam(net.parameters(), lr=2e-3)
    sched = torch.optim.lr_scheduler.CosineAnnealingLR(opt, steps)
    t0=time.time()
    for k in range(steps):
        beta_anneal = min(1.0, 0.3 + 0.7*k/(0.5*steps))     # 温度退火防模式坍塌
        s = net.sample(B)
        lq = net.log_prob(s)
        with torch.no_grad():
            reward = beta_anneal*energy(s, J_long, lc) + lq     # REINFORCE + 基线
            reward = reward - reward.mean()
        loss = (reward * lq).mean()
        opt.zero_grad(); loss.backward(); opt.step(); sched.step()
    # 评估
    with torch.no_grad():
        s = net.sample(4000); lq = net.log_prob(s); e = energy(s, J_long, lc)
        F = (e + lq).mean().item()
        occ = s.mean().item()
        # 重要性重加权的无偏 logZ 估计
        lw = -e - lq
        F_is = -(torch.logsumexp(lw,0) - math.log(len(lw))).item()
        ess = (torch.exp(torch.logsumexp(lw,0)*2 - torch.logsumexp(2*lw,0))/len(lw)).item()
    return F, F_is, occ, ess, time.time()-t0

print(f'N={N} 位点, 穷举 2^{N} = {2**N:,} 构型做精确对照\n')

# ========== 测试1: 近邻模型 (DP可精确求解) ==========
F_ex, occ_ex = exact()
F_v, F_is, occ_v, ess, dt = train()
print('[测试1] 近邻协同模型 (转移矩阵DP可解)')
print(f'  精确:      F = {F_ex:.4f} kT,  占据率 = {occ_ex:.4f}')
print(f'  Transformer: F_变分 = {F_v:.4f},  F_重加权 = {F_is:.4f},  占据率 = {occ_v:.4f}')
print(f'  变分上界差 = {F_v-F_ex:.4f} kT ({100*(F_v-F_ex)/abs(F_ex):.2f}%),  ESS = {ess:.2f},  耗时 {dt:.0f}s\n')

# ========== 测试2: 加远程成环耦合 (DP失效) ==========
ii = torch.arange(N)
dist = (ii[:,None]-ii[None,:]).abs().float()
lc = torch.where(dist>=3, dist.clamp_min(1)**-1.5, torch.zeros_like(dist))
lc = torch.triu(lc, 1)
J_long = 3.0
F_ex2, occ_ex2 = exact(J_long, lc)
F_v2, F_is2, occ_v2, ess2, dt2 = train(J_long, lc)
print(f'[测试2] 加远程成环耦合 J_long={J_long} kT (近邻DP在此无法使用)')
print(f'  精确:      F = {F_ex2:.4f} kT,  占据率 = {occ_ex2:.4f}')
print(f'  Transformer: F_变分 = {F_v2:.4f},  F_重加权 = {F_is2:.4f},  占据率 = {occ_v2:.4f}')
print(f'  变分上界差 = {F_v2-F_ex2:.4f} kT ({100*(F_v2-F_ex2)/abs(F_ex2):.2f}%),  ESS = {ess2:.2f},  耗时 {dt2:.0f}s\n')

print('[关键对照] 若忽略远程耦合(=现有L0的做法):')
print(f'  占据率预测 {occ_ex:.4f}  vs 真实 {occ_ex2:.4f}  -> 低估 {100*(occ_ex2-occ_ex)/occ_ex:.1f}%')
