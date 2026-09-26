/**
 * Language switching — English and Korean.
 *
 * Korean lives in the markup; English lives in the DICT below. That asymmetry
 * is deliberate:
 *
 *   - Crawlers that do not run JS (KakaoTalk, most social previews) read the
 *     raw HTML, so shares stay Korean and keep matching the Korean OG image.
 *   - There is no Korean dictionary to drift out of sync with the markup.
 *     Switching to Korean simply restores what the DOM already said, captured
 *     once at boot.
 *
 * English is the default view, so the very first paint is normally a swap. The
 * inline head script hides the body until this file finishes, with a timer that
 * un-hides it if this file never arrives — a missing translation must never
 * leave a blank page.
 *
 * Contract, all opt-in per element:
 *   data-i18n="key"                       → textContent
 *   data-i18n-html="key"                   → innerHTML
 *   data-i18n-attr="placeholder:key|aria-label:key"  → attributes
 *
 * data-i18n-html writes authored strings from this file and never anything a
 * visitor typed, so there is no injection path. Anything visitor-supplied must
 * keep using data-i18n.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'lang';

  // The markup stays Korean so crawlers that never run JS (KakaoTalk, Slack)
  // keep showing a Korean preview that matches the Korean OG image. What the
  // *visitor* sees is decided here instead: a Korean browser gets Korean, and
  // everyone else gets English. Most readers of this page are Korean
  // recruiters, and an English hero was costing them the first ten seconds.
  var FALLBACK_LANG = 'en';

  function browserLang() {
    var list = [];
    try {
      if (window.navigator.languages && window.navigator.languages.length) {
        list = [].slice.call(window.navigator.languages);
      } else if (window.navigator.language) {
        list = [window.navigator.language];
      }
    } catch (e) {
      return FALLBACK_LANG;
    }
    for (var i = 0; i < list.length; i++) {
      var tag = String(list[i]).toLowerCase();
      if (tag === 'ko' || tag.indexOf('ko-') === 0) return 'ko';
      if (tag === 'en' || tag.indexOf('en-') === 0) return 'en';
    }
    return FALLBACK_LANG;
  }

  var DICT = {
    en: {
      /* ---------------- document ---------------- */
      'meta.title': 'Junsu Kim · Frontend Developer',
      'meta.description':
        'Portfolio of Junsu Kim, a frontend developer who builds and runs a service real customers use, and turns their friction into screen improvements.',
      'a11y.skip': 'Skip to content',
      'a11y.langGroup': 'Language',

      /* ---------------- shared chrome ---------------- */
      'brand.name': 'Junsu Kim',
      'nav.label': 'Main menu',
      'nav.home': 'Home',
      'nav.work': 'Work',
      'nav.about': 'Career & contact',
      'nav.open': 'Open menu',
      'nav.close': 'Close menu',
      'crumb.label': 'You are here',
      'page.role': 'My role',
      'page.next': 'Keep reading',
      'page.backHome': 'Portfolio home',
      'page.backWork': 'All work',
      'page.openSite': 'Open site',
      'page.copied': 'Copied',
      'page.copyFailed': 'Could not copy',

      /* ---------------- hero ---------------- */
      'hero.name': 'JUNSU KIM',
      'hero.role': 'FRONTEND DEVELOPER',
      'hero.title1': 'Services people actually use,',
      'hero.title2': 'made easier to use.',
      'hero.lede1': 'Web development and operation for a feed-management service used on farms.',
      'hero.lede2': 'I turn customer enquiries into requirements, then into screens.',
      'hero.cta1': 'See what I do',
      'hero.cta2': 'Career & contact',
      'hero.meta': 'Screen fixes · fewer requests · enquiries that arrive',
      'hero.scroll': 'EXPLORE MY WORK',

      /* ---------------- what I do ---------------- */
      'what.label': 'What I do',
      'what.title': 'I listen for the friction,<br>then fix the screen.',
      'what.sub':
        'I worked out requirements and screens with the app developer, then carried the build and the operation.',
      'what.1.h': 'Enquiries into screens',
      'what.1.p': 'Customers said menus were hard to find, so I reworked the paths to the main tasks.',
      'what.1.link': 'See the screen fixes',
      'what.2.h': 'Heavy screens, lighter',
      'what.2.p': 'I found the bottleneck with per-stage timing logs and cut the requests.',
      'what.2.link': 'See the request cuts',
      'what.3.h': 'AI results people can read',
      'what.3.p': 'The remaining-feed number alone was hard to judge, so I built a supporting view.',
      'what.3.link': 'See the AI result screens',
      'what.4.h': 'A homepage enquiries reach',
      'what.4.p': 'I routed online enquiries straight to the sales team as notifications.',
      'what.4.link': 'See the homepage rebuild',

      'stats.label': 'What I cut on My Feed',
      'stats.1': 'Requests on the monitoring screen (staging)',
      'stats.2': 'Horizontal overflow at 375px',
      'stats.3': 'Requests per notification poll (in production)',
      'stats.unit.count': '',
      'stats.unit.times': '',
      'stats.unit.req': '',
      'stats.note': 'Requests measured on staging · notification change is in production · overflow from the fix commits',
      'stats.link': 'How I cut them',

      /* ---------------- featured work ---------------- */
      'work.label': 'Featured work',
      'work.title': 'What I built,<br>and what was mine.',
      'work.sub': "Services running at work. Where a part was someone else's, I say so.",
      'work.more': 'Read the case',
      'work.myfeed.tag': 'AimBe Lab · internal service',
      'work.myfeed.h': 'A feed-management<br>service farms use.',
      'work.myfeed.lede':
        'On My Feed, used by some 130 farms as of July 2026, I have built and fixed the monitoring screens, the admin and the web notifications.',
      'work.myfeed.caption': 'Farm monitoring · the live service',
      'work.home.tag': 'AimBe Lab · company homepage',
      'work.home.h': 'From a company-profile site<br>to a service-first landing page.',
      'work.home.lede':
        'I did the planning, design and web build to rebuild it for customers, and routed online enquiries straight to the sales team as notifications.',
      'work.home.caption': 'The rebuilt first screen',
      'work.moreText': 'Componique, StartupQT, Eat Fit and Wairi too.',
      'work.all': 'All work',

      /* ---------------- career ---------------- */
      'career.label': 'Career',
      'career.title': 'Where I have<br>worked so far.',
      'career.sub': 'Full-time at AimBe Lab, intern at The Innovators.<br>Before that, the army signal corps and university.',
      'career.1.when': '2025.07 — Present',
      'career.1.org': 'AimBe Lab',
      'career.1.role': 'Engineer · full-time',
      'career.2.org': 'The Innovators',
      'career.2.role': 'Frontend · intern',
      'career.3.org': 'Republic of Korea Army',
      'career.3.role': 'Signal corps · Sergeant, completed service',
      'career.4.org': 'Tech University of Korea',
      'career.4.role': 'Computer Engineering, Software major',
      'career.more': 'Full career, awards and certifications',

      'facts.awards': 'Awards',
      'facts.certs': 'Certifications',
      'cred.0': 'Veritas Alpha Education Article Contest, Excellence Award',
      'cred.1': 'Korea Engineering Exhibition, Excellence Award — Eat Fit',
      'cred.2': 'Sniper Factory Bootcamp, Excellence Award — Wairi',
      'cred.3': 'Woongjin ThinkBig × Udemy Bootcamp, 2nd place — Componique',
      'cred.ga': 'Google Analytics certification',
      'cred.opic': 'OPIc English IM1',
      'skills.main': 'Use most',
      'skills.used': 'Have used',
      'skills.touched': 'Worked alongside',

      /* ---------------- contact ---------------- */
      'contact.label': 'Contact',
      'contact.title': 'If there is a screen to fix,<br>get in touch.',
      'contact.sub': "I'll send my resume and project notes by email.",

      /* ---------------- screenshots ---------------- */
      'shot.myfeed':
        'My Feed farm monitoring — each silo with its latest interior photo, remaining tonnage, temperature, humidity and freshness',
      'shot.myfeed2': 'My Feed dashboard — the share of bins needing an order, and the bin location map',
      'shot.myfeed3': 'My Feed ordering — picking a bin, a quantity and a delivery date',
      'shot.notify': 'My Feed notification list — three unread alerts and the filter by alert type',
      'shot.notify2': 'My Feed notification settings — browser permission state and a toggle per alert type',
      'shot.notify3': 'My Feed per-bin alert settings — change the reference photo, snooze the order alert, or turn it off',
      'shot.aimbelab': 'The rebuilt AimBe Lab homepage, with its enquiry call to action',
      'shot.aimbelab2': 'AimBe Lab homepage — the before-and-after comparison table',
      'shot.aimbelab3': 'AimBe Lab homepage — the farmer interview video cards',

      /* ---------------- chat ---------------- */
      'chat.toggle': 'Ask the AI',
      'chat.panelLabel': 'AI assistant',
      'chat.title': 'Portfolio assistant',
      'chat.sub': 'Answers about my experience and projects',
      'chat.close': 'Close',
      'chat.s1': 'What projects have you built?',
      'chat.s2': 'What is your main tech stack?',
      'chat.s3': 'What did you do at AimBe Lab?',
      'chat.inputLabel': 'Enter your question',
      'chat.placeholder': 'Ask me anything',
      'chat.send': 'Send',
      'chat.disclaimer':
        'The AI answers from resume data. Conversations are not stored — please confirm anything important by email.',
      'chat.greeting':
        "Hello. I answer questions about Junsu Kim's experience and projects. What would you like to know?",
      'chat.errRate':
        'Questions are coming in a bit fast. Please try again shortly, or email —',
      'chat.errGeneric': "Couldn't fetch an answer. Please email —",

      /* ---------------- footer ---------------- */
      'footer.label': 'Footer menu',
      'footer.resume': 'Resume',
      'footer.blog': 'Blog',
      'footer.mail': 'Send email',
      'footer.bottom': '© 2026 Junsu Kim · Frontend Developer',
    },

    /* Korean normally comes from the markup. These are the exceptions: strings
       that only ever exist in JavaScript, so there is no DOM node to read. */
    ko: {
      'nav.open': '메뉴 열기',
      'nav.close': '메뉴 닫기',
      'page.copied': '복사했습니다',
      'page.copyFailed': '복사하지 못했습니다',
      'chat.greeting':
        '안녕하세요. 김준수의 이력과 프로젝트에 대해 답해드립니다. 무엇이 궁금하신가요?',
      'chat.errRate': '질문이 잠시 몰렸습니다. 조금 뒤에 다시 시도하시거나 메일로 문의해 주세요 —',
      'chat.errGeneric': '답변을 가져오지 못했습니다. 메일로 문의해 주세요 —',
    },
  };

  // A page can add its own strings by defining window.i18nStrings in a script
  // loaded before this one. The resume does that rather than growing DICT with
  // keys the home page would carry and never use.
  if (window.i18nStrings) {
    Object.keys(window.i18nStrings).forEach(function (lang) {
      var extra = window.i18nStrings[lang];
      DICT[lang] = DICT[lang] || {};
      Object.keys(extra).forEach(function (key) {
        DICT[lang][key] = extra[key];
      });
    });
  }

  var root = document.documentElement;

  /* ----------------------------------------------------------
     Korean originals, captured straight from the markup
     ---------------------------------------------------------- */
  var ko = { text: {}, html: {}, attr: {} };

  function capture() {
    ko.text['meta.title'] = document.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) ko.text['meta.description'] = desc.getAttribute('content');

    each('[data-i18n]', function (el) {
      ko.text[el.getAttribute('data-i18n')] = el.textContent;
    });
    each('[data-i18n-html]', function (el) {
      ko.html[el.getAttribute('data-i18n-html')] = el.innerHTML;
    });
    each('[data-i18n-attr]', function (el) {
      parseAttrSpec(el).forEach(function (pair) {
        ko.attr[pair.key] = el.getAttribute(pair.attr);
      });
    });
  }

  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  /** "placeholder:chat.placeholder|aria-label:chat.send" → [{attr, key}, …] */
  function parseAttrSpec(el) {
    return el
      .getAttribute('data-i18n-attr')
      .split('|')
      .map(function (part) {
        var i = part.indexOf(':');
        return { attr: part.slice(0, i).trim(), key: part.slice(i + 1).trim() };
      })
      .filter(function (pair) {
        return pair.attr && pair.key;
      });
  }

  /* ----------------------------------------------------------
     Applying a language
     ---------------------------------------------------------- */
  function lookup(lang, kind, key) {
    // What the markup said always wins for Korean; DICT.ko only fills the gaps
    // for strings that never appear in the DOM.
    if (lang === 'ko' && ko[kind][key] !== undefined) return ko[kind][key];
    var dict = DICT[lang];
    return dict ? dict[key] : undefined;
  }

  function apply(lang) {
    var desc = document.querySelector('meta[name="description"]');
    var title = lookup(lang, 'text', 'meta.title');
    var description = lookup(lang, 'text', 'meta.description');
    if (title) document.title = title;
    if (desc && description) desc.setAttribute('content', description);

    each('[data-i18n]', function (el) {
      var value = lookup(lang, 'text', el.getAttribute('data-i18n'));
      if (value !== undefined) el.textContent = value;
    });

    each('[data-i18n-html]', function (el) {
      var value = lookup(lang, 'html', el.getAttribute('data-i18n-html'));
      if (value !== undefined) el.innerHTML = value;
    });

    each('[data-i18n-attr]', function (el) {
      parseAttrSpec(el).forEach(function (pair) {
        var value = lookup(lang, 'attr', pair.key);
        if (value !== undefined) el.setAttribute(pair.attr, value);
      });
    });

    root.lang = lang;
    root.setAttribute('data-lang', lang);

    each('[data-lang-set]', function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang-set') === lang));
    });
  }

  /* ----------------------------------------------------------
     Public surface — other scripts read strings through this
     ---------------------------------------------------------- */
  var current = FALLBACK_LANG;
  var listeners = [];

  var api = {
    get lang() {
      return current;
    },
    /** Localised string for a key; falls back to the Korean markup, then the key. */
    t: function (key) {
      var value = lookup(current, 'text', key);
      if (value === undefined) value = ko.text[key];
      if (value === undefined) value = ko.attr[key];
      return value === undefined ? key : value;
    },
    /** Runs fn now and again after every switch, so callers stay in sync. */
    onChange: function (fn) {
      listeners.push(fn);
      fn(current);
    },
    set: function (lang) {
      if (lang !== 'ko' && lang !== 'en') return;
      if (lang === current) return;
      current = lang;
      try {
        window.localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        /* private mode — the choice just will not persist */
      }
      apply(lang);
      listeners.forEach(function (fn) {
        fn(lang);
      });
    },
  };

  window.i18n = api;

  /* ----------------------------------------------------------
     Boot
     ---------------------------------------------------------- */
  function preferred() {
    var match = window.location.search.match(/[?&]lang=(en|ko)/);
    if (match) return match[1];
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'ko') return stored;
    } catch (e) {
      /* storage blocked — fall through to the browser's own preference */
    }
    return browserLang();
  }

  function init() {
    capture();
    current = preferred();
    apply(current);
    // The body was hidden by the inline head script to keep the swap off-screen.
    root.classList.remove('i18n-pending');

    each('[data-lang-set]', function (btn) {
      btn.addEventListener('click', function () {
        api.set(btn.getAttribute('data-lang-set'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
