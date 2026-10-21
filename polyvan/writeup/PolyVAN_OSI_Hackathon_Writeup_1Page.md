# PolyVAN-Agent: Repurposing Autoregressive Attention as a Variational Partition Function Solver for Polyelectrolyte–Peptide Assembly & Formulation Design

**Author:** Yansong Li (South China University of Technology, SCUT)  
**Event:** 4th Open Scientific Intelligence (OSI) Hackathon 2026  
**Repository & Interactive Workbench:** `PolyVAN-OSI-Hackathon-2026` (`index.html`, `src/van_check.py`, `src/l0_model.py`)

---

## Abstract
In functional soft-matter formulations—from biomedical lipopeptide–hyaluronan (HA) carriers ($3\text{ ppm}$ Pal-KTTKS) to industrial papermaking wet-end retention aids ($0.5\text{--}5\text{ ppm}$ cationic PAM)—*total additive dosage systematically diverges from active species concentration*. At micromolar operating concentrations, all-atom molecular dynamics faces a severe "concentration chasm" ($>700\text{ nm}$ boxes), while classical 1D nearest-neighbor transfer matrices (L0 DP) fail when semi-flexible chains form spatial loops that couple sequence-distant hydrophobic ligands. Here we present **PolyVAN-Agent**, an open scientific intelligence framework that:
1. Exploits the exact **mathematical isomorphism between GPT causal autoregressive decomposition and statistical-mechanical Boltzmann distributions** to solve loop-coupled polyelectrolyte partition functions without training data; and
2. Embeds this solver as a verified tool inside an LLM experimental-design agent.

Against exact $2^{20}$ ($1{,}048{,}576$-state) enumeration, our causal Transformer achieves **0.00% free-energy error ($0.0001\,k_BT$)** and importance-sampling **$\text{ESS}=1.00$**, proving that ignoring long-range loops underestimates site occupancy by **13.8%**. Across a 200-sample prior ensemble, PolyVAN-Agent discovers a sharp **oligosaccharide geometric cliff at $\text{dp}20$ ($4.0\text{ kDa}$)** and a **150 mM salt-induced cluster reset**, enabling automated design of falsifiable ITC/fluorescence protocols (E1–E5) and salt-switchable formulations.

---

## 1. Physical Bottleneck: Spatial Loops Break 1D Transfer Matrices
Polyelectrolyte–amphiphile formulations operate at trace dosages ($3\text{ ppm} \approx 3.74\,\mu\text{M}$ Pal-KTTKS on $0.1\text{ wt\%}$ HA), where efficacy depends on equilibrium partitioning among four species: *free monomer*, *solution self-aggregate*, *isolated chain-bound monomer*, and *chain-templated multivalent clusters*. While 1D dynamic programming (L0 transfer matrix) captures nearest-neighbor cooperativity ($\omega$) and finite chain length ($N$), HA is a semi-flexible worm-like chain ($l_p \approx 5\text{ nm}$). Sequence-distant sites $|i-j|\ge 3$ contact via spatial looping with probability $P_{\text{loop}}(|i-j|) \propto |i-j|^{-3/2}$. Because C16 palmitoyl tails carry strong hydrophobic association ($\Delta G \approx -15\text{ to }-25\text{ kJ/mol}$, Boltzmann factor $4.2\times 10^2\text{--}2.4\times 10^4$), non-local loop couplings dominate the partition function $Z$, rendering 1D transfer matrices invalid.

## 2. Mathematical Isomorphism: GPT Attention as a Physics Solver
A lattice polymer with site occupancies $\mathbf{s} = (s_1,\dots,s_N) \in \{0,1\}^N$ obeys the exact autoregressive decomposition:

$$q_\theta(\mathbf{s}) = \prod_{i=1}^{N} q_\theta(s_i \mid s_1, \dots, s_{i-1}) \;\Longleftrightarrow\; \text{Causal GPT Token Generation}$$

Rather than fitting external datasets, we train a 2-layer causal Transformer (`MiniGPT`, $d=48, h=4$) directly on the loop-coupled Hamiltonian $E(\mathbf{s}) = -\mu\sum_i s_i - J\sum_i s_i s_{i+1} - J_{\text{long}}\sum_{j-i\ge 3}|i-j|^{-3/2}s_i s_j$ by minimizing the variational free energy upper bound via $\beta$-annealed REINFORCE:

$$F_q = \mathbb{E}_{\mathbf{s}\sim q_\theta}\!\left[E(\mathbf{s}) + k_BT \ln q_\theta(\mathbf{s})\right] \ge F_{\text{exact}} = -k_BT \ln Z$$

| Solver / Regime ($N=20$, $2^{20}=1{,}048{,}576$ states) | $F_{\text{exact}}$ ($k_BT$) | Solver $F$ ($k_BT$) | Rel. Error | Site Occupancy (Exact / Solver) | ESS |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Regime 1: Nearest-Neighbor ($J_{\text{long}}=0$) · MiniGPT** | −20.0460 | **−20.0460** | **0.00%** | 0.8736 / 0.8728 | **1.00** |
| **Regime 2: + Loop Coupling ($J_{\text{long}}=3$) · MiniGPT** | −49.4726 | **−49.4725** | **0.00%** | 0.9944 / 0.9943 | **1.00** |
| **Regime 2 · Classical L0 Transfer Matrix DP** | −49.4726 | −20.0460 | 59.5% Gap | 0.8736 (**−13.8% Bias**) | — |

## 3. Physical Discovery & Cross-Domain Impact
- **Geometric Oligosaccharide Cliff (E2):** Across 168/200 templating priors, $P(\text{MW}_{90} < 20\text{ kDa}) = 97.6\%$ (median $6.4\text{ kDa}$). Chains shorter than $n_{\text{site}}\times n_{\text{nuc}}$ disaccharides cannot host a nucleus, causing effective CAC to drop from $>285\text{ ppm}$ ($\text{dp}18$) to $2.32\text{ ppm}$ ($\text{dp}20$).
- **Culture-Medium Reset & Salt-Switchable Carrier (E3/E4):** Diluting a low-salt formulation ($I=10\text{ mM}$, $f_{\text{tmpl}}=73.5\%$) into physiological medium ($I=150\text{ mM}$) melts $>90\%$ of clusters in $76.2\%$ of priors—enabling a **"Storage-Locked, Skin-Released" (A+D)** carrier.
- **Cross-Domain Transfer to Industrial Papermaking:** The exact same mathematical framework governs cationic PAM retention aids ($0.5\text{--}5\text{ ppm}$) competing between active cellulose-bridging loops and anionic trash (DCS) under white-water closure conductivity spikes, validated via Dynamic Drainage Jar (DDJ, TAPPI T 261) and Polyelectrolyte Colloid Titration (PCD).
