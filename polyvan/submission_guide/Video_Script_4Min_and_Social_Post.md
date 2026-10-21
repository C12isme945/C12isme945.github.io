# 🎬 OSI Hackathon 2026 · 4-Minute Video Storyboard, Script & Social Media Submission Kit

> **Target Event:** 4th Open Scientific Intelligence (OSI) Hackathon 2026  
> **Hard Deadline:** **2026-10-22 19:00 CDT (UTC−5)** = **2026-10-23 08:00 Beijing/Singapore Time (UTC+8)**  
> **Deliverables:**  
> 1. **Public Social Media Post** (X / LinkedIn / YouTube / BlueSky)  
> 2. **Demo Video (Max 4:00)** attached or linked in the post  
> 3. **1-Page Write-up PDF** (`writeup/PolyVAN_OSI_Hackathon_Writeup_1Page.pdf`)  

---

## Part 1: 4-Minute Video Storyboard & Bilingual Voiceover Script

You already have high-production-value MP4 animations in `Downloads/透明质酸与多肽_开题与课题全量资料/02_机理动画与科普宣传片/` and `01_开题报告与答辩/HA肽精华_数字孪生_干湿闭环_完整版.mp4`, plus the live interactive workbench `index.html`. Below is the exact second-by-second assembly plan:

### ⏱️ Section 1 (0:00 – 0:45) | The Hook: The Concentration & Looping Chasm in Soft-Matter Formulations
- **Visual Source:**
  - `0:00–0:25`: Play clips from `HA肽精华_数字孪生_干湿闭环_完整版.mp4` (or `HA-多肽精华_科普动画_精修180s_20261014_v3.mp4`) showing Hyaluronic Acid (HA) chains and Pal-KTTKS lipopeptides in solution.
  - `0:25–0:45`: Show the header and Tab 1 of `index.html`.
- **English Voiceover / Subtitles (≈110 words):**
  > "In functional soft-matter formulations—whether it is 3 ppm of signaling lipopeptide in a hyaluronic acid biomedical carrier, or 2 ppm of cationic polyacrylamide retention aid in industrial papermaking—**how much you add is never equal to how much is active**.  
  > At micromolar dosages, all-atom molecular dynamics faces a massive concentration chasm, requiring simulation boxes over 700 nanometers wide. Meanwhile, classical 1D transfer matrices break down because semi-flexible chains loop in 3D space, bringing sequence-distant hydrophobic C16 tails into strong contact.  
  > Today, we present **PolyVAN-Agent**: a framework that repurposes the core architecture of Large Language Models—causal autoregressive attention—directly as a statistical-mechanical partition function solver."
- **中文对照字幕参考：**
  > 在功能软物质配方中——无论是生物医药与护肤体系中 3 ppm 的信号脂肽与透明质酸，还是造纸工业湿部 2 ppm 的阳离子聚丙烯酰胺助留剂——**“总投加量”系统性地不等于“有效物种浓度”**。在微摩尔浓度下，全原子分子动力学面临逾 700 nm 盒子的“浓度鸿沟”；而传统一维近邻转移矩阵（L0 DP）又因半柔性链在三维空间成环、引发长程疏水缔合而彻底失效。为此，我们推出 **PolyVAN-Agent**：直接将大语言模型的核心底座（因果自回归注意力）同构为统计力学配分函数求解器。

---

### ⏱️ Section 2 (0:45 – 1:50) | The Core Innovation: GPT ↔ Boltzmann Mathematical Isomorphism (`Tab 1`)
- **Visual Source:**
  - Screen recording of `index.html` **Tab ① (GPT ↔ Boltzmann Solver)**:
  - Drag the **Long-Range Loop Coupling ($J_{\text{long}}$)** slider from `0.0 kT` to `3.0 kT`.
  - Click **"🎲 Sample Next-Token Microstate from MiniGPT"** 3–4 times to show live token-by-token site sampling ($s_1 \to s_{20}$).
  - Highlight the 20×20 Attention/Loop Matrix and the $2^{20}$ Benchmark Table at the bottom.
- **English Voiceover / Subtitles (≈150 words):**
  > "Most AI-for-Science tools only use LLMs as text wrappers. We go deeper: the Boltzmann distribution over $N$ polymer binding sites decomposes autoregressively as the product of conditional probabilities $p(s_i \mid s_{<i})$. This is **mathematically isomorphic to GPT next-token prediction**.  
  > Instead of training on external datasets, our 2-layer causal Transformer (`MiniGPT`) is supervised purely by the physical Hamiltonian via temperature-annealed variational free energy minimization. Causal self-attention naturally captures all-to-all long-range loop couplings that 1D dynamic programming cannot express.  
  > Benchmarking against exact enumeration of $2^{20}$—over one million microstates—`MiniGPT` achieves **0.00% free-energy error** and an importance-sampling **Effective Sample Size (ESS) of 1.00**. Crucially, we prove that ignoring long-range loops causes classical transfer matrices to underestimate polymer site occupancy by **13.8%**."
- **中文对照字幕参考：**
  > 多数科学智能工具仅把 LLM 当作文本外壳，而我们深入到底层数学同构：$N$ 个高分子结合位点的玻尔兹曼分布可精确分解为条件概率乘积 $p(s_i \mid s_{<i})$，这与 GPT 预测下一个 Token **在数学上完全同构**。无需任何外部训练数据，我们直接以物理哈密顿量为监督信号最小化变分自由能。在 $2^{20}$（逾 104 万个微观构型）精确穷举基准上，MiniGPT 实现了 **0.00% 的自由能误差**与 **ESS = 1.00**；同时定量证明忽略远程成环会导致传统近邻模型低估占据率达 **13.8%**。

---

### ⏱️ Section 3 (1:50 – 3:05) | Physical Discovery: The dp20 Geometric Cliff & 150 mM Salt Switch (`Tab 2 & Tab 3`)
- **Visual Source:**
  - Switch to **Tab ② (Live Speciation & dp20 Cliff Simulator)**:
  - Drag the **Polymer Chain Length (`dp`)** slider across `dp 20` and point to the sharp step in the left chart (`Oligosaccharide Geometric Cliff`).
  - Drag the **Ionic Strength (`I`)** slider from `10 mM` (Storage: 73.5% templated cluster) to `150 mM` (Physiological medium: >99% free monomer).
  - Briefly switch to **Tab ③ (200-Prior Sensitivity & E1–E5 Protocol)** to show the $(n_{\text{site}} \times n_{\text{nuc}})$ sensitivity heatmap and 200-sample Bayesian prior quantiles.
- **English Voiceover / Subtitles (≈165 words):**
  > "Coupling our partition solver with a 200-sample prior sensitivity ensemble reveals two counter-intuitive, falsifiable physical rules.  
  > First, the **Oligosaccharide Geometric Cliff**: chains shorter than $n_{\text{site}} \times n_{\text{nuc}}$ disaccharides cannot host a single critical nucleus. At the prior center, effective critical aggregation concentration stays above 285 ppm from dp8 to dp18, then plummets by two orders of magnitude to **2.32 ppm at exactly dp20 (4.0 kDa)**. Across 200 priors, 97.6% reach plateau below 20 kDa—proving that commercial 50 kDa and 1,000 kDa HA behave identically in bulk templating.  
  > Second, the **Ionic-Strength Salt Switch**: in low-salt storage at 10 mM, 73.5% of lipopeptide is protected inside reversible HA-templated clusters. Upon dilution into 150 mM physiological medium, counterion release melts over 99% of clusters into bioavailable free monomers. This directly unlocks a patentable **'Storage-Locked, Skin-Released' carrier design**."
- **中文对照字幕参考：**
  > 将求解器与 200 组参数先验集合耦合后，我们发现了两条可证伪的物理规律：第一是**“寡糖几何断崖（dp20 Cliff）”**——当链长短于 $n_{\text{site}}\times n_{\text{nuc}}$ 个二糖时无法容纳单个成核簇，有效 CAC 在 dp18 到 dp20（4.0 kDa）之间骤降两个数量级（从 $>285\text{ ppm}$ 降至 $2.32\text{ ppm}$），且 97.6% 先验下 $\text{MW}_{90}<20\text{ kDa}$。第二是**“离子强度盐敏开关”**——在 10 mM 低盐储存下 73.5% 脂肽被保护在模板簇中防失活；一旦接触 150 mM 生理盐环境，逾 99% 簇瞬间解离释放游离活性单体，由此诞生了极具专利价值的“瓶内锁存、触肤释放”配方架构。

---

### ⏱️ Section 4 (3:05 – 4:00) | Cross-Domain Agentic Orchestration: From Cosmetics to Industrial Papermaking (`Tab 4`)
- **Visual Source:**
  - Switch to **Tab ④ (Agentic Formulation Copilot)**:
  - Click **[Task 2] Inverse-Design "A+D Salt-Switchable Carrier"** and **[Task 3] Cross-Domain Transfer: Papermaking Wet-End CPAM** to show the live streaming tool calls and isomorphism table.
  - End with the 1-page write-up summary card.
- **English Voiceover / Subtitles (≈125 words):**
  > "Finally, **PolyVAN-Agent** embeds these verified solvers as deterministic tools inside an Agentic Formulation Copilot—strictly enforcing *'LLM as Orchestrator, Physics as Calculator'*.  
  > Beyond biomedicine, the agent seamlessly transfers the exact same solver to an isomorphic heavy-industry challenge: **papermaking wet-end cationic polyacrylamide (CPAM) retention aids** at 0.5 to 5 ppm. Just as salt melts HA–peptide clusters, white-water closure raises conductivity and collapses CPAM bridging loops while anionic trash competes for polymer.  
  > By uniting GPT causal attention with statistical mechanics and pre-registered experiments E1 through E5, PolyVAN-Agent turns soft-matter formulation from trial-and-error into quantitative, physics-verified inverse design. Thank you!"
- **中文对照字幕参考：**
  > 最后，PolyVAN-Agent 将物理求解器封装为智能体工具，严格遵循**“LLM 做编排，物理做计算”**。除生物医药与护肤品外，智能体还将同一套数学框架无缝迁移至物理同构的重工业难题：**造纸湿部 0.5–5 ppm 阳离子助留剂（CPAM）的有效物种分布**——白水封闭循环导致的电导率飙升与阴离子垃圾（DCS）竞争，与 HA–脂肽的盐致簇解离完全同构，且可通过胶体滴定（PCD）直接测定游离态真值。PolyVAN-Agent 让软物质配方真正从经验试错迈向物理可验证的逆向设计！

---

## Part 2: Ready-to-Post Social Media Copy (X / LinkedIn / BlueSky)

### Option A: LinkedIn / Detailed Post (Recommended)
```text
🚀 Excited to share our submission for the 4th Open Scientific Intelligence (#OSIHackathon) 2026!

🧬 Project: PolyVAN-Agent — Repurposing Autoregressive Attention as a Variational Partition Function Solver for Polyelectrolyte–Peptide Assembly & Formulation Design

🔬 The Challenge:
In functional soft-matter formulations—from 3 ppm signaling lipopeptides (Pal-KTTKS) in hyaluronic acid carriers to 0.5–5 ppm cationic retention aids (CPAM) in industrial papermaking—"total dosage added" systematically diverges from "active species concentration." At micromolar concentrations, all-atom MD faces a >700 nm concentration chasm, while classical 1D transfer matrices (L0 DP) fail when semi-flexible chains form 3D spatial loops that couple sequence-distant hydrophobic ligands.

⚡ What We Built:
1️⃣ Mathematical Isomorphism (GPT ↔ Statistical Physics): We exploit the exact equivalence between GPT causal autoregressive token decomposition p(s) = ∏ p(s_i | s_<i) and lattice Boltzmann distributions. Trained purely on the loop-coupled Hamiltonian without external datasets, our causal Transformer (MiniGPT VAN) achieves 0.00% free-energy error (0.0001 kT) and importance-sampling ESS = 1.00 against exact 2^20 (1,048,576-state) enumeration—proving that ignoring long-range loops underestimates site occupancy by 13.8%.
2️⃣ Falsifiable Physical Discovery: Across a 200-sample prior ensemble, PolyVAN-Agent uncovers a sharp 100-fold Critical Aggregation Concentration (CAC) cliff at oligosaccharide length dp20 (4.0 kDa) and a counterion-driven salt switch between 10 mM (storage protection) and 150 mM (physiological monomer release).
3️⃣ Agentic Cross-Domain Workbench: An interactive web copilot ("LLM as Orchestrator, Physics as Calculator") that synthesizes pre-registered ITC/fluorescence protocols (E1–E5) and transfers seamlessly between biomedical hydrocolloids and industrial papermaking wet-end chemistry.

🎥 4-Min Demo Video & 1-Page Write-up attached!

#OSIHackathon #LLMHackathon #MaterialsScience #Chemistry #StatisticalPhysics #SoftMatter #AIforScience #Polymers @BenBlaiszik
```

### Option B: X (Twitter) / BlueSky Thread (Concise)
```text
🧪 Can GPT's causal attention solve statistical-mechanical partition functions where classical transfer matrices fail?

Here is our submission for the 4th Open Scientific Intelligence Hackathon (#OSIHackathon 2026):
✨ PolyVAN-Agent ✨

1/ In trace soft-matter formulations (3 ppm Pal-KTTKS lipopeptide + Hyaluronic Acid, or 0.5–5 ppm CPAM in papermaking), total dosage ≠ active species. Spatial chain looping (P_loop ∝ |i-j|^-1.5) couples distant C16 tails, breaking 1D dynamic programming.

2/ Because Boltzmann distributions decompose autoregressively p(s) = ∏ p(s_i | s_<i), we repurpose a causal Transformer (MiniGPT) as a zero-data Variational Autoregressive Network (VAN).
Against exact 2^20 (1,048,576 states) enumeration:
• Free energy error: 0.00% (0.0001 kT)
• Importance Sampling ESS: 1.00
• Classical 1D DP error when ignoring loops: −13.8% occupancy!

3/ Coupling our solver with a 200-sample Bayesian prior ensemble reveals:
• A 100× CAC geometric cliff at oligosaccharide dp20 (4.0 kDa)
• A "Storage-Locked (10 mM), Skin-Released (150 mM)" salt switch
• Exact mathematical isomorphism with industrial papermaking wet-end retention!

🎥 Watch our 4-min demo & check out the 1-page write-up:
#OSIHackathon #AIforScience #MaterialsScience #Chemistry
```

---

## Part 3: Final Pre-Submission Verification Checklist
- [ ] **1-Page Write-up PDF**: Located at `writeup/PolyVAN_OSI_Hackathon_Writeup_1Page.pdf` (Verified strictly 1 page, A4 two-column publication format).
- [ ] **Interactive Web Demo**: Open `index.html` in Chrome/Edge (100% self-contained, zero external server required) to record the screen segments.
- [ ] **4-Minute Video**: Combine existing animations (`HA肽精华_数字孪生_干湿闭环_完整版.mp4`) + `index.html` screen recording, ensuring total length is **≤ 4:00**.
- [ ] **Public Post + Google Form**: Publish post on X / LinkedIn / YouTube (publicly accessible) and submit the link via the official OSI Hackathon Google Form before **Oct 23, 08:00 (UTC+8)**.
