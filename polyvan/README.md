# 🧬 PolyVAN-Agent (OSI Hackathon 2026)

**Repurposing Autoregressive Attention as a Variational Partition Function Solver for Polyelectrolyte–Peptide Assembly & Formulation Design**

[![Event](https://img.shields.io/badge/Event-4th_OSI_Hackathon_2026-0284c7)](https://llmhackathon.github.io/)
[![Benchmark](https://img.shields.io/badge/2%5E20_Exact_Benchmark-0.00%25_Error_(ESS%3D1.00)-10b981)](#)
[![License](https://img.shields.io/badge/License-MIT-818cf8)](#)

> **Author:** Yansong Li · South China University of Technology (SCUT)  
> **Quick Start:** Double-click [`index.html`](index.html) to launch the interactive **PolyVAN-Agent Web Workbench** in any browser, or view the official 1-page write-up at [`writeup/PolyVAN_OSI_Hackathon_Writeup_1Page.pdf`](writeup/PolyVAN_OSI_Hackathon_Writeup_1Page.pdf).

---

## 🌟 Overview & Core Scientific Thesis

In functional soft-matter formulations—ranging from biomedical lipopeptide–hyaluronan carriers ($3\text{ ppm}$ Pal-KTTKS on $0.1\text{ wt\%}$ HA) to industrial papermaking wet-end retention aids ($0.5\text{--}5\text{ ppm}$ cationic PAM)—**total additive dosage systematically diverges from active species concentration**.

1. **Why Classical 1D Transfer Matrices Break (`L0` Vulnerability):**  
   Hyaluronic acid is a semi-flexible worm-like chain ($l_p \approx 5\text{ nm}$). Sequence-distant sites $|i-j| \ge 3$ contact via 3D spatial looping with probability $P_{\text{loop}}(|i-j|) \propto |i-j|^{-3/2}$. Because C16 palmitoyl tails carry strong hydrophobic association ($\Delta G \approx -15\text{ to }-25\text{ kJ/mol}$), non-local loop couplings dominate the partition function $Z$, causing 1D nearest-neighbor transfer matrices to **underestimate site occupancy by 13.8%** and miss $29.43\,k_BT$ of free energy.
2. **GPT ↔ Boltzmann Mathematical Isomorphism:**  
   The Boltzmann distribution over $N$ polymer binding sites decomposes autoregressively as $p(\mathbf{s}) = \prod_{i=1}^N p(s_i \mid \mathbf{s}_{<i})$, which is **mathematically isomorphic to GPT next-token prediction**. Supervised purely by the physical Hamiltonian via $\beta$-annealed variational free energy minimization (`src/van_check.py`), our 2-layer causal Transformer (`MiniGPT`) solves the loop-coupled partition function with **0.00% free-energy error ($0.0001\,k_BT$)** and importance-sampling **$\text{ESS} = 1.00$** against exact $2^{20}$ ($1{,}048{,}576$-state) enumeration.
3. **Falsifiable Physical Predictions & Cross-Domain Transfer:**  
   Coupling the solver with a 200-sample prior ensemble (`src/sens_nsite_nnuc.py`, `src/oligo_salt_pred.py`) reveals:
   - **Oligosaccharide Geometric Cliff (E2):** Effective CAC drops 100-fold from $>285\text{ ppm}$ ($\text{dp}18$) to $2.32\text{ ppm}$ at $\text{dp}20$ ($4.01\text{ kDa}$), with $P(\text{MW}_{90} < 20\text{ kDa}) = 97.6\%$.
   - **Salt-Switchable Carrier (E3/E4):** Diluting from $10\text{ mM}$ storage ($f_{\text{tmpl}}=73.5\%$) into $150\text{ mM}$ physiological medium melts $>90\%$ of clusters into bioavailable free monomers in $76.2\%$ of priors.
   - **Papermaking Wet-End Isomorphism:** Directly maps to cationic PAM bridging vs. anionic trash (DCS) competition under white-water closure conductivity spikes.

---

## 📂 Repository Structure

```text
PolyVAN-OSI-Hackathon-2026/
├── index.html                                         # 🖥️ Interactive 4-Tab Web Workbench (Live Demo)
├── README.md                                          # 📖 Repository Overview & Reproduction Guide
├── writeup/
│   ├── PolyVAN_OSI_Hackathon_Writeup_1Page.pdf        # 📄 Official 1-Page Write-up (Print-Ready PDF)
│   ├── PolyVAN_OSI_Hackathon_Writeup_1Page.html       # 📄 Source HTML for 1-Page Write-up
│   └── PolyVAN_OSI_Hackathon_Writeup_1Page.md         # 📄 Markdown Version of 1-Page Write-up
├── submission_guide/
│   └── Video_Script_4Min_and_Social_Post.md           # 🎬 4-Min Video Storyboard, Script & Social Copy
├── src/
│   ├── van_check.py                                   # ⚡ Causal Transformer (MiniGPT) vs 2^20 Exact Benchmark
│   ├── l0_model.py                                    # 🧪 Finite-Chain Partition & 4-Species Equilibrium Solver
│   ├── oligo_salt_pred.py                             # 📐 Oligosaccharide Cliff (dp8-dp50) & Salt-Gradient Predictor
│   ├── sens_nsite_nnuc.py                             # 🎯 32-Grid & 200-Sample Prior Sensitivity Ensemble
│   └── compute_budget.py                              # 💻 Concentration Chasm & Compute Scaling Calculator
└── results/
    ├── van_log.txt                                    # 📊 Verified 2^20 Exact vs MiniGPT Benchmark Output
    ├── oligo_salt_pred.json                           # 📊 Pre-registered dp8-dp50 & Salt Predictions
    ├── oligo_salt_log.txt                             # 📊 Tabular Log of CAC & Cluster Fractions
    ├── sens_grid.json                                 # 📊 (n_site × n_nuc) Sensitivity Grid
    ├── sens_prior.json                                # 📊 Full 200-Sample Prior Ensemble Results
    └── sens_log.txt                                   # 📊 Quantile Summary (P(MW90 < 20 kDa) = 0.976)
```

---

## 🚀 Reproducing the Numerical Benchmarks

```bash
# 1. Run Exact 2^20 Enumeration vs. Causal Transformer (MiniGPT VAN)
python src/van_check.py

# 2. Run Oligosaccharide Geometric Cliff (dp8–dp50) & Ionic Strength Predictions
python src/oligo_salt_pred.py

# 3. Run (n_site × n_nuc) Grid & 200-Sample Prior Sensitivity Analysis
python src/sens_nsite_nnuc.py

# 4. Run Concentration Chasm & Box Scaling Audit
python src/compute_budget.py
```
