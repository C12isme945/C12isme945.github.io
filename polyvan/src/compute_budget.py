import math
NA=6.022e23
# ---- 1. 浓度鸿沟 ----
def per_nm3(molar): return molar*NA/1e24
c_use=3.74e-6      # 3 ppm Pal-KTTKS, M
c_cac=69.8e-6      # CAC ~56 ppm
print("=== 浓度鸿沟 ===")
for name,c in [("使用浓度 3ppm",c_use),("CAC 56ppm",c_cac),("MD可达 ~300uM",300e-6)]:
    n=per_nm3(c); V=1/n
    print(f"{name:16s} {c*1e6:7.2f} uM | 每肽占据体积 {V:12.0f} nm^3 | 立方边长 {V**(1/3):7.1f} nm")

print("\n=== 要在盒子里放 N 条肽需要多大 ===")
for N in [50,100]:
    for c,label in [(c_use,"3ppm"),(c_cac,"CAC"),(300e-6,"300uM")]:
        V=N/per_nm3(c); L=V**(1/3)
        wat=V*33.4                       # 全原子水分子数
        cg=V*33.4/4 + V*0.0              # Martini 4:1 水珠
        print(f"N={N:3d} @{label:6s}: L={L:6.1f} nm, 全原子水 {wat:.3g}, Martini水珠 {cg:.3g}")

# ---- 2. 算力预算 ----
print("\n=== 算力预算 (2x[128核2.8GHz + 4090 24GB]) ===")
days=180
# 全原子 GROMACS: ~50k原子体系, 1 GPU + 32核 ≈ 150 ns/day (保守)
aa_rate=150; aa_jobs=2*2   # 每卡2个并发(MPS), 共4
print(f"全原子(5万原子级): {aa_jobs}并发 x {aa_rate} ns/day x {days}d = {aa_jobs*aa_rate*days/1000:.0f} us 聚合采样")
# Martini3: 100万珠, 1 GPU ≈ 150 ns/day; 500万珠 ≈ 30 ns/day
for beads,rate in [(1e6,150),(5e6,30)]:
    print(f"Martini3 {beads:.0e}珠: 2卡 x {rate} ns/day x {days}d = {2*rate*days/1000:.1f} us (每卡{rate*days/1000:.1f}us)")
# CPU-only 并行小体系 / 自由能
print(f"CPU伞形采样: 256核 / 8核每窗 = 32并发窗口, 可同时跑 ~32 个PMF窗口")
# SBI 前向仿真(解析模型)
print(f"解析模型前向仿真: 256核 x ~2e4 次/核/天 ≈ 5e6 次/天 -> SBI训练集 1e7 样本约 2 天")

# ---- 3. 多价阈值预测 ----
print("\n=== 多价阈值 (0.1% HA, 3ppm肽) ===")
HA_disacch=401.3
c_HA=1.0 # g/L (0.1%)
c_COO=c_HA/HA_disacch*2   # 每二糖1个羧基? HA二糖含1个COOH -> 实为 /401.3*1
c_COO=c_HA/HA_disacch     # mol/L 羧基
print(f"羧基浓度 {c_COO*1e3:.2f} mM; 羧基/肽 = {c_COO/c_use:.0f}")
for MW in [10e3,100e3,400e3,1.5e6]:
    n_disacch=MW/HA_disacch
    c_chain=c_HA/MW
    print(f"HA {MW/1e3:7.1f} kDa: 链浓度 {c_chain*1e9:8.2f} nM, 每链肽数 = {c_use/c_chain:6.3f}")
