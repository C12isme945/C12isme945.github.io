(function () {
  const TEXT_ZH = {
    /* ---------- Navigation & footer ---------- */
    "Work": "作品",
    "About": "关于",
    "Focus": "方向",
    "Home": "首页",
    "View GitHub": "访问 GitHub",
    "View on GitHub": "在 GitHub 查看",
    "← All work": "← 返回作品",
    "Next project": "下一个项目",
    "All projects": "全部项目",
    "Back to work →": "返回作品 →",
    "· Engineer & builder": "· 工程师与创作者",
    "© 2026 Yansong Li.": "© 2026 Yansong Li.",
    "© 2026 Yansong Li. All projects open source.": "© 2026 Yansong Li. 所有项目均已开源。",

    /* ---------- Home ---------- */
    "Open-source portfolio · 2026": "开源作品集 · 2026",
    "I build intelligent systems — from AI agents and quantitative platforms to scientific computing tools.": "我构建智能系统——从 AI 智能体和量化平台，到科学计算工具。",
    "Fifteen projects exploring the boundary between software, hardware and machine intelligence.": "十五个项目，探索软件、硬件与机器智能的交界。",
    "Explore my work": "浏览作品",
    "Local-first AI quantitative research. Backtests, paper trading and guarded live paths.": "本地优先的 AI 量化研究：回测、模拟交易与受严格保护的实盘路径。",
    "AI · Finance": "AI · 金融",
    "View case study →": "查看项目详情 →",
    "Inspectable ZIP recovery verification with trusted SHA-256 manifests. Fully local.": "可核查的 ZIP 恢复验证，基于可信 SHA-256 清单，全程本地处理。",
    "Developer tools": "开发工具",
    "A sub-$35 electrochemical biosensor with edge AI for real-time water quality testing.": "不足 35 美元的电化学生物传感器，结合边缘 AI 实时检测水质。",
    "Science · Hardware": "科学 · 硬件",
    "Open-source projects": "开源项目",
    "Languages": "编程语言",
    "Stars": "星标",
    "Building since": "创作始于",
    "Selected work": "精选作品",
    "Systems that are useful, inspectable, and safe by default.": "实用、可核查、默认安全的系统。",
    "Each project ships with a clear scope, honest limits, and tests that describe real behavior.": "每个项目都有清晰的边界、诚实的限制说明，以及描述真实行为的测试。",
    "Distributed lab computing": "分布式实验室计算",
    "A Windows console that turns a small lab into a compute cluster — installer, controller, node agent and GROMACS/WSL adapter.": "把小型实验室变成计算集群的 Windows 控制台——安装器、主控、节点代理与 GROMACS/WSL 适配器。",
    "Science & hardware": "科学与硬件",
    "Portable AD5940-based electrochemical biosensor and edge AI platform for water quality and bio-diagnostics.": "基于 AD5940 的便携式电化学生物传感器与边缘 AI 平台，用于水质监测和生物诊断。",
    "IoT · Edge AI": "物联网 · 边缘 AI",
    "AI automation": "AI 自动化",
    "A lightweight WeChat RPA assistant powered by multi-LLM support, tool invocation and persistent per-user memory.": "轻量级微信 RPA 助手，支持多模型、工具调用和持久的用户级记忆。",
    "See all 15 projects": "查看全部 15 个项目",
    "Engineer first. Curious by default.": "以工程为先，以好奇为常态。",
    "AI agents & automation": "AI 智能体与自动化",
    "LLM-driven assistants with tools, memory and strict permission boundaries.": "由大模型驱动的助手，具备工具、记忆与严格的权限边界。",
    "Quantitative systems": "量化系统",
    "Backtesting, risk controls and audit trails designed to fail safely.": "回测、风控与审计追踪，为安全失败而设计。",
    "Scientific computing": "科学计算",
    "Distributed compute, instrumentation and reproducible lab workflows.": "分布式计算、仪器控制与可复现的实验室工作流。",
    "Developer experience": "开发者体验",
    "Local tools, desktop clients and verification utilities that respect your data.": "尊重你的数据的本地工具、桌面客户端与验证工具。",
    "“Build tools that are inspectable, safe by default, and a pleasure to use.”": "“打造可核查、默认安全、用起来愉悦的工具。”",
    "A principle across everything I ship": "贯穿所有作品的原则",

    /* ---------- Work page ---------- */
    "15 projects · 4 languages": "15 个项目 · 4 种语言",
    "All Work": "全部作品",
    "Open-source projects spanning AI agents, quantitative research, scientific hardware and developer tools — each with a clearly stated scope.": "涵盖 AI 智能体、量化研究、科学硬件与开发工具的开源项目——每个项目都有清晰的范围说明。",
    "All": "全部",
    "AI & Agents": "AI 与智能体",
    "Science & Hardware": "科学与硬件",
    "Dev Tools": "开发工具",
    "Experiments": "实验项目",
    "Developer tools · 2026": "开发工具 · 2026",
    "AI & quantitative systems · v2.1": "AI 与量化系统 · v2.1",
    "Science & hardware · Hackathon 2026": "科学与硬件 · 黑客松 2026",
    "Scientific computing · v1.0.1": "科学计算 · v1.0.1",
    "A recovery check you can inspect. Compare a restored ZIP against a trusted SHA-256 manifest — locally, without cloud accounts or API keys.": "可核查的恢复检查。将恢复后的 ZIP 与可信的 SHA-256 清单逐件比对——全程本地，无需云账户或 API 密钥。",
    "Four clear verdicts, from EXACT_MATCH to BLOCKED": "四种明确结论：从 EXACT_MATCH 到 BLOCKED",
    "Content-level comparison survives re-compression": "内容级比对不受重新压缩影响",
    "Strict path, size and link safety limits": "严格的路径、大小与链接安全限制",
    "A local-first AI quantitative research framework. Backtest, paper trade and evaluate strategies — with live trading blocked by default.": "本地优先的 AI 量化研究框架。回测、模拟交易与策略评估——实盘交易默认关闭。",
    "Four strategies with walk-forward validation": "四种策略，支持滚动前向验证",
    "Risk manager, approval gates and full audit logs": "风控、审批门与完整审计日志",
    "LLM debate loop and news-sentiment overlay": "大模型辩论循环与新闻情绪叠加",
    "A portable electrochemical biosensor and edge AI platform that brings lab-grade water testing to the field — for under $35.": "便携式电化学生物传感器与边缘 AI 平台，把实验室级水质检测带到现场——成本不足 35 美元。",
    "AD5940 precision analog front end on 4-layer HDI PCB": "4 层 HDI 板上的 AD5940 精密模拟前端",
    "Randles circuit fitting and ML contaminant classifier": "Randles 等效电路拟合与机器学习污染物分类",
    "WHO / EPA safety alerts with live Nyquist & Bode plots": "实时 Nyquist/Bode 图与 WHO/EPA 安全预警",
    "One Windows installer that turns a handful of lab PCs into a coordinated compute cluster for GROMACS and quantum chemistry workflows.": "一个 Windows 安装器，把几台实验室电脑变成协同的 GROMACS 与量子化学计算集群。",
    "Controller, compute node or both — set up in one run": "主控、计算节点或两者兼有——一次安装完成",
    "CPU / RAM / GPU contribution budgets per machine": "按机器设置 CPU / 内存 / GPU 贡献预算",
    "SHA-256 verified upgrades and a safe task queue": "SHA-256 校验升级与安全任务队列",
    "Read case study": "阅读项目详情",
    "Archive": "项目归档",
    "More projects": "更多项目",
    "WeChat RPA assistant with multi-LLM support (MiMo, DeepSeek, OpenAI), tool calls, per-user memory, todos and reminders.": "微信 RPA 助手，支持多模型（MiMo、DeepSeek、OpenAI）、工具调用、用户记忆、待办与提醒。",
    "AI-driven Chinese A-share portfolio management agent with DeepSeek reasoning, real-time Sina quotes and a Streamlit dashboard.": "AI 驱动的 A 股组合管理智能体，具备 DeepSeek 推理、新浪实时行情与 Streamlit 面板。",
    "Long-term stock portfolio management agent with DeepSeek reasoning, market tracking and a Streamlit dashboard.": "长期股票组合管理智能体，具备 DeepSeek 推理、市场追踪与 Streamlit 面板。",
    "An evidence-labeled Alexa+ simulated experiment-design assistant using synthetic data and a deterministic local scorer.": "带证据标注的 Alexa+ 模拟实验设计助手，使用合成数据与确定性本地评分器。",
    "Electron desktop client for the DSH Harness with a task-aware animated desktop pet, tray residency and self-healing reconnects.": "DSH Harness 的 Electron 桌面客户端，附带任务感知动画桌宠、托盘常驻与断线自愈。",
    "A Codex skill for compact, evidence-checked delegation to Antigravity through AGPair.": "面向 Codex 的技能，通过 AGPair 向 Antigravity 进行精简、带证据核验的任务委派。",
    "霜璃 — a Codex v2 animated desktop pet with 9 animation rows and 16 look directions.": "霜璃——Codex v2 动画桌宠，包含 9 行动画与 16 个视线方向。",
    "Offline reaction-kinetics teaching game prototype for Tuanjie Engine / Unity, with a browser mock and deterministic tests.": "面向团结引擎 / Unity 的离线反应动力学教学游戏原型，包含浏览器演示与确定性测试。",
    "Interactive AI companion shutdown-night ethics game with five adult cases, local audience voting and deterministic tests.": "互动式 AI 伴侣关停之夜伦理游戏，包含五个成人案例、本地观众投票与确定性测试。",
    "Automated daily check-in utility for Glados and Railgun services.": "Glados 与 Railgun 服务的每日自动签到工具。",
    "A Cloudflare-based email service — 基于 Cloudflare 的邮箱服务，支持 Cloudflare Email 收发。": "基于 Cloudflare 的邮箱服务，支持 Cloudflare Email 收发。",
    "Hackathon": "黑客松",
    "Multi-LLM": "多模型",
    "Desktop": "桌面端",
    "Creative": "创意",
    "Game": "游戏",
    "Utility": "工具",
    "Experiment": "实验",

    /* ---------- ArchiveLens detail ---------- */
    "Developer tools · Python · 2026": "开发工具 · Python · 2026",
    "A recovery check you can inspect. Compare the files in a restored ZIP against a trusted manifest saved earlier — entirely on your machine.": "可核查的恢复检查。将恢复后的 ZIP 与之前保存的可信清单逐件比对——完全在你的机器上完成。",
    "Language": "语言",
    "Interface": "界面",
    "License": "许可证",
    "Updated": "更新",
    "CLI + local workbench": "命令行 + 本地工作台",
    "October 2026": "2026 年 10 月",
    "Recovery report · restored-copy.zip": "恢复报告 · restored-copy.zip",
    "Exact match": "完全匹配",
    "Expected files": "预期文件",
    "Matched (SHA-256)": "匹配（SHA-256）",
    "Changed / missing": "已更改 / 缺失",
    "Unexpected extras": "意外多出",
    "Container bytes": "容器字节",
    "Re-compressed": "已重新压缩",
    "Overview": "概览",
    "Highlights": "亮点",
    "Trusted manifests": "可信清单",
    "Build a baseline from a known-good original, store it separately, and compare any later restoration against it.": "从确认无误的原始文件建立基线，独立保存，并用它比对之后的任何恢复副本。",
    "Four honest verdicts": "四种诚实的结论",
    "EXACT_MATCH, CHANGES_FOUND, REVIEW_EXTRAS or BLOCKED — no ambiguous “probably fine.”": "EXACT_MATCH、CHANGES_FOUND、REVIEW_EXTRAS 或 BLOCKED——没有含糊的“应该没问题”。",
    "Survives re-compression": "经得起重新压缩",
    "Identical file content passes even when the ZIP container bytes differ, and the report records both facts.": "即使 ZIP 容器字节不同，内容完全一致的文件仍会通过，报告会同时记录这两个事实。",
    "Conservative safety limits": "保守的安全限制",
    "64 MiB compressed, 128 MiB expanded, 1,000 entries. Unsafe paths, links and corrupt members are blocked, not guessed at.": "64 MiB 压缩、128 MiB 展开、1,000 个条目。不安全的路径、链接与损坏条目会被拦截，而不是靠猜测处理。",
    "How it works": "工作原理",
    "Original ZIP": "原始 ZIP",
    "Manifest · SHA-256": "清单 · SHA-256",
    "Recovered copy": "恢复副本",
    "Inspectable report": "可核查报告",
    "Create the manifest once from the original archive, keep it independently, then verify any restored copy. A manifest generated from the same recovery copy proves nothing — the tool documents that limitation instead of hiding it.": "先从原始压缩包生成一次清单，独立保存，然后验证任何恢复副本。用同一个恢复副本生成的清单什么都证明不了——工具会明确记录这一限制，而不是隐藏它。",
    "Scope and limits": "范围与限制",
    "Archive formats": "归档格式",
    "Stored / deflated, unencrypted ZIP": "存储 / 压缩、未加密的 ZIP",
    "Size limits": "大小限制",
    "64 MiB compressed · 128 MiB expanded · 32 MiB per member": "64 MiB 压缩 · 128 MiB 展开 · 单成员 32 MiB",
    "Comparison": "比对方式",
    "Relative paths + SHA-256 content hashes; empty files count": "相对路径 + SHA-256 内容哈希；空文件也计入",
    "Excluded": "不参与比对",
    "Directory entries, metadata, permissions, timestamps": "目录条目、元数据、权限、时间戳",
    "Blocked input": "拦截的输入",
    "Links, path traversal, duplicates, Unicode collisions, extreme compression ratios": "链接、路径穿越、重复项、Unicode 冲突、极端压缩比",
    "Not provided": "不提供",
    "Extraction, deletion, malware scanning or manifest authentication": "解压、删除、恶意软件扫描或清单认证",
    "Tech stack": "技术栈",
    "Local-first": "本地优先",
    "Local HTTP workbench": "本地 HTTP 工作台",
    "Standard library": "标准库",

    /* ---------- Quant Agent detail ---------- */
    "AI & quantitative systems · Python · v2.1": "AI 与量化系统 · Python · v2.1",
    "A local-first AI quantitative research framework. Backtest, paper trade and evaluate strategies — with live trading deliberately blocked behind real guardrails.": "本地优先的 AI 量化研究框架。回测、模拟交易与策略评估——实盘交易被真正的护栏刻意封锁。",
    "Version": "版本",
    "Trading": "交易",
    "Tests": "测试",
    "Paper-first": "模拟优先",
    "pytest suite": "pytest 测试集",
    "Research loop · daily run": "研究循环 · 每日运行",
    "Paper mode": "模拟模式",
    "Strategies evaluated": "评估策略数",
    "Best · MACD momentum": "最佳 · MACD 动量",
    "Risk checks": "风控检查",
    "Passed": "通过",
    "Live orders": "实盘订单",
    "Blocked": "已阻断",
    "Four strategies, one framework": "四种策略，一个框架",
    "MA cross, RSI, MACD momentum and Bollinger mean-reversion with shared parameter tuning and search spaces.": "均线交叉、RSI、MACD 动量与布林带均值回归，共享参数调优与搜索空间。",
    "Risk before returns": "风险先于收益",
    "Every order passes a risk manager with position, notional, daily-loss and drawdown limits — plus stop-loss and take-profit handling.": "每笔订单都经过风控：仓位、名义金额、单日亏损与回撤限制，并包含止损止盈处理。",
    "LLM research, not execution": "大模型用于研究，而非执行",
    "Agents submit JSON proposals that are converted to orders only through the gateway. They never touch a broker directly.": "智能体只提交 JSON 提案，且仅通过网关转换为订单。它们永远不会直接接触券商接口。",
    "Metrics that matter": "真正重要的指标",
    "Sortino and Calmar ratios, average trade P&L, win/loss streaks, and half-Kelly position sizing.": "Sortino 与 Calmar 比率、单笔平均盈亏、连胜/连亏纪录，以及半凯利仓位管理。",
    "Every order follows the same path": "每笔订单都走同一条路径",
    "Strategy": "策略",
    "Decision agent": "决策智能体",
    "Risk manager": "风控",
    "Approval gate": "审批门",
    "Broker adapter": "券商适配器",
    "Audit log": "审计日志",
    "Research workflow": "研究工作流",
    "Backtest": "回测",
    "Daily research loop over all strategies with performance comparison": "每日对全部策略运行研究循环并比较表现",
    "Self-improvement": "自我改进",
    "Walk-forward validation with review agents and a model registry": "由评审智能体与模型注册表支撑的滚动前向验证",
    "Promotion stages": "晋级阶段",
    "RESEARCH → CANDIDATE → PAPER → LIVE_ELIGIBLE (human approval only)": "RESEARCH → CANDIDATE → PAPER → LIVE_ELIGIBLE（仅限人工批准）",
    "News overlay": "新闻叠加",
    "Sentiment can reduce size or force HOLD; it cannot bypass risk checks": "情绪信号可以缩小仓位或强制持有，但不能绕过风控",
    "Audit trail": "审计追踪",
    "Every order and response written to JSONL logs, secrets never recorded": "每笔订单与响应都写入 JSONL 日志，绝不记录密钥",
    "Paper broker": "模拟券商",
    "Alpaca paper API with dry-run defaults": "Alpaca 模拟 API，默认试运行",

    /* ---------- BioSmartSense detail ---------- */
    "Science & hardware · Edge AI · Hackathon 2026": "科学与硬件 · 边缘 AI · 黑客松 2026",
    "A portable electrochemical biosensor and edge AI platform that brings lab-grade water testing to the field — for under $35 in parts.": "便携式电化学生物传感器与边缘 AI 平台，把实验室级水质检测带到现场——物料成本不足 35 美元。",
    "Sensor": "传感器",
    "Hardware": "硬件",
    "BOM cost": "物料成本",
    "Event": "赛事",
    "4-layer HDI PCB": "4 层 HDI PCB",
    "Hyperbloom · Sep 2026": "Hyperbloom · 2026 年 9 月",
    "Water sample · live EIS": "水样 · 实时 EIS",
    "Safe": "安全",
    "Rs (solution resistance)": "Rs（溶液电阻）",
    "Rct (charge transfer)": "Rct（电荷转移）",
    "CdL (double layer)": "CdL（双电层）",
    "Pb²⁺ estimate": "Pb²⁺ 估算",
    "WHO / EPA status": "WHO / EPA 状态",
    "Within limits": "符合限值",
    "Lab precision, field cost": "实验室精度，现场成本",
    "Full BOM under $35 using the AD5940’s 16-bit ADC, 800 kSPS sampling and on-chip DFT engine.": "利用 AD5940 的 16 位 ADC、800 kSPS 采样与片上 DFT 引擎，把整机物料成本控制在 35 美元以内。",
    "Wide electrochemical range": "宽电化学范围",
    "EIS from 0.016 Hz to 200 kHz with current ranges from ±28 µA to ±3 mA via programmable RTIAs.": "EIS 覆盖 0.016 Hz 至 200 kHz，借助可编程 RTIA 支持 ±28 µA 至 ±3 mA 电流范围。",
    "Physics-informed ML": "物理约束的机器学习",
    "Randles equivalent-circuit fitting (Rs, Rct, Cdl, Warburg) feeds a classifier for contaminant levels and water-quality index.": "Randles 等效电路拟合（Rs、Rct、Cdl、Warburg）为污染物水平与水质指数分类器提供输入。",
    "Actionable telemetry": "可行动的遥测",
    "Live Nyquist, Bode and cyclic-voltammetry plots with WHO / EPA safe, warning and hazard alerts.": "实时 Nyquist、Bode 与循环伏安图，并附带 WHO / EPA 安全、警告与危险预警。",
    "System architecture": "系统架构",
    "SPE electrodes": "SPE 电极",
    "Edge host · SPI": "边缘主机 · SPI",
    "Randles fitting": "Randles 拟合",
    "ML classifier": "ML 分类器",
    "Safety alert": "安全预警",
    "Specifications": "规格参数",
    "Analog front end": "模拟前端",
    "AD5940 · 16-bit, 800 kSPS SAR ADC, on-chip DFT": "AD5940 · 16 位、800 kSPS SAR ADC、片上 DFT",
    "PCB": "PCB",
    "4-layer FR4 HDI, 1.2 mm, controlled impedance, JLCPCB": "4 层 FR4 HDI、1.2 mm、阻抗控制、嘉立创制板",
    "Sensor interface": "传感器接口",
    "Standard 3-electrode SPE (WE / RE / CE, 2.54 mm pitch)": "标准三电极 SPE（WE / RE / CE，2.54 mm 间距）",
    "Frequency range": "频率范围",
    "0.016 Hz – 200 kHz electrochemical impedance spectroscopy": "0.016 Hz – 200 kHz 电化学阻抗谱",
    "Current range": "电流范围",
    "±28 µA – ±3 mA with programmable internal RTIAs": "±28 µA – ±3 mA，内置可编程 RTIA",
    "Host link": "主机连接",
    "16 MHz SPI / USB-UART telemetry": "16 MHz SPI / USB-UART 遥测",
    "Dashboard": "看板",
    "Streamlit with Nyquist, Bode and CV visualizations": "Streamlit，提供 Nyquist、Bode 与 CV 可视化",

    /* ---------- ChemCompute detail ---------- */
    "Scientific computing · Windows · v1.0.1": "科学计算 · Windows · v1.0.1",
    "One installer that turns a small lab into a coordinated compute cluster — controller, node agent and GROMACS / WSL adapter, with invited deployment and verified upgrades.": "一个安装器，把小型实验室变成协同计算集群——主控、节点代理与 GROMACS / WSL 适配器，支持邀请制部署与校验升级。",
    "Platform": "平台",
    "Workloads": "计算任务",
    "Windows desktop": "Windows 桌面端",
    "v1.0.1 stable": "v1.0.1 稳定版",
    "Compute console · cluster": "计算控制台 · 集群",
    "3 nodes": "3 个节点",
    "Controller": "主控",
    "Node · workstation": "节点 · 工作站",
    "Online · GROMACS": "在线 · GROMACS",
    "Node · laptop": "节点 · 笔记本",
    "Online · 8 cores": "在线 · 8 核",
    "Task queue": "任务队列",
    "Upgrade": "升级",
    "SHA-256 verified": "SHA-256 已校验",
    "One installer, three roles": "一个安装器，三种角色",
    "Bundles Python and Tk — no separate runtime. Target machines need nothing else installed.": "内置 Python 与 Tk，无需另行安装运行时，目标电脑不需要额外配置。",
    "Invite-only joining": "邀请制加入",
    "The controller exports a single-use invite; a new machine installs and registers with that code.": "主控导出一个一次性邀请码，新机器安装后用它注册加入。",
    "Contribution budgets": "贡献预算",
    "Owners set CPU core share, memory budget, GPU toggle, or pause new tasks entirely.": "所有者可设置 CPU 核心占比、内存预算、GPU 开关，或完全暂停接收新任务。",
    "Verified online upgrades": "可验证的在线升级",
    "Downloads from official releases, validates SHA-256, waits for idle tasks, preserves config and results.": "从官方发布下载，校验 SHA-256，等待任务空闲，并保留配置与结果。",
    "Task lifecycle": "任务生命周期",
    "Upload ZIP": "上传 ZIP",
    "Preview steps": "预览步骤",
    "Pick resources": "选择资源",
    "Node executes": "节点执行",
    "Results returned": "返回结果",
    "The v2 queue supports per-node task isolation, lease recovery after disconnects, and checkpoint-based GROMACS continuation. Package validation blocks directory traversal, links, encrypted archives, dangerous Windows names and CRC errors before anything runs.": "v2 队列支持节点间任务隔离、断线后的租约恢复，以及基于检查点的 GROMACS 续算。任务包在执行前会拦截目录穿越、链接、加密压缩包、Windows 危险名称与 CRC 错误。",
    "Scope and safety": "范围与安全",
    "Networking": "网络",
    "Private Tailscale mesh; HTTP for loopback / encrypted tailnet only": "私有 Tailscale 网络；HTTP 仅用于本机回环或加密的 tailnet",
    "GROMACS commands": "GROMACS 命令",
    "check · grompp · mdrun · editconf · solvate · genion · energy": "check · grompp · mdrun · editconf · solvate · genion · energy",
    "Package limits": "任务包限制",
    "100 MiB upload · 512 MiB expanded · 2,000 files": "100 MiB 上传 · 512 MiB 展开 · 2,000 个文件",
    "Output cap": "输出上限",
    "500 KB stdout/stderr per step": "每步 500 KB stdout/stderr",
    "Not a Windows service": "非 Windows 服务",
    "Starts with user login; not guaranteed before sign-in": "随用户登录启动；不保证登录前运行",
    "Not a sandbox": "非系统沙箱",
    "Resource budgets are admission criteria, not OS isolation": "资源预算是准入条件，而非操作系统级隔离",

    /* ---------- Shared tech tags ---------- */
    "Tailscale": "Tailscale",
    "GROMACS / WSL": "GROMACS / WSL",
    "GROMACS · Gaussian": "GROMACS · Gaussian",
    "Machine learning": "机器学习",
    "SHA-256 updates": "SHA-256 升级",
    "Tk desktop console": "Tk 桌面控制台",
    "Apache-2.0": "Apache-2.0"
  };

  const HTML_ZH = {
    "about.p1": "我是 <strong>Yansong Li</strong>，一名横跨 AI 智能体、量化系统与科学计算的开发者。我的项目都始于一个具体问题——恢复损坏的压缩包、让交易循环保持诚实，或让实验室级测量变得可负担。",
    "about.p2": "我关注那些<strong>可核查、并对自身局限保持诚实</strong>的系统：尽可能本地优先处理，对任何不可逆操作设置安全护栏，并明确区分已验证的行为与仍停留在理论层面的部分。",
    "about.p3": "这些作品大多开源在 <a class=\"link-arrow\" style=\"font-size:inherit\" href=\"https://github.com/C12isme945\" target=\"_blank\" rel=\"noopener\">GitHub <span class=\"arrow\">↗</span></a>。",
    "arch.overview1": "恢复 ZIP 备份本身不难，难的是确认恢复是否<strong>真正完整</strong>。ArchiveLens 会从原始压缩包生成可信的 SHA-256 清单，再对恢复副本逐文件比对——准确显示哪些文件被更改、缺失，或意外多出。",
    "arch.overview2": "整个过程在本地内存中运行，没有云账户、没有 API 密钥，也不发起任何外部请求。唯一会保留的，是你主动下载的报告。",
    "arch.callout": "<b>为诚实而设计。</b> 这个概念验证不会认证清单本身，不检查云端可用性，不扫描恶意软件，也不保证可以安全删除原始文件。它尚未经过独立安全审计——README 对此直言不讳。",
    "quant.overview1": "Quant Agent 是一个模块化的系统化交易研究框架：数据源、策略、回测、风控、券商与智能体都有明确的边界。它的目标是产出<strong>证据</strong>，而不是承诺——默认模式是回测或模拟交易，实盘路径需要多重刻意确认。",
    "quant.overview2": "v2.1 版本新增了多数据源采集（yfinance、AKShare、Alpha Vantage）、大模型服务商的图形化配置、新闻情绪叠加，以及一个可以提议策略进入模拟阶段、但绝不会自动授予实盘资格的研究循环。",
    "quant.live": "实盘提交需要同时满足：实盘模式、显式启用开关、关闭熔断开关、<code>ALPACA_PAPER=false</code>、输入风险确认声明、单独订单授权，并通过所有风控检查。缺少任何一项护栏，订单都不会发出。",
    "quant.callout": "<b>这是风险声明，不是营销文案。</b> 本项目只提供研究基础设施，不提供投资建议或收益保证。交易系统会亏钱、会在数据异常时失效、会出现意外行为——README 明确写了这一点，代码也按此假设构建。",
    "bio.overview1": "实验室的恒电位仪与阻抗分析仪价格在 <strong>5,000 至 15,000 美元</strong>之间，还需要台式环境和受训操作人员。这让常规水质筛查恰恰在最需要的地方遥不可及：分散式现场检测与即时诊断。",
    "bio.overview2": "BioSmartSense-IoT 用开源硬件回答这个问题：围绕 <strong>AD5940 精密模拟前端</strong>构建的紧凑 4 层 HDI 板，搭配标准丝网印刷电极，以及能在数秒内把原始阻抗数据转化为安全结论的边缘处理管线。",
    "bio.callout": "<b>黑客松范围。</b> 项目为 Hyperbloom 2026 年 9 月的 IoT + ML/AI + 社会公益赛道构建。仓库记录了硬件设计、固件接口与看板管线；针对认证实验室仪器的分析验证仍属后续工作。",
    "chem.overview1": "许多实验室有几台性能不错的电脑，却没有简单的方式把它们组织起来。ChemCompute 将整套方案打包进一个 Windows 安装器：选择<strong>主控</strong>、<strong>计算节点</strong>或<strong>两者兼有</strong>，机器就会注册进一个私有的、邀请制的计算池。",
    "chem.overview2": "控制台展示节点的 CPU、内存与 GPU 容量，允许所有者设置贡献预算，并通过队列运行 GROMACS 任务：上传步骤包，在选定节点执行，再把结果流式传回。Gaussian 通过私有厂商介质部署路径提供支持。",
    "chem.callout": "<b>已声明的限制。</b> 发布版本为自签名，Windows 可能提示未知发布者。远程访问通过 Cloudflare Tunnel，域名不是监听地址。README 清楚区分了已验证的行为与仍在验证中的部分。",
    "footer.tagline": "Yansong Li · 工程师与创作者"
  };

  const TITLES = {
    "index.html": { en: "Yansong Li — Engineer & Builder", zh: "Yansong Li — 工程师与创作者" },
    "work.html": { en: "Work — Yansong Li", zh: "作品 — Yansong Li" },
    "archivelens.html": { en: "ArchiveLens — Yansong Li", zh: "ArchiveLens — Yansong Li" },
    "quant-agent.html": { en: "Quant Agent — Yansong Li", zh: "Quant Agent — Yansong Li" },
    "biosmartsense.html": { en: "BioSmartSense-IoT — Yansong Li", zh: "BioSmartSense-IoT — Yansong Li" },
    "chemcompute.html": { en: "ChemCompute — Yansong Li", zh: "ChemCompute — Yansong Li" }
  };

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "SVG", "CODE", "PRE", "NOSCRIPT"]);
  let currentLang = "en";
  const originalText = new WeakMap();
  const originalHTML = new WeakMap();

  function normalize(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  function collectTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest(".lang-switch")) return NodeFilter.FILTER_REJECT;
        if (parent.closest("[data-i18n-html]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  const textNodes = collectTextNodes();
  textNodes.forEach((node) => originalText.set(node, node.nodeValue));

  const htmlBlocks = Array.from(document.querySelectorAll("[data-i18n-html]"));
  htmlBlocks.forEach((el) => originalHTML.set(el, el.innerHTML));

  function applyText(lang) {
    textNodes.forEach((node) => {
      const original = originalText.get(node);
      if (original === undefined) return;
      if (lang !== "zh") {
        node.nodeValue = original;
        return;
      }
      const key = normalize(original);
      const zh = TEXT_ZH[key];
      if (!zh) {
        node.nodeValue = original;
        return;
      }
      const lead = (original.match(/^\s*/) || [""])[0];
      const trail = (original.match(/\s*$/) || [""])[0];
      node.nodeValue = lead + zh + trail;
    });

    htmlBlocks.forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const original = originalHTML.get(el);
      if (lang === "zh" && HTML_ZH[key]) {
        el.innerHTML = HTML_ZH[key];
      } else if (original !== undefined) {
        el.innerHTML = original;
      }
    });
  }

  function updateToggle(lang) {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }

  function updateTitle(lang) {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const entry = TITLES[path];
    if (!entry) return;
    document.title = entry[lang] || entry.en;
  }

  function applyLang(lang) {
    currentLang = lang === "zh" ? "zh" : "en";
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    applyText(currentLang);
    updateToggle(currentLang);
    updateTitle(currentLang);
    try {
      localStorage.setItem("yl-lang", currentLang);
    } catch (e) {}
  }

  function init() {
    let lang = "en";
    try {
      const stored = localStorage.getItem("yl-lang");
      const params = new URLSearchParams(window.location.search);
      const query = params.get("lang");
      if (query === "zh" || query === "en") lang = query;
      else if (stored === "zh") lang = "zh";
    } catch (e) {}
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => applyLang(btn.dataset.lang));
    });
    applyLang(lang);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
