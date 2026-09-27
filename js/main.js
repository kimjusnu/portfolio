// Language toggle and copy-email. Korean lives in the markup; English comes from strings-en.js.
(() => {
  const EN = window.STRINGS_EN || {};
  const ko = new Map();
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  // The Korean original of each element, captured the first time it is translated
  function remember(el, attr) {
    if (!ko.has(el)) ko.set(el, {});
    const saved = ko.get(el);
    if (!(attr in saved)) saved[attr] = attr === "html" ? el.innerHTML : el.getAttribute(attr);
    return saved[attr];
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    for (const el of $$("[data-i18n]")) {
      const original = remember(el, "html");
      const en = EN[el.dataset.i18n];
      el.innerHTML = lang === "en" && en !== undefined ? en : original;
    }
    for (const [attr, key] of [["alt", "i18nAlt"], ["aria-label", "i18nAria"]]) {
      const selector = `[data-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}]`;
      for (const el of $$(selector)) {
        const original = remember(el, attr);
        const en = EN[el.dataset[key]];
        el.setAttribute(attr, lang === "en" && en !== undefined ? en.replace(/<br>/g, " ") : original);
      }
    }
    const toggle = $("#lang");
    toggle.textContent = lang === "en" ? "KO" : "EN";
    toggle.lang = lang === "en" ? "ko" : "en";
    toggle.setAttribute("aria-label", lang === "en" ? "한국어로 보기" : "View in English");
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
    try { localStorage.setItem("lang", lang); } catch { /* storage blocked: keep the choice for this visit */ }
  }

  function initialLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "ko") return q;
    try { return localStorage.getItem("lang") || "ko"; } catch { return "ko"; }
  }

  $("#lang").addEventListener("click", () => {
    apply(document.documentElement.lang === "en" ? "ko" : "en");
    window.playHero?.();
  });
  $("#copy-mail")?.addEventListener("click", async () => {
    const status = $("#status");
    const en = document.documentElement.lang === "en";
    try {
      await navigator.clipboard.writeText("junsu4621@naver.com");
      status.textContent = en ? EN["page.copied"] || "Copied" : "복사했습니다";
    } catch {
      status.textContent = en ? EN["page.copyFailed"] || "Could not copy" : "복사하지 못했습니다";
    }
  });
  apply(initialLang());
})();
