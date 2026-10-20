(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // =========================================================================
  // 1. UNIFIED BILINGUAL SWITCHER (Syncs with yl_lang across all pages)
  // =========================================================================
  const SCENE_META = {
    helix: {
      zh: {
        badge: "HA × PEP · 3D 分子力场",
        title: "透明质酸 × 信号肽 · 物理先验与主动学习配方空间",
        metrics: "09 交互模块 · 23 幕 v5 开题汇报 · A+D 双轮转化",
        cta: "打开 v5 开题汇报 ↗",
        href: "intro.html?id=kaiti-v5"
      },
      en: {
        badge: "HA × PEP · 3D MOLECULAR FIELD",
        title: "Hyaluronic Acid × Signal Peptide · Physics-Prior Active Learning",
        metrics: "09 Interactive Modules · 23-Scene v5 Keynote · A+D Translation",
        cta: "Launch v5 Keynote ↗",
        href: "intro.html?id=kaiti-v5"
      }
    },
    quant: {
      zh: {
        badge: "QUANT AGENT v2.1 · 3D 风控拓扑",
        title: "本地优先 AI 量化研究框架 · 多智能体提案与硬风控门禁",
        metrics: "4 套核心策略 · Sortino 1.82 · 实盘路径多重锁死",
        cta: "查看 Quant Agent 深度案例 ↗",
        href: "work/quant-agent.html"
      },
      en: {
        badge: "QUANT AGENT v2.1 · 3D RISK MESH",
        title: "Local-First AI Quantitative Framework · Guardrailed Execution",
        metrics: "4 Core Strategies · Sortino 1.82 · Blocked Live Path",
        cta: "Read Quant Agent Case Study ↗",
        href: "work/quant-agent.html"
      }
    },
    cluster: {
      zh: {
        badge: "SCI-COMPUTE × BIO-IoT · 3D 传感与集群",
        title: "ChemCompute 实验室算力集群 & BioSmartSense $35 边缘电化学传感",
        metrics: "GROMACS / WSL 调度 · AD5940 200kHz EIS · SHA-256 校验",
        cta: "查看硬件与科学计算工程 ↗",
        href: "work/biosmartsense.html"
      },
      en: {
        badge: "SCI-COMPUTE × BIO-IoT · 3D LATTICE",
        title: "ChemCompute Lab Cluster & BioSmartSense $35 Edge Biosensor",
        metrics: "GROMACS / WSL Queue · AD5940 200kHz EIS · SHA-256 Verified",
        cta: "Explore Sci-Compute & Hardware ↗",
        href: "work/biosmartsense.html"
      }
    }
  };

  let currentLang = "zh";
  try {
    const saved = localStorage.getItem("yl_lang");
    if (saved === "en" || saved === "zh") {
      currentLang = saved;
    } else if (document.documentElement.lang && document.documentElement.lang.startsWith("en") && !document.getElementById("card-grid")) {
      currentLang = "en";
    }
  } catch (_) {}

  let activeSceneKey = "helix";

  function updateStageHud() {
    const meta = (SCENE_META[activeSceneKey] || SCENE_META.helix)[currentLang === "en" ? "en" : "zh"];
    const badgeEl = document.getElementById("stage-hud-badge");
    const titleEl = document.getElementById("stage-hud-title");
    const metricsEl = document.getElementById("stage-hud-metrics");
    const linkEl = document.getElementById("stage-hud-link");
    if (badgeEl) badgeEl.textContent = meta.badge;
    if (titleEl) titleEl.textContent = meta.title;
    if (metricsEl) metricsEl.textContent = meta.metrics;
    if (linkEl) {
      linkEl.textContent = meta.cta;
      linkEl.setAttribute("href", meta.href);
    }
  }

  function applyDualLang(lang) {
    currentLang = lang === "en" ? "en" : "zh";
    try {
      localStorage.setItem("yl_lang", currentLang);
    } catch (_) {}

    document.querySelectorAll("[data-zh][data-en]").forEach(el => {
      const val = currentLang === "en" ? el.getAttribute("data-en") : el.getAttribute("data-zh");
      if (val !== null) {
        if (el.hasAttribute("data-html")) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    document.querySelectorAll("[data-placeholder-zh][data-placeholder-en]").forEach(el => {
      el.setAttribute(
        "placeholder",
        currentLang === "en" ? el.getAttribute("data-placeholder-en") : el.getAttribute("data-placeholder-zh")
      );
    });

    document.querySelectorAll(".lang-btn[data-lang]").forEach(btn => {
      const active = btn.getAttribute("data-lang") === currentLang;
      btn.setAttribute("aria-pressed", String(active));
      btn.classList.toggle("active", active);
    });

    updateStageHud();
    window.dispatchEvent(new CustomEvent("yl:langchange", { detail: { lang: currentLang } }));
  }

  function initLangButtons() {
    const buttons = document.querySelectorAll(".lang-btn[data-lang]");
    if (!buttons.length) return;
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetLang = btn.getAttribute("data-lang");
        applyDualLang(targetLang);
      });
    });
    if (document.querySelector("[data-zh][data-en]")) {
      applyDualLang(currentLang);
    }
  }

  // =========================================================================
  // 2. INTERACTIVE 3D SPATIAL ENGINE (HTML5 Canvas Perspective Projection)
  // =========================================================================
  function createSceneGeometry(mode) {
    const nodes = [];
    const edges = [];
    const rings = [];

    if (mode === "helix") {
      // Double intertwined molecular chains: HA backbone (cyan/blue) + Signal Peptide (indigo/violet)
      const steps = 22;
      for (let i = 0; i < steps; i++) {
        const t = (i / (steps - 1)) * Math.PI * 2.35 - Math.PI * 1.175;
        const y = ((i / (steps - 1)) - 0.5) * 230;
        const r1 = 76 + Math.sin(i * 0.45) * 10;
        const r2 = 64 + Math.cos(i * 0.45) * 8;

        // HA chain node
        const haIdx = nodes.length;
        nodes.push({
          x: Math.cos(t) * r1,
          y,
          z: Math.sin(t) * r1,
          r: i % 3 === 0 ? 7.8 : 5.4,
          color: "#38bdf8",
          core: "#e0f2fe",
          glow: "rgba(56, 189, 248, 0.55)",
          label: i === 4 ? "HA-GlcA" : i === 12 ? "HA-GlcNAc" : i === 18 ? "HA-Pocket" : ""
        });

        // PEP chain node
        const pepIdx = nodes.length;
        nodes.push({
          x: Math.cos(t + Math.PI * 0.88) * r2,
          y: y + 5,
          z: Math.sin(t + Math.PI * 0.88) * r2,
          r: i % 4 === 0 ? 6.8 : 4.8,
          color: "#818cf8",
          core: "#ede9fe",
          glow: "rgba(129, 140, 248, 0.55)",
          label: i === 6 ? "PEP-Lys" : i === 14 ? "Signal-Dock" : ""
        });

        if (i > 0) {
          edges.push({ a: haIdx - 2, b: haIdx, color: "rgba(56, 189, 248, 0.52)", width: 2.2, pulse: i % 3 === 0 });
          edges.push({ a: pepIdx - 2, b: pepIdx, color: "rgba(129, 140, 248, 0.48)", width: 1.8, pulse: i % 4 === 0 });
        }
        if (i % 2 === 0) {
          edges.push({ a: haIdx, b: pepIdx, color: "rgba(45, 212, 191, 0.34)", width: 1.2, dashed: true, pulse: i % 4 === 0 });
        }
      }
      // Central active-learning prior core
      const centerIdx = nodes.length;
      nodes.push({
        x: 0,
        y: 0,
        z: 0,
        r: 12.5,
        color: "#0071e3",
        core: "#ffffff",
        glow: "rgba(0, 113, 227, 0.75)",
        label: "Active Prior"
      });
      [6, 14, 22, 30].forEach(idx => {
        if (idx < centerIdx) {
          edges.push({ a: centerIdx, b: idx, color: "rgba(56, 189, 248, 0.25)", width: 1.1, dashed: true, pulse: true });
        }
      });
      rings.push({ rx: 128, ry: 128, tiltX: 1.12, tiltZ: -0.35, color: "rgba(56, 189, 248, 0.22)" });
      rings.push({ rx: 102, ry: 102, tiltX: -0.92, tiltZ: 0.48, color: "rgba(129, 140, 248, 0.18)" });
    } else if (mode === "quant") {
      // Geodesic AI & Risk Guardrail Polyhedron
      const phi = (1 + Math.sqrt(5)) / 2;
      const rawVerts = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
      ];
      const scale = 66;
      const labels = ["MA Cross", "RSI", "MACD +12.4%", "Bollinger", "Risk Gate", "Half-Kelly", "Sortino 1.82", "Paper API", "Audit JSONL", "Sentiment", "Walk-Forward", "Kill-Switch"];

      // Central core node
      nodes.push({
        x: 0,
        y: 0,
        z: 0,
        r: 14,
        color: "#6366f1",
        core: "#ffffff",
        glow: "rgba(99, 102, 241, 0.8)",
        label: "Quant Core"
      });

      rawVerts.forEach((v, idx) => {
        nodes.push({
          x: v[0] * scale,
          y: v[1] * scale,
          z: v[2] * scale,
          r: idx < 5 ? 7.2 : 5.6,
          color: idx % 2 === 0 ? "#38bdf8" : "#818cf8",
          core: "#e0e7ff",
          glow: idx % 2 === 0 ? "rgba(56, 189, 248, 0.55)" : "rgba(129, 140, 248, 0.55)",
          label: idx < 6 ? labels[idx] : ""
        });
        edges.push({ a: 0, b: idx + 1, color: "rgba(99, 102, 241, 0.34)", width: 1.3, pulse: idx % 2 === 0 });
      });

      for (let i = 1; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.hypot(dx, dy, dz);
          if (dist < scale * 2.15) {
            edges.push({
              a: i,
              b: j,
              color: "rgba(56, 189, 248, 0.38)",
              width: 1.5,
              pulse: (i + j) % 3 === 0
            });
          }
        }
      }
      rings.push({ rx: 132, ry: 132, tiltX: 0.95, tiltZ: 0.25, color: "rgba(99, 102, 241, 0.25)" });
      rings.push({ rx: 112, ry: 112, tiltX: -1.1, tiltZ: -0.4, color: "rgba(56, 189, 248, 0.2)" });
    } else {
      // Cluster & Bio-IoT: Toroidal Compute Ring + Electrochemical Impedance Wave Lattice
      nodes.push({
        x: 0,
        y: 0,
        z: 0,
        r: 13.5,
        color: "#14b8a6",
        core: "#ffffff",
        glow: "rgba(20, 184, 166, 0.8)",
        label: "Controller · AD5940"
      });

      const ringCount = 10;
      for (let i = 0; i < ringCount; i++) {
        const a = (i / ringCount) * Math.PI * 2;
        const idx = nodes.length;
        nodes.push({
          x: Math.cos(a) * 102,
          y: Math.sin(a * 2) * 28,
          z: Math.sin(a) * 102,
          r: i % 2 === 0 ? 7.4 : 5.5,
          color: i % 2 === 0 ? "#2dd4bf" : "#38bdf8",
          core: "#ccfbf1",
          glow: "rgba(45, 212, 191, 0.6)",
          label: i === 0 ? "GROMACS Node" : i === 3 ? "EIS 200kHz" : i === 6 ? "Randles Fit" : i === 8 ? "SHA-256" : ""
        });
        edges.push({ a: 0, b: idx, color: "rgba(45, 212, 191, 0.36)", width: 1.5, pulse: i % 2 === 0 });
        if (i > 0) {
          edges.push({ a: idx - 1, b: idx, color: "rgba(56, 189, 248, 0.48)", width: 1.9, pulse: true });
        }
      }
      edges.push({ a: 1, b: ringCount, color: "rgba(56, 189, 248, 0.48)", width: 1.9, pulse: true });

      const innerCount = 6;
      const offset = nodes.length;
      for (let i = 0; i < innerCount; i++) {
        const a = (i / innerCount) * Math.PI * 2 + 0.3;
        const idx = nodes.length;
        nodes.push({
          x: Math.cos(a) * 56,
          y: (i % 2 === 0 ? 1 : -1) * 48,
          z: Math.sin(a) * 56,
          r: 6.0,
          color: "#a855f7",
          core: "#f3e8ff",
          glow: "rgba(168, 85, 247, 0.55)",
          label: i === 1 ? "Gaussian" : i === 4 ? "SPE Sensor" : ""
        });
        edges.push({ a: 0, b: idx, color: "rgba(168, 85, 247, 0.38)", width: 1.3, dashed: true });
        edges.push({ a: idx, b: 1 + ((i * 2) % ringCount), color: "rgba(56, 189, 248, 0.28)", width: 1.2 });
      }
      rings.push({ rx: 130, ry: 130, tiltX: 1.22, tiltZ: 0.18, color: "rgba(45, 212, 191, 0.25)" });
      rings.push({ rx: 92, ry: 92, tiltX: 0.55, tiltZ: -0.65, color: "rgba(168, 85, 247, 0.22)" });
    }

    return { nodes, edges, rings };
  }

  function initSpatialCanvas() {
    const canvas = document.getElementById("spatial-stage-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 600;
    let height = 520;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(300, rect.width || 600);
      height = Math.max(300, rect.height || 520);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let scene = createSceneGeometry(activeSceneKey);
    let rotY = 0.42;
    let rotX = -0.18;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let isDragging = false;
    let dragLastX = 0;
    let dragLastY = 0;
    let dragOffsetY = 0;
    let dragOffsetX = 0;
    let time = 0;

    // Ambient background stars/depth dust
    const dust = Array.from({ length: 38 }, (_, i) => ({
      x: (Math.sin(i * 12.9898) * 43758.5453 % 1) * 320 - 160,
      y: (Math.cos(i * 78.233) * 23421.631 % 1) * 320 - 160,
      z: ((i * 37) % 240) - 120,
      size: 0.9 + (i % 3) * 0.55,
      alpha: 0.16 + (i % 5) * 0.08
    }));

    const stageEl = canvas.closest(".hero-visual") || canvas;
    stageEl.addEventListener("pointermove", e => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
      targetPointerX = nx * 0.55;
      targetPointerY = ny * 0.4;

      if (isDragging) {
        dragOffsetY += (e.clientX - dragLastX) * 0.008;
        dragOffsetX += (e.clientY - dragLastY) * 0.008;
        dragLastX = e.clientX;
        dragLastY = e.clientY;
      }
    }, { passive: true });

    stageEl.addEventListener("pointerdown", e => {
      if (e.target.closest("button, a")) return;
      isDragging = true;
      dragLastX = e.clientX;
      dragLastY = e.clientY;
    });

    window.addEventListener("pointerup", () => {
      isDragging = false;
    }, { passive: true });

    stageEl.addEventListener("pointerleave", () => {
      isDragging = false;
      targetPointerX = 0;
      targetPointerY = 0;
    }, { passive: true });

    // Scene mode switcher pills
    const modeButtons = document.querySelectorAll(".stage-mode-btn[data-scene]");
    modeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const nextScene = btn.getAttribute("data-scene");
        if (!nextScene) return;
        activeSceneKey = nextScene;
        scene = createSceneGeometry(activeSceneKey);
        modeButtons.forEach(b => {
          const active = b.getAttribute("data-scene") === activeSceneKey;
          b.classList.toggle("active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        updateStageHud();
        if (reduceMotion.matches) renderFrame();
      });
    });

    function project3D(x, y, z, rx, ry) {
      // Rotate around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // Rotate around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const fov = Math.min(width, height) * 0.92;
      const viewerDist = 360;
      const scale = fov / Math.max(80, viewerDist + z2);

      return {
        sx: width * 0.5 + x1 * scale,
        sy: height * 0.47 + y2 * scale,
        z: z2,
        scale
      };
    }

    function renderFrame() {
      time += reduceMotion.matches ? 0 : 0.014;
      pointerX += (targetPointerX - pointerX) * 0.08;
      pointerY += (targetPointerY - pointerY) * 0.08;

      const scrollOffset = window.scrollY * 0.0006;
      const curRotY = rotY + time * 0.48 + pointerX + dragOffsetY;
      const curRotX = rotX + Math.sin(time * 0.4) * 0.08 + pointerY + dragOffsetX - scrollOffset;

      ctx.clearRect(0, 0, width, height);

      // Deep Apple VisionOS spatial backdrop glow
      const bgGrad = ctx.createRadialGradient(
        width * (0.5 + pointerX * 0.14),
        height * (0.44 + pointerY * 0.14),
        12,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.72
      );
      if (activeSceneKey === "helix") {
        bgGrad.addColorStop(0, "rgba(14, 58, 110, 0.55)");
        bgGrad.addColorStop(0.5, "rgba(11, 22, 44, 0.35)");
        bgGrad.addColorStop(1, "rgba(7, 11, 22, 0)");
      } else if (activeSceneKey === "quant") {
        bgGrad.addColorStop(0, "rgba(49, 46, 129, 0.55)");
        bgGrad.addColorStop(0.5, "rgba(15, 23, 42, 0.35)");
        bgGrad.addColorStop(1, "rgba(7, 11, 22, 0)");
      } else {
        bgGrad.addColorStop(0, "rgba(13, 92, 99, 0.52)");
        bgGrad.addColorStop(0.5, "rgba(15, 23, 42, 0.35)");
        bgGrad.addColorStop(1, "rgba(7, 11, 22, 0)");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render 3D dust particles
      for (const d of dust) {
        const p = project3D(d.x, d.y, d.z, curRotX * 0.6, curRotY * 0.6);
        ctx.fillStyle = `rgba(186, 230, 253, ${d.alpha * Math.min(1.2, p.scale)})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, d.size * p.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render 3D orbital rings
      scene.rings.forEach((ring, rIdx) => {
        ctx.save();
        ctx.beginPath();
        const segs = 64;
        for (let i = 0; i <= segs; i++) {
          const ang = (i / segs) * Math.PI * 2;
          const rx = Math.cos(ang) * ring.rx;
          const ry = Math.sin(ang) * ring.ry * Math.cos(ring.tiltX);
          const rz = Math.sin(ang) * ring.ry * Math.sin(ring.tiltX);
          const p = project3D(rx, ry, rz, curRotX + ring.tiltZ * 0.3, curRotY * (rIdx % 2 === 0 ? 0.7 : -0.5));
          if (i === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.restore();
      });

      // Project all nodes
      const projected = scene.nodes.map((node, idx) => {
        const waveY = Math.sin(time * 1.6 + idx * 0.45) * 3.2;
        const p = project3D(node.x, node.y + waveY, node.z, curRotX, curRotY);
        return { ...node, ...p, idx };
      });

      // Draw edges sorted by average depth
      const sortedEdges = scene.edges
        .map(edge => {
          const na = projected[edge.a];
          const nb = projected[edge.b];
          return { ...edge, na, nb, z: (na.z + nb.z) * 0.5 };
        })
        .sort((a, b) => b.z - a.z);

      for (const edge of sortedEdges) {
        const { na, nb } = edge;
        const depthAlpha = Math.max(0.18, Math.min(1, (220 - edge.z) / 340));
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(na.sx, na.sy);
        ctx.lineTo(nb.sx, nb.sy);
        ctx.strokeStyle = edge.color;
        ctx.globalAlpha = depthAlpha;
        ctx.lineWidth = edge.width * ((na.scale + nb.scale) * 0.5);
        if (edge.dashed) ctx.setLineDash([3, 4]);
        ctx.stroke();

        // Animated signal packet along pulse edges
        if (edge.pulse && !reduceMotion.matches) {
          const tPulse = (time * 0.75 + (edge.a * 0.17)) % 1;
          const px = na.sx + (nb.sx - na.sx) * tPulse;
          const py = na.sy + (nb.sy - na.sy) * tPulse;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(px, py, 2.1 * ((na.scale + nb.scale) * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Draw nodes from back (largest z) to front (smallest z)
      const sortedNodes = [...projected].sort((a, b) => b.z - a.z);
      for (const n of sortedNodes) {
        const radius = Math.max(2.2, n.r * n.scale);
        const depthAlpha = Math.max(0.28, Math.min(1, (220 - n.z) / 320));

        ctx.save();
        ctx.globalAlpha = depthAlpha;

        // Outer halo glow
        const glowGrad = ctx.createRadialGradient(n.sx, n.sy, radius * 0.2, n.sx, n.sy, radius * 2.5);
        glowGrad.addColorStop(0, n.glow);
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // 3D Specular Sphere
        const sphereGrad = ctx.createRadialGradient(
          n.sx - radius * 0.34,
          n.sy - radius * 0.34,
          radius * 0.12,
          n.sx,
          n.sy,
          radius
        );
        sphereGrad.addColorStop(0, n.core);
        sphereGrad.addColorStop(0.52, n.color);
        sphereGrad.addColorStop(1, "#09152b");

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, radius, 0, Math.PI * 2);
        ctx.fill();

        // Floating 3D label for key foreground nodes
        if (n.label && n.z < 55) {
          ctx.font = "600 10px 'SF Mono', Consolas, monospace";
          const textW = ctx.measureText(n.label).width;
          const lx = n.sx + radius + 7;
          const ly = n.sy + 3;
          ctx.fillStyle = "rgba(9, 14, 26, 0.76)";
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(lx - 5, ly - 10, textW + 10, 15, 5);
          } else {
            ctx.rect(lx - 5, ly - 10, textW + 10, 15);
          }
          ctx.fill();
          ctx.strokeStyle = "rgba(148, 163, 184, 0.26)";
          ctx.lineWidth = 0.8;
          ctx.stroke();

          ctx.fillStyle = "#e2e8f0";
          ctx.fillText(n.label, lx, ly);
        }

        ctx.restore();
      }

      if (!reduceMotion.matches) {
        requestAnimationFrame(renderFrame);
      }
    }

    updateStageHud();
    renderFrame();
  }

  // =========================================================================
  // 3. APPLE VISIONOS 3D PERSPECTIVE TILT & SPECULAR GLARE CARDS
  // =========================================================================
  function init3DTiltCards() {
    if (reduceMotion.matches) return;

    const selectors = [
      ".page-card",
      ".bento-pillar",
      ".eng-card",
      ".route-step",
      ".focus-pillar",
      ".feature-row",
      ".project-card",
      ".work-card",
      ".mini-card",
      ".highlight",
      ".about-card",
      ".detail-visual",
      ".intro-preview"
    ].join(",");

    function attachTilt(el) {
      if (el.dataset.tiltBound === "true") return;
      el.dataset.tiltBound = "true";
      el.classList.add("spatial-tilt-surface");

      const maxDeg = el.classList.contains("page-card--featured") || el.classList.contains("work-card") ? 4.5 : 6.5;

      el.addEventListener("pointermove", e => {
        if (e.pointerType === "touch") return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / Math.max(1, rect.width);
        const py = (e.clientY - rect.top) / Math.max(1, rect.height);
        const rx = (0.5 - py) * maxDeg * 2;
        const ry = (px - 0.5) * maxDeg * 2;

        el.style.setProperty("--rx", rx.toFixed(2) + "deg");
        el.style.setProperty("--ry", ry.toFixed(2) + "deg");
        el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        el.classList.add("is-tilting");
      }, { passive: true });

      el.addEventListener("pointerleave", () => {
        el.classList.remove("is-tilting");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      }, { passive: true });
    }

    document.querySelectorAll(selectors).forEach(attachTilt);

    // Observe dynamically rendered cards (e.g. #card-grid in site.js)
    const grid = document.getElementById("card-grid");
    if (grid && typeof MutationObserver !== "undefined") {
      const obs = new MutationObserver(() => {
        grid.querySelectorAll(".page-card").forEach(attachTilt);
      });
      obs.observe(grid, { childList: true });
    }
  }

  function boot() {
    initLangButtons();
    initSpatialCanvas();
    init3DTiltCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
