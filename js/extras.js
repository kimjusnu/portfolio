// Three small extras: a ⌘K command palette, the latest public GitHub push, and click-to-zoom screenshots.
// Everything is plain DOM; each part is skipped when its markup is missing.
(() => {
  const root = document.documentElement;
  const isEn = () => root.lang === "en";
  const t = (ko, en) => (isEn() ? en : ko);
  const base = document.querySelector('link[rel="stylesheet"]').getAttribute("href").replace("style.css", "");

  /* ---------- ⌘K command palette ---------- */
  const commands = () => [
    { group: t("페이지", "Pages"), label: t("첫 페이지", "Home"), go: base || "./" },
    { group: t("페이지", "Pages"), label: t("마이피드 작업", "MyFeed case"), go: `${base}myfeed/` },
    { group: t("페이지", "Pages"), label: t("readme_portrait 작업", "readme_portrait case"), go: `${base}readme-portrait/` },
    { group: t("페이지", "Pages"), label: t("이력서", "Résumé"), go: `${base}resume/` },
    { group: t("이동", "Jump to"), label: t("작업 목록", "Work"), go: `${base || "./"}#work` },
    { group: t("이동", "Jump to"), label: t("경력", "Career"), go: `${base || "./"}#career` },
    { group: t("이동", "Jump to"), label: t("연락", "Contact"), go: `${base || "./"}#contact` },
    { group: t("동작", "Actions"), label: t("이메일 주소 복사", "Copy email address"), run: copyMail },
    { group: t("동작", "Actions"), label: t("English로 보기", "한국어로 보기"), run: () => document.getElementById("lang").click() },
    { group: t("동작", "Actions"), label: "GitHub", go: "https://github.com/kimjusnu" },
  ];

  async function copyMail() {
    try {
      await navigator.clipboard.writeText("junsu4621@naver.com");
      toast(t("이메일 주소를 복사했습니다", "Email address copied"));
    } catch {
      toast(t("복사하지 못했습니다. junsu4621@naver.com", "Could not copy. junsu4621@naver.com"));
    }
  }

  function toast(text) {
    const el = Object.assign(document.createElement("p"), { className: "toast", textContent: text });
    el.setAttribute("role", "status");
    document.body.append(el);
    setTimeout(() => el.remove(), 2600);
  }

  const dialog = document.createElement("dialog");
  dialog.className = "cmdk";
  dialog.innerHTML = `
    <label class="cmdk-field"><span class="visually-hidden"></span>
      <input type="text" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="cmdk-list" aria-autocomplete="list">
    </label>
    <ul id="cmdk-list" class="cmdk-list" role="listbox"></ul>
    <p class="cmdk-hint"></p>`;
  document.body.append(dialog);
  const input = dialog.querySelector("input");
  const list = dialog.querySelector("ul");
  let items = [];
  let active = 0;

  function render() {
    const q = input.value.trim().toLowerCase();
    items = commands().filter((c) => !q || `${c.label} ${c.group}`.toLowerCase().includes(q));
    active = Math.min(active, Math.max(items.length - 1, 0));
    list.innerHTML = "";
    if (!items.length) {
      list.innerHTML = `<li class="cmdk-empty">${t("찾는 항목이 없습니다", "Nothing matches")}</li>`;
      input.removeAttribute("aria-activedescendant");
      return;
    }
    items.forEach((c, i) => {
      const li = document.createElement("li");
      li.id = `cmdk-${i}`;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", String(i === active));
      li.innerHTML = `<span class="cmdk-group"></span><span class="cmdk-label"></span>`;
      li.querySelector(".cmdk-group").textContent = c.group;
      li.querySelector(".cmdk-label").textContent = c.label;
      li.addEventListener("pointermove", () => { if (active !== i) { active = i; mark(); } });
      li.addEventListener("click", () => runItem(c));
      list.append(li);
    });
    mark();
  }
  function mark() {
    [...list.children].forEach((li, i) => li.setAttribute("aria-selected", String(i === active)));
    input.setAttribute("aria-activedescendant", `cmdk-${active}`);
    list.children[active]?.scrollIntoView({ block: "nearest" });
  }
  function runItem(c) {
    dialog.close();
    if (c.run) c.run();
    else if (/^https?:/.test(c.go)) window.open(c.go, "_blank", "noopener");
    else location.href = c.go;
  }
  function open() {
    input.value = "";
    active = 0;
    input.placeholder = t("어디로 갈까요?", "Where to?");
    input.setAttribute("aria-label", t("명령 검색", "Search commands"));
    dialog.querySelector(".cmdk-hint").textContent = t("↑↓ 이동 · Enter 실행 · Esc 닫기", "↑↓ move · Enter run · Esc close");
    render();
    dialog.showModal();
    input.focus();
  }
  input.addEventListener("input", () => { active = 0; render(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      active = (active + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      mark();
    } else if (e.key === "Enter" && items[active]) {
      e.preventDefault();
      runItem(items[active]);
    }
  });
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      dialog.open ? dialog.close() : open();
    }
  });
  // a visible way in for people who do not know the shortcut
  const nav = document.querySelector(".nav");
  if (nav) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "kbd";
    btn.textContent = /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K";
    btn.setAttribute("aria-label", t("명령 팔레트 열기", "Open command palette"));
    btn.addEventListener("click", open);
    nav.prepend(btn);
  }

  /* ---------- latest public GitHub push ---------- */
  const line = document.getElementById("activity");
  if (line) loadActivity(line);

  async function loadActivity(el) {
    const KEY = "gh-activity";
    const ago = (iso) => {
      const sec = (new Date(iso).getTime() - Date.now()) / 1000;
      const rtf = new Intl.RelativeTimeFormat(isEn() ? "en" : "ko", { numeric: "auto" });
      for (const [unit, size] of [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]]) {
        if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
      }
      return rtf.format(0, "minute");
    };
    const paint = (d) => {
      el.classList.remove("loading");
      el.innerHTML = `<span class="dot" aria-hidden="true"></span><span class="lbl"></span> <a></a> <span class="when"></span> <span class="msg"></span>`;
      el.querySelector(".lbl").textContent = t("최근 커밋", "Latest commit");
      const a = el.querySelector("a");
      a.href = d.url;
      a.textContent = d.repo.replace("kimjusnu/", "");
      el.querySelector(".when").textContent = `· ${ago(d.at)}`;
      el.querySelector(".msg").textContent = d.message ? `· ${d.message}` : "";
    };
    try {
      const cached = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (cached && Date.now() - cached.saved < 10 * 60 * 1000) {
        paint(cached.data);
        document.addEventListener("langchange", () => paint(cached.data));
        return;
      }
    } catch { /* storage blocked: just fetch */ }
    el.classList.add("loading");
    el.textContent = t("GitHub 활동을 불러오는 중…", "Loading GitHub activity…");
    try {
      const res = await fetch("https://api.github.com/users/kimjusnu/events/public?per_page=30");
      if (!res.ok) throw new Error(`events ${res.status}`);
      const push = (await res.json()).find((e) => e.type === "PushEvent" && e.payload?.head);
      if (!push) throw new Error("no public push");
      // push events no longer carry commit messages; ask for the head commit
      let message = "";
      const c = await fetch(`https://api.github.com/repos/${push.repo.name}/commits/${push.payload.head}`);
      if (c.ok) message = (await c.json()).commit?.message?.split("\n")[0] || "";
      const data = { repo: push.repo.name, at: push.created_at, message, url: `https://github.com/${push.repo.name}/commit/${push.payload.head}` };
      try { sessionStorage.setItem(KEY, JSON.stringify({ saved: Date.now(), data })); } catch { /* ignore */ }
      paint(data);
      document.addEventListener("langchange", () => paint(data));
    } catch {
      el.classList.remove("loading");
      el.innerHTML = "";
      const a = Object.assign(document.createElement("a"), { href: "https://github.com/kimjusnu" });
      a.textContent = t("GitHub에서 최근 활동 보기", "See recent activity on GitHub");
      el.append(a);
    }
  }

  /* ---------- click-to-zoom screenshots on the case pages ---------- */
  const shots = [...document.querySelectorAll(".case .shot img, .case .phones img, .case .pair img")];
  if (!shots.length) return;
  const zoom = document.createElement("dialog");
  zoom.className = "zoom";
  zoom.innerHTML = `<img alt=""><button type="button" class="zoom-close"></button>`;
  document.body.append(zoom);
  const big = zoom.querySelector("img");
  const close = zoom.querySelector(".zoom-close");
  close.addEventListener("click", () => zoom.close());
  zoom.addEventListener("click", (e) => { if (e.target !== close) zoom.close(); });
  shots.forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    const show = () => {
      big.src = img.src; // always the full-size file, whatever srcset picked for the page
      big.alt = img.alt;
      close.textContent = t("닫기", "Close");
      zoom.classList.toggle("tall", img.naturalHeight > img.naturalWidth);
      zoom.showModal();
    };
    img.addEventListener("click", show);
    img.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(); } });
  });
})();
