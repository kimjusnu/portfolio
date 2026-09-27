// Motion without a library: reveal-on-view, the hero correction and a cursor-following preview on the work rows.
// With reduced motion everything is shown in its final state.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = (sel) => [...document.querySelectorAll(sel)];
  if (reduce) document.documentElement.classList.add("no-motion");

  // reveal once when an element enters the viewport
  const reveal = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("in");
      reveal.unobserve(e.target);
    }
  }, { rootMargin: "0px 0px -10% 0px" });
  $$("[data-reveal]").forEach((el) => (reduce ? el.classList.add("in") : reveal.observe(el)));

  // hero: 불편하게 (harder) is struck through, collapses, and 편하게 (easier) takes its place.
  // main.js swaps the language before this runs and calls playHero again after every toggle.
  const hero = document.querySelector(".intro");
  const ins = hero?.querySelector(".fix ins");
  let doneTimer = 0;
  const finish = () => { clearTimeout(doneTimer); hero.classList.add("done"); };
  function playHero() {
    const del = hero?.querySelector(".fix del");
    if (!hero) return;
    clearTimeout(doneTimer);
    hero.classList.remove("play", "done");
    if (!del || reduce) {
      hero.classList.remove("pending");
      hero.classList.add("done");
      return;
    }
    hero.style.setProperty("--del-w", `${del.getBoundingClientRect().width}px`);
    hero.style.setProperty("--ins-w", `${ins.scrollWidth}px`); // ins is 0 wide while pending; scrollWidth is its text
    void hero.offsetWidth; // restart the CSS animations
    hero.classList.remove("pending");
    hero.classList.add("play");
    doneTimer = setTimeout(finish, 6000); // fallback if animation events never fire
  }
  // finish when 편하게 has actually appeared: the animation clock starts at first paint, not at load
  ins?.addEventListener("animationend", (e) => e.animationName === "pop" && finish());
  if (hero && !reduce) hero.classList.add("pending"); // hide 편하게 until the fonts are in and the swap starts
  window.playHero = () => { hero?.classList.add("pending"); playHero(); };
  // measure widths with the web font, not the fallback that shows while it loads
  (document.fonts?.ready || Promise.resolve()).then(playHero);

  // work rows: a screenshot follows the cursor (fine pointers only; hidden by CSS on small screens)
  const preview = document.querySelector(".preview");
  if (!preview || reduce || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  let frame = 0;
  const place = (x, y) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const w = preview.offsetWidth;
      const h = preview.offsetHeight;
      const left = Math.min(x + 24, innerWidth - w - 16);
      const top = Math.min(Math.max(y - h / 2, 16), innerHeight - h - 16);
      preview.style.setProperty("--x", `${left}px`);
      preview.style.setProperty("--y", `${top}px`);
    });
  };
  $$(".row[data-preview]").forEach((row) => {
    const img = new Image();
    img.src = row.dataset.preview; // warm the cache so the preview never flashes empty
    row.addEventListener("pointerenter", (e) => {
      preview.src = row.dataset.preview;
      preview.classList.toggle("tall", row.hasAttribute("data-preview-tall"));
      place(e.clientX, e.clientY);
      preview.classList.add("on");
    });
    row.addEventListener("pointermove", (e) => place(e.clientX, e.clientY));
    row.addEventListener("pointerleave", () => preview.classList.remove("on"));
  });
})();
