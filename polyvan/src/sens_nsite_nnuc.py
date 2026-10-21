"""n_site / n_nuc 敏感性 + 全参数先验预测 (L0 近邻模型)
条件: 3 ppm 肽, 0.1% HA, I = 10 mM (参考), 另算 150 mM (细胞培养基)"""
import os, json, sys, time
import numpy as np
from multiprocessing import Pool
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RESULTS_DIR = os.path.join(os.path.dirname(BASE_DIR), 'results')
os.makedirs(RESULTS_DIR, exist_ok=True)
sys.path.insert(0, BASE_DIR)
from l0_model import speciation, ppm_to_M, MR_DISACC

C_PEP = ppm_to_M(3.0); C_HA = 1.0; I_REF = 0.01; I_MED = 0.15
THETA0 = dict(logK=4.3, logomega=2.0, n_site=2, logKe=4.16, logsigma=-3.0,
              n_nuc=5, Z_rel=1.8, dG_template=-6.0)

def ftmpl(theta, n_sites, I):
    sp = speciation(C_PEP, C_HA, n_sites * MR_DISACC, I, theta)
    return sp['f_HA_templated'], sp['f_free_monomer']

def profile(theta):
    ns, nn = int(theta['n_site']), int(theta['n_nuc'])
    nthr = ns * nn
    out = dict(n_site=ns, n_nuc=nn, N_thr=nthr, MW_thr_kDa=nthr * MR_DISACC / 1e3)
    mults = [1, 1.5, 2, 3, 5, 10]
    pts = sorted(set([max(nthr - 1, 1)] + [int(round(m * nthr)) for m in mults] + [25, 249, 997]))
    f = {}
    for n in pts:
        f[n] = ftmpl(theta, n, I_REF)[0]
    out['f_below'] = f[max(nthr - 1, 1)] if nthr > 1 else None
    out['f_at_thr'] = f[nthr]
    out['f_10k'] = f[25]; out['f_100k'] = f[249]; out['f_400k'] = f[997]
    plateau = f[997]
    mw90 = None
    if plateau > 1e-3:
        for n in pts:
            if f[n] >= 0.9 * plateau:
                mw90 = n * MR_DISACC / 1e3; break
    out['MW90_kDa'] = mw90
    ft150, ffree150 = ftmpl(theta, 997, I_MED)
    out['f_400k_150mM'] = ft150; out['f_free_150mM'] = ffree150
    return out

def grid_job(args):
    ns, nn = args
    th = dict(THETA0); th['n_site'] = ns; th['n_nuc'] = nn
    return profile(th)

def prior_sample(seed):
    r = np.random.default_rng(seed)
    th = dict(logK=r.uniform(3.3, 5.3), logomega=r.uniform(1.0, 3.0),
              n_site=int(r.choice([1, 2, 3], p=[0.2, 0.6, 0.2])),
              logKe=r.normal(4.16, 0.15), logsigma=r.uniform(-4, -2),
              n_nuc=int(r.integers(3, 9)), Z_rel=r.uniform(1.0, 2.6),
              dG_template=r.uniform(-10, -2))
    try:
        o = profile(th); o['theta'] = th; return o
    except Exception as e:
        return dict(error=str(e), theta=th)

if __name__ == '__main__':
    t0 = time.time()
    combos = [(ns, nn) for ns in (1, 2, 3, 4) for nn in (2, 3, 4, 5, 6, 8, 10, 12)]
    with Pool(2) as p:
        grid = p.map(grid_job, combos)
    json.dump(grid, open(os.path.join(RESULTS_DIR, 'sens_grid.json'), 'w'), ensure_ascii=False, indent=1)
    print(f'grid done {time.time()-t0:.0f}s', flush=True)
    print('n_site n_nuc MWthr  f_below f_thr  f_10k  f_400k  MW90  f400k@150mM', flush=True)
    for g in grid:
        print(f"{g['n_site']:>5} {g['n_nuc']:>5} {g['MW_thr_kDa']:6.1f} "
              f"{(g['f_below'] or 0):7.3f} {g['f_at_thr']:6.3f} {g['f_10k']:6.3f} {g['f_400k']:6.3f} "
              f"{(g['MW90_kDa'] or float('nan')):6.1f} {g['f_400k_150mM']:8.4f}", flush=True)
    NS = int(sys.argv[1]) if len(sys.argv) > 1 else 200
    with Pool(2) as p:
        pri = p.map(prior_sample, range(1000, 1000 + NS))
    json.dump(pri, open(os.path.join(RESULTS_DIR, 'sens_prior.json'), 'w'), ensure_ascii=False, indent=1)
    ok = [o for o in pri if 'error' not in o]
    tm = [o for o in ok if o['f_400k'] > 0.05]
    mw90 = np.array([o['MW90_kDa'] for o in tm if o['MW90_kDa'] is not None])
    print(f'prior done {time.time()-t0:.0f}s; ok {len(ok)}/{NS}; templating(f400k>0.05) {len(tm)}', flush=True)
    if len(mw90):
        print('MW90 kDa quantiles 5/50/95/max:', np.round(np.percentile(mw90, [5, 50, 95, 100]), 1).tolist())
        print('P(MW90<20 kDa | templating)=', round(float(np.mean(mw90 < 20)), 3))
        print('P(MW90<50 kDa | templating)=', round(float(np.mean(mw90 < 50)), 3))
    r150 = np.array([o['f_400k_150mM'] / o['f_400k'] for o in tm])
    if len(r150):
        print('ratio f(150mM)/f(10mM) quantiles 5/50/95:', np.round(np.percentile(r150, [5, 50, 95]), 4).tolist())
        print('P(ratio<0.1 | templating)=', round(float(np.mean(r150 < 0.1)), 3))
