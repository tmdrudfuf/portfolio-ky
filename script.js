const navLinks = document.querySelectorAll(".nav-links a");
const langButtons = document.querySelectorAll(".lang-button");

const translations = {
  ko: {
    navAbout: "소개",
    navProjects: "프로젝트",
    navContact: "연락처",
    heroTitle: "안녕하세요! 저는 <a href=\"#projects\">모바일 앱과 AI 도구</a>를 만드는 개발자 Ky입니다.",
    heroText: "직접 만든 Android 앱 세 개가 Google Play 비공개 테스트 중입니다.",
    downloadResume: "이력서 다운로드",
    aboutTitle: "나를 소개합니다",
    aboutTextOne:
      "BYU-Hawaii에서 컴퓨터공학을 전공하며 Accessifier에서 6명 규모의 원격 인턴 팀을 이끌었고, Android 앱의 UI 개선과 내부 테스트를 맡았습니다. 지금은 일상의 작은 불편을 앱으로 해결하는 데 집중하고 있습니다.",
    aboutTextTwo:
      "기능을 만드는 데서 끝내지 않고 실제와 비슷한 데이터로 테스트하고, 문제의 원인을 찾아 기록하는 과정을 중요하게 생각합니다. 한국어와 영어로 모두 일할 수 있어서, 만드는 앱도 두 언어를 함께 지원합니다.",
    skillsTitle: "사용하는 기술",
    projectsTitle: "만든 프로젝트",
    contactTitle: "함께 이야기해요",
    footerText: "© 2026 Ky. All rights reserved.",
  },
  en: {
    navAbout: "About",
    navProjects: "Projects",
    navContact: "Contact",
    heroTitle:
      "Hi! I’m Ky, a developer building <a href=\"#projects\">mobile apps &amp; AI tools</a> from idea to release.",
    heroText: "Three of my Android apps are in Google Play closed testing.",
    downloadResume: "Download Resume",
    aboutTitle: "About Me",
    aboutTextOne:
      "While studying Computer Science at BYU-Hawaii, I led a remote team of 6 interns at Accessifier, refining an Android app's UI and running internal testing. Now I focus on solving small everyday problems with apps.",
    aboutTextTwo:
      "I don't stop at shipping a feature: I test with realistic data, trace problems to their cause, and write them down. I work fluently in English and Korean, and my apps support both.",
    skillsTitle: "Tools I use",
    projectsTitle: "Projects",
    contactTitle: "Let's Talk",
    footerText: "© 2026 Ky. All rights reserved.",
  },
};

function setLanguage(language) {
  const dictionary = translations[language];

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.dataset.i18nHtml;
    element.innerHTML = dictionary[key];
  });

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === language);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

// Scroll reveal: elements fade in each time they enter the viewport and reset when they leave,
// so the motion replays when scrolling back up or down. Without IntersectionObserver nothing is hidden.
const revealTargets = document.querySelectorAll(
  ".hero > :not(.scroll-cue), .section h2:not(.visually-hidden), .project, .prose, .skills"
);
let revealObserver = null;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Numbers marked data-count (the ADOS stats) count up from 0 each time they come into view.
function countUp(element) {
  if (reduceMotion.matches) return;
  const target = Number(element.dataset.count);
  const start = performance.now();
  element.countRun = start;
  function tick(now) {
    if (element.countRun !== start) return;
    const progress = Math.min((now - start) / 1400, 1);
    element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target;
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          element.querySelectorAll("[data-count]").forEach(countUp);
        } else {
          element.classList.remove("is-visible");
          element.dataset.from = entry.boundingClientRect.top < 0 ? "top" : "bottom";
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  revealTargets.forEach((element) => element.classList.add("reveal"));
}

function startReveal() {
  if (revealObserver) revealTargets.forEach((element) => revealObserver.observe(element));
}

// Phone screenshots rise one after another; count per language since the other set is hidden.
document.querySelectorAll(".media-phone").forEach((figure) => {
  ["ko", "en"].forEach((language) => {
    figure.querySelectorAll(`img[lang="${language}"]`).forEach((image, index) => {
      image.style.setProperty("--i", index);
    });
  });
});

// Cover: lifts like a curtain on click, scroll, swipe, or key press, then removes itself.
// The reveal starts as it lifts, so the hero animates in instead of finishing behind the cover.
// The gesture that dismisses the cover must not also scroll the page: a swipe or trackpad flick
// keeps sending momentum for a second or two, which used to land visitors halfway down. So
// scrolling stays blocked until the curtain is gone and that input has gone quiet, and the page is
// then put back at the top.
const root = document.documentElement;
const cover = document.querySelector(".cover");
const pageParts = document.querySelectorAll(".site-header, main, .footer");
const coverKeys = ["ArrowDown", "PageDown", "Escape", " ", "Enter"];
const coverEvents = new AbortController();
let curtainDone = false;
let touching = false;
let quietTimer = 0;

function unlockScroll() {
  if (coverEvents.signal.aborted) return;
  coverEvents.abort();
  clearTimeout(quietTimer);
  root.classList.remove("cover-lifting");
  window.scrollTo({ top: 0, behavior: "instant" });
}

// Unlock 250ms after the last wheel or touch input, once no finger is down.
function unlockWhenQuiet() {
  if (!curtainDone || touching) return;
  clearTimeout(quietTimer);
  quietTimer = setTimeout(unlockScroll, 250);
}

function finishCurtain() {
  if (curtainDone) return;
  curtainDone = true;
  cover.remove();
  unlockWhenQuiet();
  setTimeout(unlockScroll, 3000); // a gesture that never stops can't hold the page forever
}

function enterSite() {
  if (!root.classList.contains("show-cover")) return;
  cover.classList.add("is-leaving");
  root.classList.add("cover-lifting");
  root.classList.remove("show-cover");
  pageParts.forEach((part) => (part.inert = false));
  try {
    sessionStorage.setItem("coverSeen", "1");
  } catch (error) {}
  startReveal();
  cover.addEventListener("transitionend", finishCurtain, { once: true });
  setTimeout(finishCurtain, 1500);
}

if (root.classList.contains("show-cover")) {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  pageParts.forEach((part) => (part.inert = true));
  const blocking = { passive: false, signal: coverEvents.signal };
  const watching = { passive: true, signal: coverEvents.signal };
  cover.querySelector(".cover-enter").addEventListener("click", enterSite, watching);
  window.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      if (event.deltaY > 0) enterSite();
      unlockWhenQuiet();
    },
    blocking
  );
  window.addEventListener("touchstart", () => (touching = true), watching);
  window.addEventListener(
    "touchmove",
    (event) => {
      event.preventDefault();
      enterSite();
    },
    blocking
  );
  ["touchend", "touchcancel"].forEach((type) =>
    window.addEventListener(
      type,
      () => {
        touching = false;
        unlockWhenQuiet();
      },
      watching
    )
  );
  window.addEventListener(
    "keydown",
    (event) => {
      if (!coverKeys.includes(event.key)) return;
      event.preventDefault();
      enterSite();
      unlockWhenQuiet();
    },
    blocking
  );
} else {
  cover.remove();
  startReveal();
}
