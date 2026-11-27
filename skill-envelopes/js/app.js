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
        0: "<b>Overview:</b> Why compose skills → seam collision → causal attribution → 3D Skill Envelope → closed-loop 3D tools for the LLM agent.",
        1: "<b>1. Seam Failure:</b> Open Drawer finishes (Done ✓), but Push Plate hits the open drawer at <b>0/10</b> (Not Ready ✗), blocking steps 3–4.",
        2: "<b>2. Causal Diagnosis:</b> Re-homing (Body) recovers <b>+68.6 pts</b>; hiding the drawer from pixels (View) adds <b>+1.7 (n.s.)</b>; closing it in physics (World) adds <b>+10.0 pts</b> and cuts hits to <b>2.0%</b>.",
        3: "<b>3. 3D Skill Envelope:</b> Solo rollouts record the 3D volume the frozen arm sweeps. Red voxel overlap flags collisions before execution.",
        4: "<b>4. Tools &amp; Closed Loop:</b> <code>CHECK</code> + <code>FREE</code> raise 3–4 step chains from <b>29.7% → 93.8%</b> and drawer recovery from <b>0.4% → 98.6%</b>.",
      },
    },
    fig3: {
      attr: "data-f3-grp",
      notes: {
        0: "<b>Full Pipeline:</b> (1) Offline O(n) voxel profiling → (2) Online routing (clear seams go straight to VLA; blocked seams trigger code recovery + re-check) → (3) CHECK and FREE 3D tools.",
        1: "<b>1. Offline Profiling O(n):</b> Solo successful rollouts project arm links and held objects onto a 1 cm voxel grid <i>E</i><sub>k</sub>(x)—no extra demos or failure logs.",
        2: "<b>2. Online Loop:</b> Plan order → re-home + single-view RGB-D → <code>CHECK(k, s)</code> sends clear seams straight to the VLA (skipping LLM/VLM) and routes blocked seams to code recovery.",
        3: "<b>3. CHECK &amp; FREE Tools:</b> Red voxels mark blocking obstacles; the teal grid stays outside <i>E</i><sub>k</sub> ∪ <i>E</i><sub>k+1</sub> so moved objects do not block later steps.",
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
      el.classList.toggle("a-dim", !active);
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
    0: "<b>Full Story:</b> Start-state drift → arm re-homing → mid-path obstacle collision → 1-object code clearing (no policy finetuning).",
    1: "<b>1. Training Tube:</b> Frozen skills succeed at 98% only when starting inside their training support <i>p</i><sub>train</sub>(<i>s</i><sub>0</sub>).",
    2: "<b>2. Start-State Drift:</b> Skill A leaves the arm out-of-distribution, causing compounding drift down to <b>14.2%</b>.",
    3: "<b>3. Mid-Path Collision:</b> Re-homing puts the arm back at the entrance (<b>82.8%</b>), but an open drawer still blocks the rigid path (<b>0/10</b>).",
    4: "<b>4. Code Clearing:</b> Without changing VLA weights, <code>CHECK</code> and <code>FREE</code> clear only the blocking object—lifting chains to <b>93.8%</b>.",
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
