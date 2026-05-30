const navLinks = document.querySelectorAll(".nav-links a");
const langButtons = document.querySelectorAll(".lang-button");

const translations = {
  ko: {
    navAbout: "소개",
    navSkills: "기술",
    navProjects: "프로젝트",
    navExperiences: "경험",
    navContact: "연락처",
    heroEyebrow: "Portfolio",
    heroTitle: "안녕하세요, 저는 <span>Ky</span>입니다.",
    heroText:
      "저를 소개하고, 제가 가진 기술과 프로젝트, 경험, 연락처를 정리한 개인 포트폴리오입니다.",
    viewProjects: "프로젝트 보기",
    contactMe: "연락하기",
    downloadResume: "이력서 다운로드",
    interestLabel: "현재 관심 분야",
    focusTitle: "Frontend Development",
    interestText: "HTML, CSS, JavaScript를 기반으로 인터랙티브한 웹사이트를 제작합니다.",
    aboutTitle: "나를 소개합니다",
    aboutTextOne:
      "저는 웹 개발을 배우고 성장해가는 개발자입니다. 작은 아이디어를 실제로 사용할 수 있는 화면과 기능으로 구현하는 과정에 큰 흥미를 느낍니다.",
    aboutTextTwo:
      "깔끔한 코드, 직관적인 디자인, 반응형 레이아웃을 중요하게 생각하며 꾸준히 프로젝트를 만들며 실력을 쌓고 있습니다.",
    skillsTitle: "사용할 수 있는 기술",
    projectsTitle: "만든 프로젝트",
    projectOneText: "나의 소개, 기술, 프로젝트를 보여주는 개인 포트폴리오 웹사이트입니다.",
    projectTwoText: "서비스나 제품을 소개하기 위한 반응형 랜딩 페이지 디자인 프로젝트입니다.",
    projectThreeText: "JavaScript를 활용해 사용자의 입력에 반응하는 간단한 웹 앱 프로젝트입니다.",
    projectDetail: "자세히 보기",
    projectContact: "문의하기",
    projectSkills: "사용 기술",
    experiencesTitle: "경험",
    experienceOneDate: "2026 - 현재",
    experienceOneTitle: "Portfolio Project",
    experienceOneText: "개인 포트폴리오 웹사이트를 직접 설계하고 HTML, CSS, JavaScript로 구현했습니다.",
    experienceTwoDate: "학습 과정",
    experienceTwoTitle: "Web Development Practice",
    experienceTwoText:
      "반응형 레이아웃, 웹 접근성, 사용자 중심 인터페이스를 공부하며 작은 프로젝트를 만들고 있습니다.",
    contactTitle: "함께 이야기해요",
    contactText: "프로젝트 제안, 협업, 질문이 있다면 아래 연락처로 편하게 연락해 주세요.",
    footerText: "© 2026 Ky. All rights reserved.",
  },
  en: {
    navAbout: "About",
    navSkills: "Skills",
    navProjects: "Projects",
    navExperiences: "Experience",
    navContact: "Contact",
    heroEyebrow: "Web Developer",
    heroTitle: "Hi, I'm <span>Ky</span>.",
    heroText:
      "I build clean, responsive websites and turn ideas into polished user experiences.",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    downloadResume: "Download Resume",
    interestLabel: "Current Focus",
    focusTitle: "Frontend Development",
    interestText: "I create interactive websites using HTML, CSS, and JavaScript.",
    aboutTitle: "About Me",
    aboutTextOne:
      "I am a web developer who enjoys turning simple ideas into useful screens and working features.",
    aboutTextTwo:
      "I care about clean code, intuitive design, and responsive layouts, and I keep improving through hands-on projects.",
    skillsTitle: "Skills I Use",
    projectsTitle: "Projects",
    projectOneText: "A personal portfolio website that introduces who I am, what I can do, and what I have built.",
    projectTwoText: "A responsive landing page designed to present a product or service clearly.",
    projectThreeText: "A simple JavaScript web app that responds to user input.",
    projectDetail: "View Details",
    projectContact: "Contact",
    projectSkills: "Skills Used",
    experiencesTitle: "Experience",
    experienceOneDate: "2026 - Present",
    experienceOneTitle: "Portfolio Project",
    experienceOneText: "Designed and built a personal portfolio website with HTML, CSS, and JavaScript.",
    experienceTwoDate: "Learning",
    experienceTwoTitle: "Web Development Practice",
    experienceTwoText:
      "Building small projects while learning responsive layouts, accessibility, and user-focused interfaces.",
    contactTitle: "Let's Talk",
    contactText: "For project ideas, collaboration, or questions, feel free to reach out through the links below.",
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
