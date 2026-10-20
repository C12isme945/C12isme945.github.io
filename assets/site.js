(function () {
  "use strict";
  const catalog = window.siteCatalog || [];
  const byId = new Map(catalog.map(item => [item.id, item]));
  const groups = ["全部", "核心汇报", "专题汇报", "历史版本"];
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = value => String(value).padStart(2, "0");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let artId = 0;

  function getLang() {
    try {
      return localStorage.getItem("yl_lang") === "en" ? "en" : "zh";
    } catch (_) {
      return "zh";
    }
  }

  function palette(item) {
    if (item.id === "kaiti-v5") return ["#0b1220", "#94a3b8", "#38bdf8"];
    if (item.id === "mechanism") return ["#eef5ff", "#0066cc", "#00c7be"];
    if (item.id === "timeline") return ["#f3f1ff", "#5856d6", "#0071e3"];
    if (item.id === "methods") return ["#ecfdf5", "#0d9488", "#0071e3"];
    if (item.id === "conversion") return ["#f2f4f8", "#1d1d1f", "#0071e3"];
    return ["#f2f2f7", "#6e6e73", "#0071e3"];
  }

  function artwork(item) {
    const p = palette(item), uid = "art-" + (++artId);
    let shapes;
    if (item.id === "kaiti-v5") {
      shapes =
        '<defs>' +
        '<radialGradient id="' + uid + '-bg" cx=".5" cy=".42" r=".72"><stop offset="0" stop-color="#132540"/><stop offset=".6" stop-color="#0b1220"/><stop offset="1" stop-color="#070b14"/></radialGradient>' +
        '<radialGradient id="' + uid + '-ha" cx=".3" cy=".24" r=".78"><stop offset="0" stop-color="#ffffff"/><stop offset=".24" stop-color="#a5f3fc"/><stop offset=".62" stop-color="#0071e3"/><stop offset="1" stop-color="#002b5e"/></radialGradient>' +
        '<radialGradient id="' + uid + '-pep" cx=".3" cy=".24" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".28" stop-color="#e0e7ff"/><stop offset=".65" stop-color="#6366f1"/><stop offset="1" stop-color="#312e81"/></radialGradient>' +
        '<linearGradient id="' + uid + '-has" x1="110" y1="205" x2="370" y2="65" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0284c7" stop-opacity=".55"/><stop offset=".5" stop-color="#38bdf8"/><stop offset="1" stop-color="#0071e3"/></linearGradient>' +
        '<linearGradient id="' + uid + '-peps" x1="135" y1="70" x2="365" y2="205" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c084fc"/><stop offset=".5" stop-color="#6366f1"/><stop offset="1" stop-color="#38bdf8"/></linearGradient>' +
        '</defs>' +
        '<rect width="480" height="270" fill="url(#' + uid + '-bg)"/>' +
        '<rect width="480" height="270" fill="url(#' + uid + '-grid)"/>' +
        '<g stroke="#e2e8f0" stroke-width=".6" opacity=".14"><circle cx="240" cy="135" r="96"/><circle cx="240" cy="135" r="72" stroke-dasharray="2 6"/></g>' +
        '<ellipse cx="240" cy="135" rx="132" ry="44" fill="none" stroke="#38bdf8" stroke-width=".75" opacity=".2" transform="rotate(-28 240 135)"/>' +
        '<path d="M124 190C104 136 140 94 188 112S236 204 282 156 344 110 322 52" fill="none" stroke="url(#' + uid + '-has)" stroke-width="9" stroke-linecap="round"/>' +
        '<path d="M146 66C182 40 216 82 238 110S272 202 334 198" fill="none" stroke="url(#' + uid + '-peps)" stroke-width="4.5" stroke-linecap="round"/>' +
        '<g fill="url(#' + uid + '-ha)">' +
        '<circle cx="124" cy="190" r="13"/><circle cx="122" cy="146" r="11"/><circle cx="152" cy="112" r="13"/><circle cx="188" cy="111" r="11"/><circle cx="214" cy="138" r="15"/><circle cx="239" cy="166" r="11.5"/><circle cx="268" cy="170" r="13.5"/><circle cx="295" cy="141" r="11"/><circle cx="321" cy="112" r="13.5"/><circle cx="330" cy="78" r="11"/><circle cx="322" cy="52" r="13"/>' +
        '</g>' +
        '<g fill="url(#' + uid + '-pep)">' +
        '<circle cx="146" cy="66" r="7.5"/><circle cx="174" cy="60" r="6.5"/><circle cx="196" cy="71" r="7.5"/><circle cx="218" cy="89" r="6.5"/><circle cx="238" cy="110" r="8.5"/><circle cx="249" cy="139" r="6.5"/><circle cx="262" cy="164" r="7.5"/><circle cx="282" cy="184" r="6.5"/><circle cx="308" cy="195" r="7.5"/><circle cx="334" cy="198" r="8.5"/>' +
        '</g>' +
        '<circle cx="238" cy="110" r="14" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 3" opacity=".7"/>' +
        '<text x="92" y="216" fill="#f8fafc" font-family="-apple-system,BlinkMacSystemFont,\'SF Pro Display\',sans-serif" font-size="12" font-weight="600">HA<tspan dx="6" font-size="7" font-weight="500" letter-spacing=".12em" fill="#94a3b8">HYALURONIC ACID</tspan></text>' +
        '<text x="332" y="176" fill="#c7d2fe" font-family="-apple-system,BlinkMacSystemFont,\'SF Pro Display\',sans-serif" font-size="11" font-weight="600">PEP</text>';
    } else if (item.id === "mechanism") {
      shapes =
        '<circle cx="240" cy="135" r="115" fill="url(#' + uid + '-glow)" opacity=".55"/>' +
        '<g fill="none" stroke="' + p[1] + '">' +
        '<circle cx="240" cy="135" r="98" opacity=".14"/>' +
        '<ellipse cx="240" cy="135" rx="172" ry="54" transform="rotate(-24 240 135)" opacity=".28"/>' +
        '<ellipse cx="240" cy="135" rx="154" ry="48" transform="rotate(22 240 135)" stroke="' + p[2] + '" stroke-dasharray="3 6" opacity=".32"/>' +
        '<circle cx="240" cy="135" r="56" stroke-dasharray="3 6" opacity=".38"/>' +
        '<path d="M115 185 240 135 355 86M160 62 240 135 322 210" opacity=".35" stroke-width="1.2"/>' +
        '</g>' +
        '<g fill="url(#' + uid + ')">' +
        '<circle cx="240" cy="135" r="36"/>' +
        '<circle cx="115" cy="185" r="14"/>' +
        '<circle cx="355" cy="86" r="19"/>' +
        '</g>' +
        '<g fill="' + p[2] + '">' +
        '<circle cx="160" cy="62" r="7.5"/>' +
        '<circle cx="322" cy="210" r="10.5"/>' +
        '</g>' +
        '<text x="240" y="139" text-anchor="middle" fill="#ffffff" font-family="-apple-system,BlinkMacSystemFont,\'SF Pro Display\',sans-serif" font-size="11" font-weight="600" letter-spacing=".04em">HA × PEP</text>';
    } else if (item.id === "timeline") {
      shapes =
        '<circle cx="260" cy="125" r="120" fill="url(#' + uid + '-glow)" opacity=".45"/>' +
        '<g stroke="' + p[1] + '" opacity=".1">' +
        '<path d="M85 45V220M190 45V220M295 45V220M400 45V220"/>' +
        '<path d="M45 85H435M45 135H435M45 185H435"/>' +
        '</g>' +
        '<path d="M52 200C104 200 102 146 162 146S230 94 288 94 350 56 426 56" fill="none" stroke="' + p[1] + '" stroke-width="2.5" stroke-linecap="round"/>' +
        '<g fill="#ffffff" stroke="' + p[1] + '" stroke-width="2.5">' +
        '<circle cx="92" cy="185" r="7.5"/>' +
        '<circle cx="190" cy="139" r="7.5"/>' +
        '<circle cx="288" cy="94" r="8.5" stroke="' + p[2] + '"/>' +
        '<circle cx="392" cy="59" r="7.5"/>' +
        '</g>' +
        '<circle cx="288" cy="94" r="19" fill="none" stroke="' + p[2] + '" stroke-width="1.2" opacity=".42"/>' +
        '<g fill="' + p[1] + '" opacity=".7" font-size="10" font-weight="600">' +
        '<text x="82" y="216">01</text><text x="180" y="170">02</text><text x="278" y="126">03</text><text x="382" y="91">04</text>' +
        '</g>';
    } else if (item.id === "methods") {
      shapes =
        '<circle cx="265" cy="130" r="115" fill="url(#' + uid + '-glow)" opacity=".45"/>' +
        '<g fill="none" stroke="' + p[1] + '">' +
        '<path d="M95 202V55M95 202H401" opacity=".32" stroke-width="1.2"/>' +
        '<path d="M135 190C196 188 214 109 275 99S346 73 382 54" stroke-width="2.2" stroke-linecap="round"/>' +
        '<path d="M130 169C188 166 225 80 278 77S351 48 382 35L382 78C340 100 330 124 275 125S201 216 145 215Z" fill="' + p[1] + '" fill-opacity=".09" stroke="none"/>' +
        '<circle cx="264" cy="132" r="72" stroke-dasharray="3 7" opacity=".22"/>' +
        '</g>' +
        '<g fill="' + p[1] + '">' +
        '<circle cx="143" cy="182" r="4.5"/><circle cx="182" cy="168" r="4.5"/><circle cx="215" cy="128" r="4.5"/><circle cx="270" cy="107" r="4.5"/><circle cx="342" cy="79" r="4.5"/>' +
        '</g>' +
        '<circle cx="297" cy="94" r="7.5" fill="' + p[2] + '"/>' +
        '<circle cx="297" cy="94" r="18" fill="none" stroke="' + p[2] + '" stroke-width="1.2" opacity=".45"/>' +
        '<text x="112" y="58" fill="' + p[1] + '" opacity=".8" font-size="9" font-weight="600" letter-spacing=".08em">DESIGN · LEARN · REFINE</text>';
    } else if (item.id === "conversion") {
      shapes =
        '<circle cx="240" cy="135" r="120" fill="url(#' + uid + '-glow)" opacity=".45"/>' +
        '<g fill="none" stroke="' + p[1] + '" opacity=".12">' +
        '<path d="M40 135H440M240 30V240"/><circle cx="240" cy="135" r="110" stroke-dasharray="3 6"/>' +
        '</g>' +
        '<circle cx="184" cy="135" r="74" fill="' + p[1] + '" fill-opacity=".05" stroke="' + p[1] + '" stroke-width="1.5" stroke-opacity=".45"/>' +
        '<circle cx="296" cy="135" r="74" fill="' + p[2] + '" fill-opacity=".08" stroke="' + p[2] + '" stroke-width="1.5" stroke-opacity=".75"/>' +
        '<text x="174" y="149" text-anchor="middle" fill="' + p[1] + '" font-family="-apple-system,BlinkMacSystemFont,\'SF Pro Display\',sans-serif" font-weight="600" font-size="42">A</text>' +
        '<text x="306" y="149" text-anchor="middle" fill="' + p[2] + '" font-family="-apple-system,BlinkMacSystemFont,\'SF Pro Display\',sans-serif" font-weight="600" font-size="42">D</text>' +
        '<path d="M220 135h40m-6-5 6 5-6 5" fill="none" stroke="' + p[2] + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>';
    } else {
      const version = item.id === "kaiti-archive" ? "01" : item.id.split("-")[1].toUpperCase();
      shapes =
        '<g fill="#ffffff" stroke="' + p[1] + '" stroke-opacity=".22" stroke-width="1.2">' +
        '<rect x="156" y="48" width="176" height="176" rx="18" transform="rotate(10 244 136)"/>' +
        '<rect x="146" y="44" width="176" height="176" rx="18" transform="rotate(-6 234 132)"/>' +
        '<rect x="152" y="43" width="176" height="176" rx="18"/>' +
        '</g>' +
        '<text x="240" y="144" font-size="48" font-weight="700" font-family="-apple-system,BlinkMacSystemFont,\'SF Pro Display\',sans-serif" text-anchor="middle" fill="#1d1d1f" letter-spacing="-.03em">' + esc(version) + '</text>' +
        '<path d="M188 174H292M204 186H276" stroke="' + p[2] + '" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>';
    }
    return (
      '<svg viewBox="0 0 480 270" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<radialGradient id="' + uid + '" cx=".3" cy=".24">' +
      '<stop stop-color="#7dd3fc"/><stop offset=".55" stop-color="#0071e3"/><stop offset="1" stop-color="#1e3a8a"/>' +
      '</radialGradient>' +
      '<radialGradient id="' + uid + '-glow" cx=".5" cy=".5" r=".5">' +
      '<stop stop-color="' + p[2] + '" stop-opacity=".28"/><stop offset="1" stop-color="' + p[2] + '" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<pattern id="' + uid + '-grid" width="24" height="24" patternUnits="userSpaceOnUse">' +
      '<circle cx="1" cy="1" r=".7" fill="' + p[1] + '" opacity=".14"/>' +
      '</pattern>' +
      '</defs>' +
      '<rect width="480" height="270" fill="' + p[0] + '"/>' +
      '<rect width="480" height="270" fill="url(#' + uid + '-grid)"/>' +
      '<g font-family="\'SF Mono\',Consolas,monospace">' + shapes + '</g>' +
      '</svg>'
    );
  }

  function card(item, index) {
    const a = document.createElement("a"), featured = item.id === "kaiti-v5", p = palette(item);
    const lang = getLang();
    const tTitle = lang === "en" && item.titleEn ? item.titleEn : item.title;
    const tGroup = lang === "en" && item.groupEn ? item.groupEn : item.group;
    const tTag = lang === "en" && item.tagEn ? item.tagEn : item.tag;
    const tSub = lang === "en" && item.subtitleEn ? item.subtitleEn : item.subtitle;
    const tSum = lang === "en" && item.summaryEn ? item.summaryEn : item.summary;
    const tMore = lang === "en" ? "View Module Details" : "查看介绍";

    a.className = "page-card" + (featured ? " page-card--featured" : "");
    a.href = "intro.html?id=" + encodeURIComponent(item.id);
    a.dataset.group = item.group;
    a.dataset.search = [
      item.title, item.titleEn || "",
      item.subtitle, item.subtitleEn || "",
      item.summary, item.summaryEn || "",
      item.tag, item.tagEn || "",
      item.source,
      ...item.focus,
      ...(item.focusEn || [])
    ].join(" ").toLocaleLowerCase();
    a.setAttribute("aria-labelledby", "title-" + item.id);
    a.setAttribute("aria-describedby", "summary-" + item.id);
    a.innerHTML =
      '<div class="card-cover" style="color:' + p[1] + ';background:' + p[0] + '">' +
      artwork(item) +
      '<span class="cover-index" aria-hidden="true">' + pad(index + 1) + ' / COLLECTION</span>' +
      '<span class="cover-type" aria-hidden="true">' +
      (featured ? "RESEARCH PROPOSAL" : ({ mechanism: "MECHANISM", timeline: "EVIDENCE", methods: "METHODOLOGY", conversion: "TRANSLATION" }[item.id] || "ARCHIVE")) +
      '</span></div>' +
      '<div class="card-info">' +
      '<div class="card-top"><span class="card-group" data-zh="' + esc(item.group) + '" data-en="' + esc(item.groupEn || item.group) + '">' + esc(tGroup) + '</span>' +
      '<span class="card-tag" data-zh="' + esc(item.tag) + '" data-en="' + esc(item.tagEn || item.tag) + '">' + esc(tTag) + '</span></div>' +
      (featured ? '<p class="featured-version">FLAGSHIP KEYNOTE · v5</p>' : "") +
      '<h3 id="title-' + item.id + '" data-zh="' + esc(item.title) + '" data-en="' + esc(item.titleEn || item.title) + '">' + esc(tTitle) + '</h3>' +
      (featured ? '<p class="featured-subtitle" data-zh="' + esc(item.subtitle) + '" data-en="' + esc(item.subtitleEn || item.subtitle) + '">' + esc(tSub) + '</p>' : "") +
      '<p class="card-summary" id="summary-' + item.id + '" data-zh="' + esc(item.summary) + '" data-en="' + esc(item.summaryEn || item.summary) + '">' + esc(tSum) + '</p>' +
      '<div class="card-bottom"><strong data-zh="查看介绍" data-en="View Module Details">' + esc(tMore) + '</strong><span class="card-arrow" aria-hidden="true">↗</span></div>' +
      '</div>';
    return a;
  }

  const grid = document.getElementById("card-grid");
  if (grid) {
    const archive = document.getElementById("archive"), list = document.getElementById("archive-list");
    catalog.forEach((item, index) => {
      if (item.group !== "历史版本") grid.appendChild(card(item, index));
      else {
        const a = document.createElement("a");
        const lang = getLang();
        const verZh = item.id === "kaiti-archive" ? "初版" : item.id.split("-")[1];
        const verEn = item.id === "kaiti-archive" ? "v1" : item.id.split("-")[1];
        a.className = "archive-row";
        a.href = "intro.html?id=" + encodeURIComponent(item.id);
        a.dataset.search = [
          item.title, item.titleEn || "",
          item.subtitle, item.subtitleEn || "",
          item.summary, item.summaryEn || "",
          item.tag, item.tagEn || "",
          item.source
        ].join(" ").toLocaleLowerCase();
        a.innerHTML =
          '<span class="archive-version" data-zh="' + esc(verZh) + '" data-en="' + esc(verEn) + '">' + esc(lang === "en" ? verEn : verZh) + '</span>' +
          '<span class="archive-row-main">' +
          '<h3 data-zh="' + esc(item.title) + '" data-en="' + esc(item.titleEn || item.title) + '">' + esc(lang === "en" && item.titleEn ? item.titleEn : item.title) + '</h3>' +
          '<p data-zh="' + esc(item.subtitle) + '" data-en="' + esc(item.subtitleEn || item.subtitle) + '">' + esc(lang === "en" && item.subtitleEn ? item.subtitleEn : item.subtitle) + '</p>' +
          '</span>' +
          '<span aria-hidden="true">↗</span>';
        list.appendChild(a);
      }
    });
    const chips = [...document.querySelectorAll(".filter-chip")], search = document.getElementById("page-search");
    const clear = document.getElementById("clear-search"), count = document.getElementById("result-count"), empty = document.getElementById("empty-state");
    const params = new URLSearchParams(location.search);
    let group = groups.includes(params.get("category")) ? params.get("category") : "全部";
    search.value = (params.get("q") || "").slice(0, 120);
    function update(writeURL) {
      const q = search.value.trim().toLocaleLowerCase();
      const lang = getLang();
      let currentCount = 0, historyCount = 0;
      chips.forEach(chip => {
        const selected = chip.dataset.filter === group;
        chip.classList.toggle("active", selected);
        chip.setAttribute("aria-pressed", String(selected));
      });
      for (const node of grid.children) {
        const show = (group === "全部" || node.dataset.group === group) && (!q || node.dataset.search.includes(q));
        node.hidden = !show;
        if (show) currentCount++;
      }
      for (const node of list.children) {
        const show = (group === "全部" || group === "历史版本") && (!q || node.dataset.search.includes(q));
        node.hidden = !show;
        if (show) historyCount++;
      }
      grid.hidden = currentCount === 0;
      grid.dataset.mode = group;
      archive.hidden = historyCount === 0;
      archive.open = group === "历史版本" || !!q;
      document.getElementById("archive-count").textContent = pad(historyCount);
      const total = currentCount + historyCount;
      if (lang === "en") {
        count.textContent = total + " modules" + (historyCount && currentCount ? " · " + currentCount + " active entries, " + historyCount + " archived versions" : "");
      } else {
        count.textContent = total + " 个页面" + (historyCount && currentCount ? " · " + currentCount + " 个当前入口，" + historyCount + " 个历史版本" : "");
      }
      empty.hidden = total !== 0;
      document.getElementById("empty-description").textContent = q
        ? (lang === "en"
            ? 'No modules matched "' + search.value.trim() + '". Try another keyword or switch filters.'
            : "没有匹配“" + search.value.trim() + "”的资料。试试其他关键词或切换分组。")
        : (lang === "en" ? "No modules in this category." : "当前分组没有匹配资料，试试其他分组。");
      clear.hidden = !search.value;
      search.parentElement.querySelector("kbd").hidden = !!search.value;
      const state = { group, q: search.value };
      try { sessionStorage.setItem("atlas-library", JSON.stringify(state)); } catch (_) {}
      if (writeURL) {
        const url = new URL(location.href);
        group === "全部" ? url.searchParams.delete("category") : url.searchParams.set("category", group);
        search.value.trim() ? url.searchParams.set("q", search.value.trim()) : url.searchParams.delete("q");
        history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
    }
    chips.forEach(chip => chip.addEventListener("click", () => { group = chip.dataset.filter; update(true); }));
    search.addEventListener("input", () => update(true));
    clear.addEventListener("click", () => { search.value = ""; update(true); search.focus(); });
    document.getElementById("reset-filters").addEventListener("click", () => { group = "全部"; search.value = ""; update(true); search.focus(); });
    document.querySelectorAll("[data-quick-filter]").forEach(link => link.addEventListener("click", event => {
      event.preventDefault();
      group = link.dataset.quickFilter;
      search.value = "";
      update(true);
      document.getElementById("library").scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth" });
    }));
    document.addEventListener("keydown", event => {
      const editable = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
      if (event.key === "/" && !editable && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        search.focus();
      }
      if (event.key === "Escape" && document.activeElement === search) {
        search.value = "";
        update(true);
      }
    });
    window.addEventListener("yl:langchange", () => update(false));
    update(false);
    window.addEventListener("pageshow", () => update(false));
  }

  if (document.getElementById("intro-title")) {
    const item = byId.get(new URLSearchParams(location.search).get("id"));
    if (!item) {
      document.querySelector(".intro-main").innerHTML =
        '<div class="not-found"><p class="eyebrow">PAGE NOT FOUND</p><h1 data-zh="这份资料暂时没有找到" data-en="Module Not Found">这份资料暂时没有找到</h1><p data-zh="回到资料集，选择一个交互页面继续阅读。" data-en="Return to the Research Atlas collection to choose an interactive module.">回到资料集，选择一个交互页面继续阅读。</p><a class="button button-dark" href="index.html#library" data-zh="返回资料集 ↗" data-en="Back to Atlas ↗">返回资料集 ↗</a></div>';
    } else {
      const index = catalog.indexOf(item), p = palette(item);
      const canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = "https://yansongli.com/intro.html?id=" + encodeURIComponent(item.id);
      document.head.appendChild(canonical);

      const open = document.getElementById("open-original");
      open.href = "apps/" + item.target;
      open.target = "_blank";
      open.rel = "noopener";
      if (item.download) {
        const dl = document.getElementById("download-link");
        dl.href = item.download;
        dl.hidden = false;
        dl.setAttribute("download", "");
      }
      const preview = document.getElementById("intro-preview");
      preview.style.background = p[0];
      preview.style.color = p[1];
      preview.innerHTML =
        '<span class="intro-art-label"><span>HA × PEP / STUDIO</span><span>' + pad(index + 1) + '—09</span></span>' +
        artwork(item) +
        '<span class="intro-art-footer" data-zh="RESEARCH IN CONTEXT · 研究主题示意" data-en="RESEARCH IN CONTEXT · SPATIAL PREVIEW">RESEARCH IN CONTEXT · 研究主题示意</span>';

      function renderIntroLang() {
        const lang = getLang();
        const isEn = lang === "en";
        const tTitle = isEn && item.titleEn ? item.titleEn : item.title;
        const tGroup = isEn && item.groupEn ? item.groupEn : item.group;
        const tTag = isEn && item.tagEn ? item.tagEn : item.tag;
        const tSub = isEn && item.subtitleEn ? item.subtitleEn : item.subtitle;
        const tSum = isEn && item.summaryEn ? item.summaryEn : item.summary;
        const tNote = isEn
          ? (item.noteEn || (item.group === "历史版本"
              ? "Archived iteration preserved for provenance comparison. Start with v5 for the latest proposal structure."
              : "Open the full interactive page to use chapter navigation, interactive visualizations, and deep-dive controls."))
          : (item.note || (item.group === "历史版本"
              ? "这是一份历史版本，可与后续版本对照阅读。建议先从 v5 了解当前的开题结构。"
              : "进入完整页面后，可使用原页面的章节导航与交互控件，沿感兴趣的线索继续阅读。"));

        document.title = tTitle + (isEn ? " — HA × PEP Research Atlas · Yansong Li" : " — HA × PEP 研究图谱 · 李岩松");
        document.querySelector('meta[name="description"]').content = tSum;
        document.getElementById("breadcrumb-current").textContent = tTitle;
        document.getElementById("intro-eyebrow").textContent = pad(index + 1) + " / " + tGroup;
        document.getElementById("intro-kicker").textContent = tTag;

        const title = document.getElementById("intro-title");
        title.textContent = tTitle;
        if (!isEn && (item.id === "methods" || item.id === "conversion")) {
          const parts = item.title.split(" · ");
          title.innerHTML = '<span>' + esc(parts[0]) + '</span><span class="intro-title-secondary"><span class="intro-title-separator"> · </span>' + esc(parts[1]) + '</span>';
          title.setAttribute("aria-label", item.title);
        }
        document.getElementById("intro-subtitle").textContent = tSub;
        document.getElementById("intro-summary").textContent = tSum;
        document.getElementById("intro-source").textContent = item.source;
        document.getElementById("intro-group").textContent = tGroup;
        document.getElementById("intro-note").textContent = tNote;

        const focusList = document.getElementById("focus-list");
        focusList.innerHTML = "";
        (isEn && item.focusEn ? item.focusEn : item.focus).forEach(text => {
          const li = document.createElement("li");
          li.textContent = text;
          focusList.appendChild(li);
        });

        open.setAttribute("aria-label", isEn ? "Open full interactive module for " + tTitle : "打开" + item.title + "的完整交互页面（新标签页）");

        const relatedGrid = document.getElementById("related-grid");
        relatedGrid.innerHTML = "";
        const map = {
          "kaiti-v5": ["mechanism", "methods"],
          mechanism: ["kaiti-v5", "timeline"],
          timeline: ["kaiti-v5", "methods"],
          methods: ["kaiti-v5", "conversion"],
          conversion: ["methods", "mechanism"]
        };
        (map[item.id] || ["kaiti-v5", "timeline"]).forEach(id => {
          const related = byId.get(id), a = document.createElement("a");
          if (!related) return;
          const rGroup = isEn && related.groupEn ? related.groupEn : related.group;
          const rTitle = isEn && related.titleEn ? related.titleEn : related.title;
          const rTag = isEn && related.tagEn ? related.tagEn : related.tag;
          a.className = "related-card";
          a.href = "intro.html?id=" + encodeURIComponent(id);
          a.innerHTML =
            '<span class="related-number" aria-hidden="true">' + pad(catalog.indexOf(related) + 1) + '</span>' +
            '<span class="related-copy"><span>' + esc(rGroup) + '</span><h3>' + esc(rTitle) + '</h3><p>' + esc(rTag) + '</p></span>' +
            '<span aria-hidden="true">↗</span>';
          relatedGrid.appendChild(a);
        });
      }

      renderIntroLang();
      window.addEventListener("yl:langchange", renderIntroLang);
    }
    try {
      const state = JSON.parse(sessionStorage.getItem("atlas-library") || "{}"), back = new URL("index.html", location.href);
      if (groups.includes(state.group) && state.group !== "全部") back.searchParams.set("category", state.group);
      if (typeof state.q === "string" && state.q.trim()) back.searchParams.set("q", state.q.slice(0, 120).trim());
      back.hash = "library";
      document.querySelectorAll("[data-library-back]").forEach(link => (link.href = back.pathname + back.search + back.hash));
    } catch (_) {}
  }

  const menu = document.querySelector(".menu-button"), header = document.querySelector(".topbar");
  if (menu) {
    function closeMenu(returnFocus) {
      header.classList.remove("menu-open");
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "打开导航");
      if (returnFocus) menu.focus();
    }
    menu.addEventListener("click", () => {
      const open = header.classList.toggle("menu-open");
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
    });
    document.querySelectorAll(".nav-links>a").forEach(a => a.addEventListener("click", () => closeMenu(false)));
    document.addEventListener("click", e => { if (!header.contains(e.target)) closeMenu(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && header.classList.contains("menu-open")) closeMenu(true); });
    window.matchMedia("(min-width:681px)").addEventListener("change", e => { if (e.matches) closeMenu(false); });
  }
})();
