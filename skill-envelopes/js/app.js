/* ==========================================================================
   Interactivity & Scroll Orchestration for Skill Envelopes Project Page
   ========================================================================== */
(function () {
  /* 1. Top Scroll Progress Bar + Navbar Theme Transition + Left Sidebar TOC */
  const progressBar = document.getElementById("scroll-progress");
  const topNav = document.getElementById("top-nav");
  const tocSidebar = document.getElementById("toc-sidebar");
  const hero = document.getElementById("hero");

  function onScroll() {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? Math.min(100, Math.max(0, (window.scrollY / docH) * 100)) : 0;
    if (progressBar) progressBar.style.width = pct.toFixed(2) + "%";

    const pastHero = hero ? window.scrollY > hero.offsetHeight - 110 : window.scrollY > 400;
    if (topNav) topNav.classList.toggle("past-hero", pastHero);
    if (tocSidebar) tocSidebar.classList.toggle("visible", pastHero);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* 2. Active Section Highlighting in Left TOC */
  const tocLinks = Array.from(document.querySelectorAll(".toc-list a[href^='#']"));
  const sections = tocLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const secIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          tocLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
        });
      },
      { rootMargin: "-22% 0px -65% 0px", threshold: 0.01 }
    );
    sections.forEach((s) => secIO.observe(s));
  }

  /* 3. Interactive Living Diagrams (Fig. 1 & Fig. 3) */
  const ANIM_FIGS = {
    fig1: {
      attr: "data-f1-grp",
      notes: {
        0: "<b>Full Flow:</b> Combinatorial motivation → seam collision → causal attribution → 3D Skill Envelope → closed-loop preconditions back to LLM Agent.",
        1: "<b>1. Seam Failure:</b> Open Drawer finishes (Done ✓), yet Push Plate crashes straight into the open drawer at <b>0/10</b> (Not Ready ✗), halting steps 3–4.",
        2: "<b>2. Causal Attribution:</b> Re-homing (Body) recovers <b>+68.6 pts</b>; hiding residue (View) adds only <b>+1.7 (n.s.)</b>; physically removing residue (World) recovers <b>+10.0 pts</b> and cuts hits to <b>2.0%</b>.",
        3: "<b>3. 3D Skill Envelope:</b> Solo rollouts measure the exact 3D volume swept by the frozen arm—red voxel overlap predicts physical collisions before execution.",
        4: "<b>4. Tools & Closed Loop:</b> <code>CHECK</code> gating + <code>FREE</code> code recovery lifts 3–4 step chains from <b>29.7% → 93.8%</b> and drawer repair from <b>0.4% → 98.6%</b>.",
      },
    },
    fig3: {
      attr: "data-f3-grp",
      notes: {
        0: "<b>Full Pipeline:</b> (1) Offline O(n) voxel profiling → (2) Online division of labor (Clear fast-lane to VLA vs. Blocked code repair + re-check loop) → (3) CHECK &amp; FREE 3D tools.",
        1: "<b>1. Offline Profiling O(n):</b> Solo successful rollouts project robot links and held objects onto a 1 cm voxel grid <i>E</i><sub>k</sub>(x)—zero human demos, zero failure data.",
        2: "<b>2. Online Division of Labor:</b> Plan order → re-home + single-view RGB-D → <code>CHECK(k, s)</code> forks clean seams straight to frozen VLA (skipping LLM/VLM) and routes blocked seams to code repair + re-check.",
        3: "<b>3. CHECK &amp; FREE 3D Tools:</b> Red voxels isolate blocking residue; teal safe grid avoids the union <i>E</i><sub>k</sub> ∪ <i>E</i><sub>k+1</sub> so displaced objects never block future steps.",
      },
    },
  };

  function setAnimFig(key, step) {
    const cfg = ANIM_FIGS[key];
    const stage = document.querySelector(`[data-anim-fig="${key}"]`);
    const note = document.getElementById(`note-${key}`);
    const ctl = document.querySelector(`[data-anim-ctl="${key}"]`);
    if (!cfg || !stage) return;
    stage.querySelectorAll(`[${cfg.attr}]`).forEach((el) => {
      const g = el.getAttribute(cfg.attr) || "";
      const active = step === 0 || g.includes(String(step));
      el.setAttribute("class", "a-grp" + (active ? "" : " a-dim"));
    });
    if (note && cfg.notes[step]) note.innerHTML = cfg.notes[step];
    if (ctl) ctl.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", Number(b.dataset.step) === step));
  }

  document.querySelectorAll("[data-anim-ctl]").forEach((ctl) => {
    const key = ctl.dataset.animCtl;
    ctl.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => setAnimFig(key, Number(btn.dataset.step)));
    });
  });

  /* 4. Interactive Start-State Distribution Shift / DAgger Manifold */
  const DS_NOTES = {
    0: "<b>Full Story:</b> OOD start-state divergence (DAgger-like) → Body re-homing → mid-tube physical collision → targeted 1-variable code clearing (zero policy finetuning).",
    1: "<b>1. Training Support Tube:</b> Imitation / VLA policies achieve 98% reliability only inside their training start distribution <i>p</i><sub>train</sub>(<i>s</i><sub>0</sub>) and demonstration manifold.",
    2: "<b>2. OOD Start Shift (DAgger Analogy):</b> Predecessor A leaves the arm out-of-distribution → compounding covariate shift collapses success to <b>14.2%</b>.",
    3: "<b>3. Mid-Tube Physical Collision:</b> Body re-homing restores the arm entry (<b>82.8%</b>), yet an open drawer still blocks the rigid mid-rollout trajectory (<b>0/10</b>).",
    4: "<b>4. Surgical Code Clearing:</b> Without touching frozen VLA weights, <code>CHECK</code>/<code>FREE</code> removes only the blocking object—restoring clean traversal to <b>93.8%</b>.",
  };

  function setDistShift(mode) {
    const wrap = document.getElementById("stage-ds");
    const note = document.getElementById("note-ds");
    const ctl = document.querySelector('[data-ds-ctl="ds"]');
    if (!wrap) return;
    const L = (id) => wrap.querySelector(`#ds-layer-${id}`);
    const setCls = (el, cls) => {
      if (el) el.setAttribute("class", "ds-layer" + (cls ? " " + cls : ""));
    };
    if (mode === 1) {
      setCls(L("ood"), "ds-hide");
      setCls(L("homing"), "ds-hide");
      setCls(L("ghost"), "ds-hide");
      setCls(L("collide"), "ds-hide");
      setCls(L("obs"), "ds-hide");
      setCls(L("recover"), "ds-hide");
    } else if (mode === 2) {
      setCls(L("ood"), "");
      setCls(L("homing"), "ds-hide");
      setCls(L("ghost"), "ds-hide");
      setCls(L("collide"), "ds-hide");
      setCls(L("obs"), "ds-hide");
      setCls(L("recover"), "ds-hide");
    } else if (mode === 3) {
      setCls(L("ood"), "ds-dim");
      setCls(L("homing"), "");
      setCls(L("ghost"), "ds-hide");
      setCls(L("collide"), "");
      setCls(L("obs"), "");
      setCls(L("recover"), "ds-hide");
    } else if (mode === 4) {
      setCls(L("ood"), "ds-dim");
      setCls(L("homing"), "");
      setCls(L("ghost"), "");
      setCls(L("collide"), "ds-dim");
      setCls(L("obs"), "ds-obs-lifted");
      setCls(L("recover"), "");
    } else {
      setCls(L("ood"), "");
      setCls(L("homing"), "");
      setCls(L("ghost"), "");
      setCls(L("collide"), "");
      setCls(L("obs"), "ds-obs-lifted");
      setCls(L("recover"), "");
    }
    if (note && DS_NOTES[mode]) note.innerHTML = DS_NOTES[mode];
    if (ctl) ctl.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", Number(b.dataset.ds) === mode));
  }

  document.querySelectorAll('[data-ds-ctl="ds"] button').forEach((btn) => {
    btn.addEventListener("click", () => setDistShift(Number(btn.dataset.ds)));
  });

  /* 5. Interactive Eq. (3) Readiness Model Simulator + Card Hover Linkage */
  const EQ3_CASES = [
    { body: "0.96", world: "1.00", out: "96%", cls: "ok", note: "0 cm³ overlap · e<sup>0</sup> = 1 (zero penalty)" },
    { body: "0.96", world: "0.46", out: "44%", cls: "mid", note: "Grazing overlap · smooth exponential decay" },
    { body: "0.96", world: "0.03", out: "3%", cls: "bad", note: "418 cm³ drawer overlap · survival collapses" },
  ];

  document.querySelectorAll('[data-eq3-ctl="eq3"] button').forEach((btn) => {
    btn.addEventListener("click", () => {
      const c = EQ3_CASES[Number(btn.dataset.case || 0)];
      if (!c) return;
      btn.parentElement.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === btn));
      document.getElementById("eq3-v-body").textContent = c.body;
      document.getElementById("eq3-v-world").textContent = c.world;
      const vo = document.getElementById("eq3-v-out");
      vo.textContent = c.out;
      vo.className = "eq3-badge " + c.cls;
      document.getElementById("eq3-v-note").innerHTML = c.note;
    });
  });

  document.querySelectorAll("[data-eq3-hover]").forEach((term) => {
    const key = term.dataset.eq3Hover;
    const cards = document.querySelectorAll(`[data-eq3-card="${key}"]`);
    term.addEventListener("mouseenter", () => cards.forEach((c) => c.classList.add("lit")));
    term.addEventListener("mouseleave", () => cards.forEach((c) => c.classList.remove("lit")));
  });

  /* 6. ASPIRE-Style Video Demo Gallery Filter & Smart Viewport Autoplay */
  document.querySelectorAll("[data-gallery-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.galleryFilter;
      document.querySelectorAll("[data-gallery-filter]").forEach((b) => b.setAttribute("aria-pressed", b === btn));
      document.querySelectorAll("[data-demo-cat]").forEach((card) => {
        const match = cat === "all" || card.dataset.demoCat === cat;
        card.classList.toggle("hidden-by-filter", !match);
      });
    });
  });

  const vids = Array.from(document.querySelectorAll("video[data-smart-play]"));
  if ("IntersectionObserver" in window && vids.length) {
    const vidIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target;
          const rate = Number(v.dataset.rate || "1");
          if (e.isIntersecting) {
            v.muted = true;
            v.playbackRate = rate;
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    vids.forEach((v) => {
      v.muted = true;
      vidIO.observe(v);
    });
  }

  /* 7. One-Click BibTeX Copy */
  const copyBtn = document.getElementById("copy-bibtex");
  const bibEl = document.getElementById("bibtex-content");
  if (copyBtn && bibEl) {
    copyBtn.addEventListener("click", () => {
      const txt = bibEl.textContent.trim();
      navigator.clipboard
        .writeText(txt)
        .then(() => {
          copyBtn.textContent = "Copied ✓";
          setTimeout(() => {
            copyBtn.textContent = "Copy BibTeX";
          }, 1800);
        })
        .catch(() => {
          copyBtn.textContent = "Select & Copy";
        });
    });
  }

  /* 8. Initialize D3 Charts */
  if (window.PageCharts) window.PageCharts.init();
})();
