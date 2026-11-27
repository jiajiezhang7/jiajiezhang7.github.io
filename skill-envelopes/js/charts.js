/* ==========================================================================
   Interactive D3.js Charts for VLAs Execute, Code Recovers Project Page
   All numbers strictly sourced from paper numbers.tex (RSS 2027 Stage-1).
   ========================================================================== */
(function () {
  if (typeof d3 === "undefined") return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const T = (ms) => (reduce ? 0 : ms);
  const EASE = d3.easeCubicOut;

  const PAL = {
    paper: "#FFFFFF",
    paper2: "#F2ECE6",
    ink: "#1B1E23",
    ink2: "#464B54",
    muted: "#6F747E",
    line: "#E5DFD6",
    line2: "#CFC7BC",
    good: "#527A2D",
    body: "#2F6DB3",
    world: "#C65633",
    view: "#7B60A8",
    warn: "#A86A12",
    crit: "#B8382A",
    fail: "#68645C",
    neutral: "#B7B1A4",
  };

  let tipEl;
  function getTip() {
    if (!tipEl) {
      tipEl = document.createElement("div");
      tipEl.className = "chart-tip";
      document.body.appendChild(tipEl);
    }
    return tipEl;
  }

  function hover(sel, htmlFn) {
    sel
      .style("cursor", "pointer")
      .on("mouseenter", function (ev, d) {
        const t = getTip();
        t.innerHTML = htmlFn(d);
        t.style.opacity = "1";
        d3.select(this).style("filter", "brightness(1.06)");
      })
      .on("mousemove", function (ev) {
        const t = getTip();
        const x = Math.min(ev.clientX + 14, window.innerWidth - t.offsetWidth - 14);
        const y = Math.max(12, ev.clientY - t.offsetHeight - 14);
        t.style.left = x + "px";
        t.style.top = y + "px";
      })
      .on("mouseleave", function () {
        getTip().style.opacity = "0";
        d3.select(this).style("filter", null);
      });
  }

  function svgIn(el, W, H) {
    d3.select(el).selectAll("*").remove();
    return d3.select(el).append("svg").attr("viewBox", `0 0 ${W} ${H}`).attr("width", "100%");
  }

  function barPath(x, y, w, h, r) {
    if (h <= 0 || w <= 0) return `M${x},${y}Z`;
    const rr = Math.min(r, w / 2, h / 2);
    return `M${x},${y + h}V${y + rr}Q${x},${y} ${x + rr},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h}Z`;
  }

  function hbarPath(x, y, w, h, r) {
    if (w <= 0 || h <= 0) return `M${x},${y}Z`;
    const rr = Math.min(r, w / 2, h / 2);
    return `M${x},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h - rr}Q${x + w},${y + h} ${x + w - rr},${y + h}H${x}Z`;
  }

  function gridX(g, x, h, ticks, fmt) {
    const ax = g.append("g").attr("transform", `translate(0,${h})`).call(d3.axisBottom(x).ticks(ticks).tickFormat(fmt).tickSize(-h).tickPadding(9));
    ax.select(".domain").remove();
    ax.selectAll(".tick line").attr("stroke", PAL.line).attr("stroke-width", 1);
    ax.selectAll("text").attr("fill", PAL.muted).attr("font-size", 11.5);
  }

  function gridY(g, y, w, ticks, fmt) {
    const ax = g.append("g").call(d3.axisLeft(y).ticks(ticks).tickFormat(fmt).tickSize(-w).tickPadding(8));
    ax.select(".domain").remove();
    ax.selectAll(".tick line").attr("stroke", PAL.line).attr("stroke-width", 1);
    ax.selectAll("text").attr("fill", PAL.muted).attr("font-size", 11.5);
  }

  function growH(sel, x, y, valFn, delayFn) {
    sel
      .attr("d", (d) => hbarPath(0, y(d.k), 0, y.bandwidth(), 4))
      .transition()
      .delay(delayFn || ((d, i) => T(80 + i * 75)))
      .duration(T(680))
      .ease(EASE)
      .attrTween("d", (d) => (t) => hbarPath(0, y(d.k), x(valFn(d) * t), y.bandwidth(), 4));
  }

  function fadeIn(sel, delayFn) {
    sel
      .style("opacity", 0)
      .transition()
      .delay(delayFn || T(450))
      .duration(T(320))
      .style("opacity", 1);
  }

  const charts = {};

  /* ---------- 1. Causal Disentanglement Bars ---------- */
  charts.causal = function (el) {
    const W = 540,
      H = 328,
      m = { l: 42, r: 12, t: 84, b: 40 };
    const rows = [
      { k: "Solo\nSkill", v: 98.0, col: PAL.good },
      { k: "Direct\nChain", v: 14.2, col: PAL.fail },
      { k: "Home\n(Body)", v: 82.8, col: PAL.body },
      { k: "View\nReset", v: 84.5, col: PAL.view },
      { k: "World\nReset", v: 92.8, col: PAL.world },
    ];
    const svg = svgIn(el, W, H);
    const g = svg.append("g").attr("transform", `translate(${m.l},${m.t})`);
    const w = W - m.l - m.r,
      h = H - m.t - m.b;
    const x = d3
      .scaleBand()
      .domain(rows.map((d) => d.k))
      .range([0, w])
      .padding(0.28);
    const y = d3.scaleLinear().domain([0, 105]).range([h, 0]);
    gridY(g, y, w, 5, (d) => d + "%");

    const bars = g
      .selectAll(".b")
      .data(rows)
      .enter()
      .append("path")
      .attr("fill", (d) => d.col);
    bars
      .attr("d", (d) => barPath(x(d.k), h, x.bandwidth(), 0, 4))
      .transition()
      .delay((d, i) => T(90 + i * 90))
      .duration(T(680))
      .ease(EASE)
      .attrTween("d", (d) => (t) => barPath(x(d.k), y(d.v * t), x.bandwidth(), h - y(d.v * t), 4));

    const vals = g
      .selectAll(".v")
      .data(rows)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.k) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.v) - 7)
      .attr("text-anchor", "middle")
      .attr("fill", PAL.ink)
      .attr("font-size", 14.5)
      .attr("font-weight", 700)
      .text((d) => d.v.toFixed(1) + "%");
    fadeIn(vals, T(500));

    rows.forEach((r) => {
      r.k.split("\n").forEach((line, li) => {
        g.append("text")
          .attr("x", x(r.k) + x.bandwidth() / 2)
          .attr("y", h + 18 + li * 14)
          .attr("text-anchor", "middle")
          .attr("fill", li === 0 ? PAL.ink : PAL.muted)
          .attr("font-size", li === 0 ? 12.2 : 11)
          .attr("font-weight", li === 0 ? 600 : 400)
          .text(line);
      });
    });

    const addBr = (a, b, txt, col, topY) => {
      const ra = rows[a],
        rb = rows[b];
      const x1 = x(ra.k) + x.bandwidth() / 2,
        x2 = x(rb.k) + x.bandwidth() / 2;
      const yA = y(ra.v) - 24,
        yB = y(rb.v) - 24;
      const gg = g.append("g");
      gg.append("path").attr("d", `M${x1},${yA}V${topY}H${x2}V${yB}`).attr("fill", "none").attr("stroke", col).attr("stroke-width", 1.5);
      gg.append("text")
        .attr("x", (x1 + x2) / 2)
        .attr("y", topY - 5)
        .attr("text-anchor", "middle")
        .attr("fill", col)
        .attr("font-size", 11.8)
        .attr("font-weight", 700)
        .text(txt);
      fadeIn(gg, T(650));
    };
    addBr(1, 2, "Body +68.6", PAL.body, -14);
    addBr(2, 3, "View +1.7 (n.s.)", PAL.view, -40);
    addBr(2, 4, "World +10.0", PAL.world, -66);

    hover(
      bars,
      (d) =>
        `<b>${d.k.replace("\n", " ")}</b>: <b>${d.v.toFixed(1)}%</b><br><span class="tip-m">LIBERO-Goal · Frozen π₀.₅ · 64 ordered pairs × 10 matched handoff states (640 states)</span>`
    );
  };

  /* ---------- 2. Policy Specificity: Sorted 9-Skill Impact Chart ---------- */
  charts.drawer_split = function (el) {
    const W = 560,
      H = 342,
      m = { l: 140, r: 86, t: 32, b: 30 };
    const rows = [
      { k: "Push plate to stove", home: 0, world: 10, grp: "bad", star: true },
      { k: "Bowl in top drawer", home: 0, world: 10, grp: "bad" },
      { k: "Bowl on cabinet", home: 1, world: 9, grp: "bad" },
      { k: "Bowl on plate", home: 3, world: 10, grp: "bad" },
      { k: "Cheese in bowl", home: 4, world: 10, grp: "bad" },
      { k: "Bottle on cabinet", home: 7, world: 10, grp: "mid" },
      { k: "Bowl on stove", home: 9, world: 10, grp: "ok" },
      { k: "Bottle on rack", home: 9, world: 10, grp: "ok" },
      { k: "Turn on stove", home: 10, world: 10, grp: "ok", star: true },
    ];
    const colOf = (d) => (d.grp === "bad" ? PAL.world : d.grp === "mid" ? PAL.warn : PAL.good);
    const svg = svgIn(el, W, H);
    const g = svg.append("g").attr("transform", `translate(${m.l},${m.t})`);
    const w = W - m.l - m.r,
      h = H - m.t - m.b;
    const x = d3.scaleLinear().domain([0, 10]).range([0, w]);
    const y = d3
      .scaleBand()
      .domain(rows.map((d) => d.k))
      .range([0, h])
      .padding(0.26);

    const lg = svg.append("g").attr("transform", `translate(${m.l},12)`);
    lg.append("rect").attr("x", 0).attr("y", -5).attr("width", 12).attr("height", 9).attr("rx", 2).attr("fill", PAL.world);
    lg.append("text").attr("x", 16).attr("y", 0).attr("dy", "0.35em").attr("fill", PAL.ink2).attr("font-size", 11.2).text("Drawer open (solid)");
    lg.append("rect")
      .attr("x", 136)
      .attr("y", -5)
      .attr("width", 12)
      .attr("height", 9)
      .attr("rx", 2)
      .attr("fill", PAL.paper2)
      .attr("stroke", PAL.ink2)
      .attr("stroke-dasharray", "3 2");
    lg.append("text").attr("x", 152).attr("y", 0).attr("dy", "0.35em").attr("fill", PAL.ink2).attr("font-size", 11.2).text("Drawer closed (9–10/10)");

    gridX(g, x, h, 5, (d) => d * 10 + "%");

    [4, 5].forEach((idx) => {
      const yy = y(rows[idx].k) + y.bandwidth() + (y.step() - y.bandwidth()) / 2;
      g.append("line")
        .attr("x1", -m.l + 8)
        .attr("x2", w + 76)
        .attr("y1", yy)
        .attr("y2", yy)
        .attr("stroke", PAL.line2)
        .attr("stroke-dasharray", "4 4");
    });

    g.selectAll(".gw")
      .data(rows)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d) => y(d.k))
      .attr("height", y.bandwidth())
      .attr("width", (d) => x(d.world))
      .attr("rx", 3.5)
      .attr("fill", (d) => (d.grp === "ok" ? "none" : PAL.paper2))
      .attr("stroke", (d) => (d.grp === "ok" ? "none" : PAL.line2))
      .attr("stroke-dasharray", "4 3");

    const bars = g
      .selectAll(".b")
      .data(rows)
      .enter()
      .append("path")
      .attr("fill", (d) => colOf(d));
    bars
      .attr("d", (d) => hbarPath(0, y(d.k), 0, y.bandwidth(), 3.5))
      .transition()
      .delay((d, i) => T(60 + i * 50))
      .duration(T(620))
      .ease(EASE)
      .attrTween("d", (d) => (t) => hbarPath(0, y(d.k), Math.max(x(d.home) * t, d.home === 0 ? 4 * t : 0), y.bandwidth(), 3.5));

    g.selectAll(".lbl")
      .data(rows)
      .enter()
      .append("text")
      .attr("x", -10)
      .attr("y", (d) => y(d.k) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("fill", (d) => (d.star ? colOf(d) : PAL.ink))
      .attr("font-weight", (d) => (d.star ? 700 : 400))
      .attr("font-size", 12)
      .text((d) => d.k);

    const vt = g
      .selectAll(".v")
      .data(rows)
      .enter()
      .append("text")
      .attr("x", (d) => (d.home >= 8 ? x(d.home) - 7 : Math.max(x(d.home) + 8, 12)))
      .attr("y", (d) => y(d.k) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d.home >= 8 ? "end" : "start"))
      .attr("fill", (d) => (d.home >= 8 ? "#fff" : colOf(d)))
      .attr("font-weight", 700)
      .attr("font-size", 11.5)
      .text((d) => (d.grp === "ok" ? `${d.home}/10` : `${d.home}/10 → ${d.world}/10`));
    fadeIn(vt, T(480));

    [
      { a: 0, b: 4, txt: "5 Broken", sub: "0–4/10", col: PAL.world },
      { a: 5, b: 5, txt: "1 Mild", sub: "7/10", col: PAL.warn },
      { a: 6, b: 8, txt: "3 Spared", sub: "9–10/10", col: PAL.good },
    ].forEach((br) => {
      const y1 = y(rows[br.a].k) + 2,
        y2 = y(rows[br.b].k) + y.bandwidth() - 2,
        ym = (y1 + y2) / 2,
        bx = w + 10;
      if (br.a !== br.b) {
        g.append("path")
          .attr("d", `M${bx},${y1}H${bx + 6}V${y2}H${bx}`)
          .attr("fill", "none")
          .attr("stroke", br.col)
          .attr("stroke-width", 1.6);
      } else {
        g.append("line")
          .attr("x1", bx)
          .attr("x2", bx + 6)
          .attr("y1", ym)
          .attr("y2", ym)
          .attr("stroke", br.col)
          .attr("stroke-width", 1.6);
      }
      g.append("text")
        .attr("x", bx + 11)
        .attr("y", ym - 4)
        .attr("dy", "0.35em")
        .attr("fill", br.col)
        .attr("font-weight", 700)
        .attr("font-size", 12)
        .text(br.txt);
      g.append("text")
        .attr("x", bx + 11)
        .attr("y", ym + 10)
        .attr("dy", "0.35em")
        .attr("fill", PAL.muted)
        .attr("font-size", 10.5)
        .text(br.sub);
    });

    const hits = g
      .selectAll(".hit")
      .data(rows)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d) => y(d.k))
      .attr("width", w)
      .attr("height", y.bandwidth())
      .attr("fill", "transparent");
    hover(
      hits,
      (d) => `<b>Open middle drawer → ${d.k}</b><br>Drawer open (re-homed): <b>${d.home}/10</b><br>Drawer closed (World Reset): <b>${d.world}/10</b>`
    );
  };

  /* ---------- 3. RQ1: Zero-Shot Detection & Cross-Category Generalization ---------- */
  charts.rq1_full = function (el) {
    const W = 720,
      H = 344,
      m = { l: 215, r: 64, t: 54, b: 42 };
    const rows = [
      {
        k: "Collision Detection (Sim)",
        sub: "Direct 3D overlap · 0 training samples",
        v: 0.946,
        col: PAL.body,
        tip: "<b>0-Parameter 3D Overlap (Sim State)</b><br>AUROC 0.946 [0.919, 0.972] · zero failure training",
      },
      {
        k: "Collision Detection (RGB-D)",
        sub: "Single-view depth · 140/140 exact",
        v: 0.944,
        col: PAL.good,
        tip: "<b>0-Parameter 3D Overlap (Single-View RGB-D)</b><br>AUROC 0.944 [0.915, 0.970] · 426 ms median, detector-free",
      },
      {
        k: "Unseen Predecessor Split",
        sub: "Leave-one-predecessor-out (640 states)",
        v: 0.864,
        base: 0.605,
        col: PAL.world,
        tip: "<b>5-Param Readiness · LOPO Split</b><br>Ours 0.864 vs Lookup baseline 0.605 (+0.259); removing 3D geometry drops to 0.499",
      },
      {
        k: "Single → Multi-Obstacle",
        sub: "Fit on 1 residue, test on multiple",
        v: 0.971,
        base: 0.79,
        col: PAL.world,
        tip: "<b>Single-Residue → Multi-Residue</b><br>Ours 0.971 vs Lookup baseline 0.790 (+0.181)",
      },
      {
        k: "Zero-Drawer → Drawer",
        sub: "Fit on tabletop items only, test drawers",
        v: 0.912,
        base: 0.681,
        col: PAL.world,
        tip: "<b>Cross-Category Zero-Drawer Transfer</b><br>Zero drawer examples in training; reaches 0.912 vs Lookup 0.681 (+0.231)",
      },
    ];
    const svg = svgIn(el, W, H);
    const g = svg.append("g").attr("transform", `translate(${m.l},${m.t})`);
    const w = W - m.l - m.r,
      h = H - m.t - m.b;
    const x = d3.scaleLinear().domain([0.45, 1.0]).range([0, w]);
    const y = d3
      .scaleBand()
      .domain(rows.map((d) => d.k))
      .range([0, h])
      .padding(0.3);
    const bh = y.bandwidth();
    gridX(g, x, h, 5, d3.format(".1f"));

    g.append("line")
      .attr("x1", x(0.5))
      .attr("x2", x(0.5))
      .attr("y1", -8)
      .attr("y2", h)
      .attr("stroke", PAL.crit)
      .attr("stroke-width", 1.2)
      .attr("stroke-dasharray", "3 3");
    g.append("text")
      .attr("x", x(0.5) + 4)
      .attr("y", -10)
      .attr("fill", PAL.crit)
      .attr("font-size", 11.2)
      .text("0.50 = Chance (No-Geometry ablation: 0.499)");

    const yDiv = (y(rows[1].k) + bh + y(rows[2].k)) / 2;
    g.append("line")
      .attr("x1", -m.l + 8)
      .attr("x2", w + 46)
      .attr("y1", yDiv)
      .attr("y2", yDiv)
      .attr("stroke", PAL.line2)
      .attr("stroke-dasharray", "4 4");

    const lg = svg.append("g").attr("transform", `translate(${m.l},14)`);
    [
      [PAL.body, "0-Param · Sim", 0],
      [PAL.good, "0-Param · RGB-D", 114],
      [PAL.world, "5-Param Readiness", 244],
    ].forEach(([col, t, lx]) => {
      lg.append("rect").attr("x", lx).attr("y", -5).attr("width", 12).attr("height", 10).attr("rx", 2.5).attr("fill", col);
      lg.append("text")
        .attr("x", lx + 16)
        .attr("y", 0)
        .attr("dy", "0.35em")
        .attr("fill", PAL.ink2)
        .attr("font-size", 11.8)
        .text(t);
    });
    lg.append("circle").attr("cx", 392).attr("cy", 0).attr("r", 5).attr("fill", PAL.neutral);
    lg.append("text").attr("x", 402).attr("y", 0).attr("dy", "0.35em").attr("fill", PAL.ink2).attr("font-size", 11.8).text("Lookup");

    const lab = g
      .selectAll(".l")
      .data(rows)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(-12,${y(d.k) + bh / 2})`);
    lab
      .append("text")
      .attr("y", -4)
      .attr("text-anchor", "end")
      .attr("fill", PAL.ink)
      .attr("font-size", 13.2)
      .attr("font-weight", 600)
      .text((d) => d.k);
    lab
      .append("text")
      .attr("y", 11)
      .attr("text-anchor", "end")
      .attr("fill", PAL.muted)
      .attr("font-size", 10.6)
      .text((d) => d.sub);

    const rg = g
      .selectAll(".r")
      .data(rows)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(0,${y(d.k)})`);
    rg.append("rect")
      .attr("x", -m.l)
      .attr("y", -6)
      .attr("width", m.l + w + m.r)
      .attr("height", bh + 12)
      .attr("fill", "transparent");
    const b = rg.append("path").attr("fill", (d) => d.col);
    b.attr("d", hbarPath(0, 0, 0, bh, 4))
      .transition()
      .delay((d, i) => T(100 + i * 95))
      .duration(T(680))
      .ease(EASE)
      .attrTween("d", (d) => (t) => hbarPath(0, 0, x(0.45 + (d.v - 0.45) * t), bh, 4));

    const dots = rg.filter((d) => d.base != null).append("g");
    dots
      .append("circle")
      .attr("cx", (d) => x(d.base))
      .attr("cy", bh / 2)
      .attr("r", 6)
      .attr("fill", PAL.neutral)
      .attr("stroke", PAL.paper)
      .attr("stroke-width", 2);
    dots
      .append("text")
      .attr("x", (d) => x(d.base) - 10)
      .attr("y", bh / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("fill", "#fff")
      .attr("font-size", 11.2)
      .attr("font-weight", 600)
      .text((d) => d.base.toFixed(2));
    fadeIn(dots, T(680));

    const vals = rg
      .append("text")
      .attr("x", (d) => x(d.v) + 8)
      .attr("y", bh / 2)
      .attr("dy", "0.35em")
      .attr("fill", PAL.ink)
      .attr("font-size", 15)
      .attr("font-weight", 700)
      .text((d) => d.v.toFixed(3));
    fadeIn(vals, T(480));
    g.append("text")
      .attr("x", w / 2)
      .attr("y", h + 34)
      .attr("text-anchor", "middle")
      .attr("fill", PAL.muted)
      .attr("font-size", 11.8)
      .text("AUROC (higher is better)");
    hover(rg, (d) => d.tip);
  };

  /* ---------- 4. RQ2a Left: Frontier VLMs vs 3D Skill Envelope ---------- */
  charts.rq2_vlm = function (el) {
    const W = 540,
      H = 330,
      m = { l: 44, r: 54, t: 48, b: 50 };
    const groups = [
      {
        g: "Global Readiness\nWill skill succeed?",
        vals: [
          { k: "Skill Envelope", v: 0.902, col: PAL.good },
          { k: "Qwen4-Max", v: 0.793, col: PAL.view },
          { k: "Qwen3.8-27B", v: 0.724, col: PAL.neutral },
          { k: "GLM-5.3-Flash", v: 0.715, col: PAL.line2 },
        ],
      },
      {
        g: "Same-Scene Ranking\nWhich skill hits?",
        vals: [
          { k: "Skill Envelope", v: 0.834, col: PAL.good },
          { k: "Qwen4-Max", v: 0.666, col: PAL.view },
          { k: "GLM-5.3-Flash", v: 0.5, col: PAL.line2 },
        ],
      },
      {
        g: "Collision Alert\nContact prediction",
        vals: [
          { k: "Skill Envelope", v: 0.961, col: PAL.good },
          { k: "Qwen4-Max", v: 0.866, col: PAL.view },
        ],
      },
    ];
    const svg = svgIn(el, W, H);
    const g = svg.append("g").attr("transform", `translate(${m.l},${m.t})`);
    const w = W - m.l - m.r,
      h = H - m.t - m.b;
    const x0 = d3
      .scaleBand()
      .domain(groups.map((d) => d.g))
      .range([0, w])
      .padding(0.22);
    const y = d3.scaleLinear().domain([0.4, 1.02]).range([h, 0]);
    gridY(g, y, w, 6, d3.format(".1f"));

    g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(0.5)).attr("y2", y(0.5)).attr("stroke", PAL.crit).attr("stroke-dasharray", "3 3");
    g.append("text")
      .attr("x", w + 5)
      .attr("y", y(0.5))
      .attr("dy", "0.35em")
      .attr("fill", PAL.crit)
      .attr("font-size", 10.8)
      .text("0.50 rand");

    const leg = [
      ["Skill Envelope", PAL.good],
      ["Qwen4-Max", PAL.view],
      ["Qwen3.8-27B", PAL.neutral],
      ["GLM-5.3-Flash", PAL.line2],
    ];
    const lg = svg.append("g").attr("transform", `translate(${m.l},16)`);
    leg.forEach(([t, col], i) => {
      lg.append("rect")
        .attr("x", i * 120)
        .attr("y", -5)
        .attr("width", 11)
        .attr("height", 10)
        .attr("rx", 2.5)
        .attr("fill", col);
      lg.append("text")
        .attr("x", i * 120 + 15)
        .attr("y", 0)
        .attr("dy", "0.35em")
        .attr("fill", PAL.ink2)
        .attr("font-size", 11.5)
        .text(t);
    });

    groups.forEach((grp, gi) => {
      const x1 = d3
        .scaleBand()
        .domain(grp.vals.map((d) => d.k))
        .range([0, x0.bandwidth()])
        .padding(0.16);
      const gg = g.append("g").attr("transform", `translate(${x0(grp.g)},0)`);
      const b = gg
        .selectAll("path")
        .data(grp.vals)
        .enter()
        .append("path")
        .attr("fill", (d) => d.col);
      b.attr("d", (d) => barPath(x1(d.k), h, x1.bandwidth(), 0, 4))
        .transition()
        .delay((d, i) => T(100 + gi * 130 + i * 60))
        .duration(T(680))
        .ease(EASE)
        .attrTween("d", (d) => (t) => barPath(x1(d.k), y(0.4 + (d.v - 0.4) * t), x1.bandwidth(), h - y(0.4 + (d.v - 0.4) * t), 4));

      const vt = gg
        .selectAll("text")
        .data(grp.vals)
        .enter()
        .append("text")
        .attr("x", (d) => x1(d.k) + x1.bandwidth() / 2)
        .attr("y", (d) => y(d.v) - 6)
        .attr("text-anchor", "middle")
        .attr("fill", (d) => (d.col === PAL.good ? PAL.good : PAL.ink2))
        .attr("font-size", 11.4)
        .attr("font-weight", (d) => (d.col === PAL.good ? 700 : 400))
        .text((d) => d.v.toFixed(2));
      fadeIn(vt, T(620 + gi * 120));
      hover(
        b,
        (d) =>
          `<b>${grp.g.replace("\n", " · ")}</b><br>${d.k}: AUROC = <b>${d.v.toFixed(3)}</b><br><span class="tip-m">429 matched test handoffs across 3 VLM backends × 3 prompt styles</span>`
      );

      grp.g.split("\n").forEach((line, li) => {
        g.append("text")
          .attr("x", x0(grp.g) + x0.bandwidth() / 2)
          .attr("y", h + 19 + li * 15)
          .attr("text-anchor", "middle")
          .attr("fill", li === 0 ? PAL.ink : PAL.muted)
          .attr("font-weight", li === 0 ? 600 : 400)
          .attr("font-size", li === 0 ? 12 : 10.8)
          .text(line);
      });
    });
  };

  /* ---------- 5. RQ2a Right: 9-Successor Diagnostic Matrix ---------- */
  charts.rq2_matrix = function (el) {
    const W = 540,
      H = 330,
      m = { l: 108, r: 12, t: 34, b: 78 };
    const rows = [
      { k: "Top drawer", home: 0, ov: 74.5, hit: 10, qwen: 7 },
      { k: "Push plate", home: 0, ov: 417.5, hit: 10, qwen: 7 },
      { k: "Bowl cabinet", home: 1, ov: 167.1, hit: 10, qwen: 7 },
      { k: "Bowl on plate", home: 3, ov: 499.0, hit: 10, qwen: 7 },
      { k: "Cheese bowl", home: 4, ov: 199.0, hit: 10, qwen: 7 },
      { k: "Bowl stove", home: 9, ov: 121.6, hit: 10, qwen: 7 },
      { k: "Bottle cab.", home: 7, ov: 5.7, hit: 0, qwen: 7 },
      { k: "Bottle rack", home: 9, ov: 5.1, hit: 1, qwen: 7 },
      { k: "Turn on stove", home: 10, ov: 0.0, hit: 0, qwen: 6 },
    ];
    const svg = svgIn(el, W, H);
    const g = svg.append("g").attr("transform", `translate(${m.l},${m.t})`);
    const w = W - m.l - m.r;
    const x = d3
      .scaleBand()
      .domain(rows.map((d) => d.k))
      .range([0, w])
      .padding(0.18);
    const bw = x.bandwidth();

    const xSplit = (x(rows[5].k) + bw + x(rows[6].k)) / 2;
    g.append("line").attr("x1", xSplit).attr("x2", xSplit).attr("y1", -16).attr("y2", 214).attr("stroke", PAL.line2).attr("stroke-dasharray", "4 3");
    g.append("text")
      .attr("x", xSplit / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("fill", PAL.world)
      .attr("font-size", 12)
      .attr("font-weight", 700)
      .text("Physically collides (10/10)");
    g.append("text")
      .attr("x", (xSplit + w) / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("fill", PAL.good)
      .attr("font-size", 12)
      .attr("font-weight", 700)
      .text("Clear (0–1/10)");

    const yS = d3.scaleLinear().domain([0, 10]).range([72, 10]);
    g.append("text")
      .attr("x", -10)
      .attr("y", 40)
      .attr("text-anchor", "end")
      .attr("fill", PAL.ink)
      .attr("font-size", 12)
      .attr("font-weight", 600)
      .text("Re-homed");
    g.append("text").attr("x", -10).attr("y", 55).attr("text-anchor", "end").attr("fill", PAL.muted).attr("font-size", 10.5).text("success (/10)");
    const b1 = g
      .selectAll(".bs")
      .data(rows)
      .enter()
      .append("path")
      .attr("fill", (d) => (d.home <= 4 ? PAL.world : PAL.good))
      .attr("d", (d) => barPath(x(d.k), yS(Math.max(d.home, 0.4)), bw, 72 - yS(Math.max(d.home, 0.4)), 3));
    g.selectAll(".ts")
      .data(rows)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.k) + bw / 2)
      .attr("y", (d) => yS(Math.max(d.home, 0.4)) - 4)
      .attr("text-anchor", "middle")
      .attr("fill", PAL.ink2)
      .attr("font-size", 11)
      .text((d) => d.home);

    const yO = d3.scaleSqrt().domain([0, 520]).range([150, 90]);
    g.append("text")
      .attr("x", -10)
      .attr("y", 118)
      .attr("text-anchor", "end")
      .attr("fill", PAL.ink)
      .attr("font-size", 12)
      .attr("font-weight", 600)
      .text("3D Overlap");
    g.append("text").attr("x", -10).attr("y", 133).attr("text-anchor", "end").attr("fill", PAL.muted).attr("font-size", 10.5).text("(cm³ · Ours)");
    const b2 = g
      .selectAll(".bo")
      .data(rows)
      .enter()
      .append("path")
      .attr("fill", (d) => (d.ov >= 50 ? PAL.world : PAL.good))
      .attr("d", (d) => barPath(x(d.k), yO(Math.max(d.ov, 4)), bw, 150 - yO(Math.max(d.ov, 4)), 3));
    g.selectAll(".to")
      .data(rows)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.k) + bw / 2)
      .attr("y", (d) => yO(Math.max(d.ov, 4)) - 4)
      .attr("text-anchor", "middle")
      .attr("fill", PAL.ink2)
      .attr("font-size", 10.5)
      .text((d) => (d.ov >= 10 ? Math.round(d.ov) : d.ov.toFixed(0)));

    g.append("text")
      .attr("x", -10)
      .attr("y", 188)
      .attr("text-anchor", "end")
      .attr("fill", PAL.view)
      .attr("font-size", 12)
      .attr("font-weight", 600)
      .text("Qwen4-Max");
    g.append("text")
      .attr("x", -10)
      .attr("y", 203)
      .attr("text-anchor", "end")
      .attr("fill", PAL.muted)
      .attr("font-size", 10.5)
      .text("flags blocked (/7)");
    const b3 = g
      .selectAll(".bq")
      .data(rows)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.k) + 3)
      .attr("y", 174)
      .attr("width", bw - 6)
      .attr("height", 26)
      .attr("rx", 6)
      .attr("fill", PAL.view)
      .attr("opacity", (d) => (d.qwen === 7 ? 0.88 : 0.65));
    g.selectAll(".tq")
      .data(rows)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.k) + bw / 2)
      .attr("y", 191)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .attr("font-size", 12.5)
      .attr("font-weight", 700)
      .text((d) => d.qwen);

    g.selectAll(".xl")
      .data(rows)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${x(d.k) + bw / 2 + 2}, 216) rotate(-36)`)
      .attr("text-anchor", "end")
      .attr("fill", PAL.ink2)
      .attr("font-size", 11)
      .text((d) => d.k);
    const tipFn = (d) =>
      `<b>Open middle drawer → ${d.k}</b><br>Re-homed: ${d.home}/10 · Physical hits: ${d.hit}/10<br>3D Overlap: <b>${d.ov.toFixed(1)} cm³</b> · Qwen4-Max flags: ${d.qwen}/7`;
    hover(b1, tipFn);
    hover(b2, tipFn);
    hover(b3, tipFn);
  };

  /* ---------- 6. RQ2b: Code Recovery & FREE Clearing ---------- */
  charts.rq2_recovery = function (el) {
    const W = 760,
      H = 340,
      m = { l: 44, r: 10, t: 48, b: 52 };
    const groups = [
      {
        g: "Close Drawer\n(VLA vs Code)",
        bars: [
          { k: "Inverse VLA Prompt", v: 0.4, col: PAL.fail, note: "1/280" },
          { k: "~30-Line Code Primitive", v: 98.6, col: PAL.good, note: "138/140" },
        ],
      },
      {
        g: "All 640 Seams\nTwo-step success",
        bars: [
          { k: "Re-homed only", v: 82.8, col: PAL.neutral },
          { k: "Reactive (after hit)", v: 91.4, col: PAL.body },
          { k: "Ours (proactive code)", v: 92.3, col: PAL.good },
          { k: "Oracle World Reset", v: 92.8, col: PAL.world },
        ],
      },
      {
        g: "Middle Drawer\n(90 fresh seams)",
        bars: [
          { k: "Re-homed only", v: 38.9, col: PAL.neutral },
          { k: "Reactive (after hit)", v: 84.4, col: PAL.body },
          { k: "Ours (proactive code)", v: 95.6, col: PAL.good },
          { k: "Oracle World Reset", v: 93.3, col: PAL.world },
        ],
      },
      {
        g: "Plate Blocking\n(20 · FREE push)",
        bars: [
          { k: "Re-homed only", v: 45.0, col: PAL.neutral },
          { k: "Sham wait control", v: 40.0, col: PAL.fail },
          { k: "FREE safe push", v: 80.0, col: PAL.good },
          { k: "Oracle World Reset", v: 90.0, col: PAL.world },
        ],
      },
      {
        g: "All Tabletop\n(71 · FREE clear)",
        bars: [
          { k: "Re-homed only", v: 80.3, col: PAL.neutral },
          { k: "FREE safe clear", v: 94.4, col: PAL.good },
          { k: "Oracle World Reset", v: 97.2, col: PAL.world },
        ],
      },
    ];
    const svg = svgIn(el, W, H);
    const g = svg.append("g").attr("transform", `translate(${m.l},${m.t})`);
    const w = W - m.l - m.r,
      h = H - m.t - m.b;
    const x0 = d3
      .scaleBand()
      .domain(groups.map((d) => d.g))
      .range([0, w])
      .padding(0.12);
    const y = d3.scaleLinear().domain([0, 110]).range([h, 0]);
    gridY(g, y, w, 5, (d) => d + "%");

    const leg = [
      ["Re-homed only", PAL.neutral, 0],
      ["Inverse VLA / Sham", PAL.fail, 120],
      ["Reactive (after hit)", PAL.body, 266],
      ["Ours (Proactive Code)", PAL.good, 404],
      ["Oracle World Reset", PAL.world, 566],
    ];
    const lg = svg.append("g").attr("transform", `translate(${m.l},16)`);
    leg.forEach(([t, col, lx]) => {
      lg.append("rect").attr("x", lx).attr("y", -5).attr("width", 11).attr("height", 10).attr("rx", 2.5).attr("fill", col);
      lg.append("text")
        .attr("x", lx + 15)
        .attr("y", 0)
        .attr("dy", "0.35em")
        .attr("fill", PAL.ink2)
        .attr("font-size", 11.4)
        .text(t);
    });

    groups.forEach((grp, gi) => {
      const x1 = d3
        .scaleBand()
        .domain(grp.bars.map((d) => d.k))
        .range([0, x0.bandwidth()])
        .padding(0.14);
      const gg = g.append("g").attr("transform", `translate(${x0(grp.g)},0)`);
      const b = gg
        .selectAll("path")
        .data(grp.bars)
        .enter()
        .append("path")
        .attr("fill", (d) => d.col);
      b.attr("d", (d) => barPath(x1(d.k), h, x1.bandwidth(), 0, 3.5))
        .transition()
        .delay((d, i) => T(90 + gi * 70 + i * 40))
        .duration(T(640))
        .ease(EASE)
        .attrTween(
          "d",
          (d) => (t) =>
            barPath(x1(d.k), y(Math.max(d.v * t, d.v > 0 ? 1.2 * t : 0)), x1.bandwidth(), h - y(Math.max(d.v * t, d.v > 0 ? 1.2 * t : 0)), 3.5)
        );

      const vt = gg
        .selectAll("text")
        .data(grp.bars)
        .enter()
        .append("text")
        .attr("x", (d) => x1(d.k) + x1.bandwidth() / 2)
        .attr("y", (d, i) => y(Math.max(d.v, 2)) - (grp.bars.length === 4 && i % 2 === 1 && Math.abs(d.v - grp.bars[i - 1].v) < 8 ? 16 : 6))
        .attr("text-anchor", "middle")
        .attr("fill", (d) => (d.col === PAL.good ? PAL.good : PAL.ink2))
        .attr("font-size", 10.5)
        .attr("font-weight", (d) => (d.col === PAL.good ? 700 : 400))
        .text((d) => (d.v < 10 || d.v === 98.6 ? d.v.toFixed(1) + "%" : Math.round(d.v) + "%"));
      fadeIn(vt, T(540 + gi * 70));
      hover(b, (d) => `<b>${grp.g.replace("\n", " · ")}</b><br>${d.k}: <b>${d.v.toFixed(1)}%</b>${d.note ? " (" + d.note + ")" : ""}`);

      grp.g.split("\n").forEach((line, li) => {
        g.append("text")
          .attr("x", x0(grp.g) + x0.bandwidth() / 2)
          .attr("y", h + 18 + li * 15)
          .attr("text-anchor", "middle")
          .attr("fill", li === 0 ? PAL.ink : PAL.muted)
          .attr("font-weight", li === 0 ? 600 : 400)
          .attr("font-size", li === 0 ? 12 : 10.8)
          .text(line);
      });
    });
  };

  /* ---------- 7. RQ3: Multi-Step Chains & Cross-LLM Convergence ---------- */
  charts.rq3_chains = function (el) {
    const W = 560,
      H = 315,
      m = { l: 194, r: 66, t: 32, b: 34 };
    const rows = [
      { k: "Random order (re-homed)", v: 29.7, col: PAL.world, tip: "Baseline B1: 29.7% on 128 drawer-bearing 3–4 step chains" },
      { k: "Tool-Free LLM (GLM)", v: 82.0, col: PAL.neutral, tip: "GLM-5.3-Flash without 3D tools: 82.0% (27 chain-end redos)" },
      { k: "Tool-Free LLM (Qwen4)", v: 85.9, col: PAL.fail, tip: "Qwen4-Max without 3D tools: 85.9% (75.8% first-pass)" },
      { k: "+ 3D Tools (GLM)", v: 91.4, col: PAL.body, tip: "GLM + CHECK/FREE: 82.0% → 91.4% (p = 0.029, 0 redos)" },
      { k: "+ 3D Tools (Qwen4)", v: 91.4, col: PAL.body, tip: "Qwen4 + CHECK/FREE: converges to exact 91.4% (−26.8% time, −12.3% cost)" },
      {
        k: "Ours · Determ. Plan+Fix",
        v: 93.8,
        col: PAL.good,
        tip: "Deterministic constrained order + 3D recovery: 93.8% (28/32 on two-drawer sets)",
      },
    ];
    const svg = svgIn(el, W, H);
    const g = svg.append("g").attr("transform", `translate(${m.l},${m.t})`);
    const w = W - m.l - m.r,
      h = H - m.t - m.b;
    const x = d3.scaleLinear().domain([0, 100]).range([0, w]);
    const y = d3
      .scaleBand()
      .domain(rows.map((d) => d.k))
      .range([0, h])
      .padding(0.28);
    gridX(g, x, h, 5, (d) => d + "%");

    g.append("line")
      .attr("x1", x(90.6))
      .attr("x2", x(90.6))
      .attr("y1", -10)
      .attr("y2", h)
      .attr("stroke", PAL.world)
      .attr("stroke-width", 1.3)
      .attr("stroke-dasharray", "4 3");
    g.append("text")
      .attr("x", x(90.6))
      .attr("y", -14)
      .attr("text-anchor", "middle")
      .attr("fill", PAL.world)
      .attr("font-size", 11.5)
      .attr("font-weight", 600)
      .text("Oracle World Reset 90.6%");

    g.selectAll(".l")
      .data(rows)
      .enter()
      .append("text")
      .attr("x", -10)
      .attr("y", (d) => y(d.k) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("fill", (d) => (d.col === PAL.good || d.col === PAL.body ? PAL.ink : PAL.ink2))
      .attr("font-weight", (d) => (d.col === PAL.good || d.col === PAL.body ? 600 : 400))
      .attr("font-size", 12.6)
      .text((d) => d.k);

    const b = g
      .selectAll(".b")
      .data(rows)
      .enter()
      .append("path")
      .attr("fill", (d) => d.col);
    growH(b, x, y, (d) => d.v);

    const v = g
      .selectAll(".v")
      .data(rows)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.v) + 7)
      .attr("y", (d) => y(d.k) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("fill", PAL.ink)
      .attr("font-size", 13.5)
      .attr("font-weight", (d) => (d.v >= 91 ? 700 : 400))
      .attr("paint-order", "stroke")
      .attr("stroke", PAL.paper)
      .attr("stroke-width", 4)
      .text((d) => d.v.toFixed(1) + "%");
    fadeIn(v, T(500));
    hover(b, (d) => `<b>${d.k}</b>: ${d.v.toFixed(1)}%<br><span class="tip-m">${d.tip}</span>`);
  };

  /* ---------- 8. RQ4: Live Single-View RGB-D 5.60x Latency Breakdown ---------- */
  charts.rq4_latency = function (el) {
    const W = 560,
      H = 315,
      m = { l: 158, r: 104, t: 54, b: 44 };
    const rows = [
      { k: "Tool-Free Agent", total: 949.9, llm: 482.9, vlm: 395.3, tool: 0.0, robot: 71.7, badge: "1.0× · 15.8 min" },
      { k: "+ RGB-D (LLM / seam)", total: 406.0, llm: 354.2, vlm: 5.5, tool: 1.0, robot: 45.3, badge: "2.34× faster" },
      { k: "+ RGB-D + Gating", total: 169.5, llm: 125.1, vlm: 0.0, tool: 0.9, robot: 43.5, badge: "5.60× · 88/88", hi: true },
    ];
    const segs = [
      { k: "llm", label: "LLM wait", col: PAL.warn },
      { k: "vlm", label: "VLM wait", col: PAL.world },
      { k: "tool", label: "3D Depth (≤1s)", col: PAL.good },
      { k: "robot", label: "Robot exec", col: PAL.body },
    ];
    const svg = svgIn(el, W, H);
    const g = svg.append("g").attr("transform", `translate(${m.l},${m.t})`);
    const w = W - m.l - m.r,
      h = H - m.t - m.b;
    const x = d3.scaleLinear().domain([0, 1020]).range([0, w]);
    const y = d3
      .scaleBand()
      .domain(rows.map((d) => d.k))
      .range([0, h])
      .padding(0.36);
    gridX(g, x, h, 4, (d) => d + "s");

    const legX = [0, 82, 166, 286];
    const lg = svg.append("g").attr("transform", `translate(${m.l - 12},16)`);
    segs.forEach((s, i) => {
      lg.append("rect").attr("x", legX[i]).attr("y", -5).attr("width", 11).attr("height", 10).attr("rx", 2.5).attr("fill", s.col);
      lg.append("text")
        .attr("x", legX[i] + 15)
        .attr("y", 0)
        .attr("dy", "0.35em")
        .attr("fill", PAL.ink2)
        .attr("font-size", 11.2)
        .text(s.label);
    });

    g.selectAll(".l")
      .data(rows)
      .enter()
      .append("text")
      .attr("x", -10)
      .attr("y", (d) => y(d.k) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("fill", (d) => (d.hi ? PAL.good : PAL.ink))
      .attr("font-weight", (d) => (d.hi ? 700 : 500))
      .attr("font-size", 12.6)
      .text((d) => d.k);

    rows.forEach((r, ri) => {
      let cur = 0;
      const rg = g.append("g").attr("transform", `translate(0,${y(r.k)})`);
      segs.forEach((s) => {
        const val = r[s.k];
        if (val <= 0.01) return;
        const x0 = x(cur),
          ww = Math.max(x(cur + val) - x0, s.k === "tool" ? 4 : 1);
        const rect = rg.append("rect").attr("x", x0).attr("y", 0).attr("height", y.bandwidth()).attr("fill", s.col).attr("width", 0);
        rect
          .transition()
          .delay(T(100 + ri * 120))
          .duration(T(640))
          .ease(EASE)
          .attr("width", ww);
        hover(
          rect,
          () =>
            `<b>${r.k} · ${s.label}</b><br>Wall-clock: <b>${val.toFixed(1)} s</b> (${((val / r.total) * 100).toFixed(1)}%)<br><span class="tip-m">Matched all-succeeding chains (n = 88)</span>`
        );
        cur += val;
      });
      rg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", x(r.total))
        .attr("height", y.bandwidth())
        .attr("rx", 3)
        .attr("fill", "none")
        .attr("stroke", PAL.ink2)
        .attr("stroke-width", 0.6)
        .attr("pointer-events", "none");
      const txt = rg.append("g");
      txt
        .append("text")
        .attr("x", x(r.total) + 8)
        .attr("y", y.bandwidth() / 2 - 5)
        .attr("dy", "0.35em")
        .attr("fill", r.hi ? PAL.good : PAL.ink)
        .attr("font-size", 15)
        .attr("font-weight", 700)
        .text(`${Math.round(r.total)} s`);
      txt
        .append("text")
        .attr("x", x(r.total) + 8)
        .attr("y", y.bandwidth() / 2 + 11)
        .attr("dy", "0.35em")
        .attr("fill", r.hi ? PAL.good : PAL.muted)
        .attr("font-size", 11.2)
        .attr("font-weight", r.hi ? 600 : 400)
        .text(r.badge);
      fadeIn(txt, T(480 + ri * 120));
    });
    g.append("text")
      .attr("x", w / 2)
      .attr("y", h + 36)
      .attr("text-anchor", "middle")
      .attr("fill", PAL.muted)
      .attr("font-size", 11.4)
      .text("Mean wall-clock seconds per 3–4 step chain (matched n = 88)");
  };

  /* ---------- 9. RQ5: Cross-Benchmark BOSS-44 (BC-ViT-T) ---------- */
  charts.rq5_boss = function (el) {
    const W = 460,
      H = 290,
      m = { l: 48, r: 22, t: 44, b: 50 };
    const rows = [
      { k: "Tool-Free Agent", sub: "BC-ViT-T baseline", v: 25.7, frac: "9 / 35", col: PAL.neutral },
      { k: "Ours (+ 3D Envelopes)", sub: "CHECK + FREE + Code", v: 60.0, frac: "21 / 35", col: PAL.good },
    ];
    const svg = svgIn(el, W, H);
    const g = svg.append("g").attr("transform", `translate(${m.l},${m.t})`);
    const w = W - m.l - m.r,
      h = H - m.t - m.b;
    const x = d3
      .scaleBand()
      .domain(rows.map((d) => d.k))
      .range([0, w])
      .padding(0.42);
    const y = d3.scaleLinear().domain([0, 82]).range([h, 0]);
    gridY(g, y, w, 4, (d) => d + "%");

    const b = g
      .selectAll("path")
      .data(rows)
      .enter()
      .append("path")
      .attr("fill", (d) => d.col);
    b.attr("d", (d) => barPath(x(d.k), h, x.bandwidth(), 0, 5))
      .transition()
      .delay((d, i) => T(100 + i * 160))
      .duration(T(720))
      .ease(EASE)
      .attrTween("d", (d) => (t) => barPath(x(d.k), y(d.v * t), x.bandwidth(), h - y(d.v * t), 5));

    const vt = g.selectAll(".vt").data(rows).enter().append("g");
    vt.append("text")
      .attr("x", (d) => x(d.k) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.v) - 22)
      .attr("text-anchor", "middle")
      .attr("fill", (d) => (d.col === PAL.good ? PAL.good : PAL.ink))
      .attr("font-size", 21)
      .attr("font-weight", 700)
      .text((d) => d.v.toFixed(1) + "%");
    vt.append("text")
      .attr("x", (d) => x(d.k) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.v) - 6)
      .attr("text-anchor", "middle")
      .attr("fill", PAL.muted)
      .attr("font-size", 11.5)
      .text((d) => `(${d.frac})`);
    fadeIn(vt, T(560));

    const x1 = x(rows[0].k) + x.bandwidth() / 2,
      x2 = x(rows[1].k) + x.bandwidth() / 2;
    const br = g.append("g");
    br.append("path")
      .attr("d", `M${x1},${y(25.7) - 42}V${y(78)}H${x2}V${y(60.0) - 42}`)
      .attr("fill", "none")
      .attr("stroke", PAL.world)
      .attr("stroke-width", 1.6)
      .attr("stroke-dasharray", "4 3");
    br.append("text")
      .attr("x", (x1 + x2) / 2)
      .attr("y", y(78) - 8)
      .attr("text-anchor", "middle")
      .attr("fill", PAL.world)
      .attr("font-size", 13.5)
      .attr("font-weight", 700)
      .text("+34.3 pts (p = 0.0075)");
    fadeIn(br, T(720));

    rows.forEach((r) => {
      g.append("text")
        .attr("x", x(r.k) + x.bandwidth() / 2)
        .attr("y", h + 18)
        .attr("text-anchor", "middle")
        .attr("fill", PAL.ink)
        .attr("font-size", 13)
        .attr("font-weight", 600)
        .text(r.k);
      g.append("text")
        .attr("x", x(r.k) + x.bandwidth() / 2)
        .attr("y", h + 34)
        .attr("text-anchor", "middle")
        .attr("fill", PAL.muted)
        .attr("font-size", 11)
        .text(r.sub);
    });
    hover(
      b,
      (d) =>
        `<b>${d.k}</b>: ${d.v.toFixed(1)}% (${d.frac})<br><span class="tip-m">BOSS-44 · Non-VLA BC-ViT-T policy · 35 held-out chains including hinged microwave door</span>`
    );
  };

  /* Render all charts cleanly once scrolled into viewport (or immediately if visible) */
  function renderChart(el) {
    if (el.dataset.rendered) return;
    const fn = charts[el.dataset.chart];
    if (!fn) return;
    el.dataset.rendered = "1";
    fn(el);
  }

  window.PageCharts = {
    init: function () {
      const nodes = Array.from(document.querySelectorAll("[data-chart]"));
      if (!("IntersectionObserver" in window)) {
        nodes.forEach(renderChart);
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              renderChart(e.target);
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "140px 0px", threshold: 0.05 }
      );
      nodes.forEach((n) => io.observe(n));
    },
    renderAll: function () {
      document.querySelectorAll("[data-chart]").forEach(renderChart);
    },
  };
})();
