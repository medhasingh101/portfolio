const PROJECTS = [
  {
    id: 1,
    title: "Checkout Redesign",
    subtitle: "Fintech / 2024",
    desc: "End-to-end redesign of a fintech checkout flow serving 2M users. Reduced drop-off by 34% through progressive disclosure and trust signals.",
    tags: ["UX Design", "Research"],
    color: "#edeae4",
    full: {
      overview:
        "A complete overhaul of a checkout experience serving 2M+ users. The goal was to reduce cognitive load and increase trust at the most critical moment of conversion.",
      role: "Lead UX Designer",
      duration: "4 months",
      outcome: "34% drop-off reduction / +18% conversion / 4.6 stars",
      sections: [
        {
          heading: "The Problem",
          body: "Users were abandoning carts at the payment step due to overwhelming form density, unclear error states, and lack of trust signals at the point of commitment.",
        },
        {
          heading: "Research",
          body: "Conducted 12 user interviews, session recordings (n=800), and a competitive audit of 8 fintech products. Key insight: users needed progress certainty throughout, not just at the end.",
        },
        {
          heading: "Solution",
          body: "Progressive disclosure flow broke one dense screen into three lightweight steps. Introduced inline validation and contextually placed trust badges.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Design System",
    subtitle: "SaaS / 2023",
    desc: "Built a scalable component library from scratch for a B2B SaaS product. Cut design-to-dev handoff time by 60%.",
    tags: ["UX Design", "Graphic Design"],
    color: "#e4ede9",
    full: {
      overview:
        "A comprehensive design system for a B2B SaaS product, from token architecture to a full component library and docs site.",
      role: "Design Systems Lead",
      duration: "6 months",
      outcome: "60% faster handoff / 3 teams aligned / 200+ components",
      sections: [
        {
          heading: "The Problem",
          body: "Three product teams were working from diverging Figma files, creating inconsistent UIs and expensive rework in engineering.",
        },
        {
          heading: "Process",
          body: "Audited six months of shipped product. Identified 47 component variants to consolidate. Built tokens first, then components, then documentation.",
        },
        {
          heading: "Outcome",
          body: "System adopted across all three teams within two months. New feature design time dropped from about five days to about two days per screen.",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Health App 0-1",
    subtitle: "Mobile / 2023",
    desc: "Led product design for a health-tracking app from concept to App Store launch. 4.8-star rating, featured by Apple.",
    tags: ["UX Design"],
    color: "#ebe4ed",
    full: {
      overview:
        "A greenfield mobile product for a health-tech startup, from zero to App Store in five months.",
      role: "Solo Product Designer",
      duration: "5 months",
      outcome: "4.8-star App Store / 12k downloads month 1 / Featured by Apple",
      sections: [
        {
          heading: "Discovery",
          body: "Ran a two-week discovery sprint, eight user interviews, and competitive benchmarking across 12 health apps. Defined three core user archetypes.",
        },
        {
          heading: "Design",
          body: "Built the full information architecture, interaction model, and visual identity. Shipped four rounds of usability testing.",
        },
        {
          heading: "Launch",
          body: "Worked in two-week sprints with two engineers. Shipped MVP in five months. Apple featured it in 'New Apps We Love.'",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Brand Identity",
    subtitle: "Branding / 2024",
    desc: "Full visual identity for a DTC food brand: logo, type, packaging, and guidelines. Launched across four markets.",
    tags: ["Graphic Design"],
    color: "#ede9e0",
    full: {
      overview:
        "End-to-end brand identity for a direct-to-consumer food startup entering a crowded market.",
      role: "Brand Designer",
      duration: "3 months",
      outcome: "4 markets / 2 packaging awards / 3x social engagement",
      sections: [
        {
          heading: "Strategy",
          body: "Positioned the brand at the intersection of craft food and modern minimalism, targeting urban professionals who cook for pleasure.",
        },
        {
          heading: "Visual Identity",
          body: "Developed the wordmark, icon system, color palette, and typographic hierarchy. Everything was tested across digital and physical touchpoints.",
        },
        {
          heading: "Packaging",
          body: "Applied the identity across six SKUs. Won a regional packaging design award. Instagram grew to 40k followers in three months organically.",
        },
      ],
    },
  },
  {
    id: 5,
    title: "Motion Rebrand",
    subtitle: "Motion / 2024",
    desc: "Animated brand system for a web3 gaming community: logo reveals, UI transitions, and social content.",
    tags: ["Graphic Design"],
    color: "#e0e4ed",
    full: {
      overview: "Motion-first rebrand for a web3 gaming community with 80k members.",
      role: "Motion & Brand Designer",
      duration: "2 months",
      outcome: "12 channels updated / 4x engagement vs static",
      sections: [
        {
          heading: "Brief",
          body: "The community had outgrown its rough brand. They needed something premium and native to the crypto and gaming aesthetic without being cliche.",
        },
        {
          heading: "Motion System",
          body: "Designed a kinetic logo reveal with three variants, UI motion principles, and a 30-piece animated social template library.",
        },
        {
          heading: "Results",
          body: "All 12 channels updated within a week. Animated posts averaged four times the engagement of previous static content.",
        },
      ],
    },
  },
];

const INITIAL_SKILLS = [
  { id: "s1", label: "UX Research", px: 9, py: 18, subs: ["User Interviews", "Surveys", "Usability Tests", "Affinity Maps"] },
  { id: "s2", label: "Interaction Design", px: 38, py: 10, subs: ["Flows", "Wireframes", "Micro-interactions", "IA"] },
  { id: "s3", label: "Prototyping", px: 68, py: 20, subs: ["Figma", "Lo-fi", "Hi-fi", "Click-through"] },
  { id: "s4", label: "Design Systems", px: 20, py: 50, subs: ["Tokens", "Components", "Docs", "Figma Vars"] },
  { id: "s5", label: "Brand Identity", px: 50, py: 45, subs: ["Logo", "Typography", "Colour", "Guidelines"] },
  { id: "s6", label: "Motion Design", px: 75, py: 55, subs: ["After Effects", "Lottie", "CSS Anim", "Storyboarding"] },
  { id: "s7", label: "Front-end", px: 35, py: 78, subs: ["React", "HTML/CSS", "Framer", "Webflow"] },
];

const DARK_CARD_COLORS = {
  "#edeae4": "#1e1c18",
  "#e4ede9": "#161e1b",
  "#ebe4ed": "#1c1620",
  "#ede9e0": "#1e1b12",
  "#e0e4ed": "#12161e",
};

const CONTACT_LINKS = [
  ["Email", "hello@yourname.com", "mailto:hello@yourname.com"],
  ["LinkedIn", "linkedin.com/in/yourname", "https://linkedin.com"],
  ["Read.cv", "read.cv/yourname", "https://read.cv"],
  ["Resume", "Download PDF", "#"],
];

const BIO_INTRO_ITEMS = [
  { type: "text", value: "I design products with roots in" },
  {
    type: "chip",
    id: "systems",
    label: "design systems",
    detail: "building resilient UI foundations that help teams move faster without sacrificing clarity.",
  },
  { type: "text", value: "and a practice shaped by" },
  {
    type: "chip",
    id: "research",
    label: "user research",
    detail: "turning interviews, testing, and observation into sharper product decisions.",
  },
  { type: "text", value: "with a love for" },
  {
    type: "chip",
    id: "motion",
    label: "motion design",
    detail: "using movement to guide attention, explain hierarchy, and make interfaces feel alive.",
  },
  { type: "text", value: "across digital experiences." },
];

const state = {
  page: "home",
  activeProjectId: null,
  projectReturnPage: "home",
  contactOpen: false,
  dark: false,
  workMenuOpen: false,
  activeBioChipId: null,
  bioTypedText: "",
  skills: INITIAL_SKILLS.map((skill) => ({ ...skill, subs: [...skill.subs] })),
};

const app = document.getElementById("app");
let dragState = null;
let typeRevealObserver = null;
let bioTypeTimer = null;
let dynaspot = null;
let dynaspotMediaQuery = null;
let stackPanelsInitialized = false;
const STACK_TOP_OFFSET = 104;
const STACK_PANEL_GAP = 24;
const STACK_MIN_REVEAL_DISTANCE = 220;
const STACK_REVEAL_RATIO = 0.42;
const STACK_ZOOM_OUT = 0.03;
const STACK_ELEVATED_SHADOW = "0 22px 48px rgba(15, 23, 42, 0.16)";
const dynaspotState = {
  enabled: false,
  visible: false,
  hovering: false,
  pressed: false,
  x: 0,
  y: 0,
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setState(nextState) {
  Object.assign(state, nextState);
  render();
}

function scrollToAboutSection() {
  const elements = getStackElements();
  const { sequence, sticky, workScroll } = elements;

  if (!sequence || !sticky || !workScroll) return;

  const { topOffset } = getStackMetrics(sequence);
  const revealDistance = Math.max(STACK_MIN_REVEAL_DISTANCE, Math.round(window.innerHeight * STACK_REVEAL_RATIO));
  const workScrollDistance = Math.max(0, workScroll.scrollHeight - workScroll.clientHeight);
  const targetTop = sequence.offsetTop + workScrollDistance + revealDistance * 2 - topOffset;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth",
  });
}

function getActiveProject() {
  return PROJECTS.find((project) => project.id === state.activeProjectId) ?? null;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cardBackground(project) {
  return state.dark ? DARK_CARD_COLORS[project.color] || "#181614" : project.color;
}

function sectionHeader(index, title) {
  return `
    <div class="section-header">
      <span class="section-header-index">${escapeHtml(index)}</span>
      <span class="section-header-title">${escapeHtml(title)}</span>
    </div>
  `;
}

function typeReveal(text, tag, className, delay) {
  const words = text
    .split(" ")
    .map((word, wordIndex) => {
      const chars = word
        .split("")
        .map((char, charIndex) => {
          const index = word
            .split("")
            .slice(0, charIndex)
            .length;
          return `<span class="type-reveal-char" data-char>${escapeHtml(char)}</span>`;
        })
        .join("");

      return `<span class="type-reveal-word">${chars}</span>`;
    })
    .join("");

  return `<${tag} class="${className} type-reveal" data-type-reveal data-delay="${delay}">${words}</${tag}>`;
}

function projectCard(project) {
  return `
    <article class="project-card" data-hover data-project-id="${project.id}" style="background:${cardBackground(project)}">
      <div class="project-card-tags">
        ${project.tags.map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}
      </div>
      <div class="project-card-preview">
        <span class="label-inline">Preview</span>
      </div>
      <p class="eyebrow project-card-subtitle">${escapeHtml(project.subtitle)}</p>
      <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
      <p class="project-card-copy">${escapeHtml(project.desc)}</p>
      <div class="project-card-link">
        <span class="project-card-link-text">View case study</span>
        <span class="project-card-link-arrow">-&gt;</span>
      </div>
    </article>
  `;
}

function renderSkillNode(skill) {
  const subs = skill.subs
    .map((sub, index) => {
      const angle = (index / skill.subs.length) * 2 * Math.PI - Math.PI / 2;
      const tx = `${Math.cos(angle) * 126}px`;
      const ty = `${Math.sin(angle) * 88}px`;
      const delay = `${index * 36}ms`;
      const opacityDelay = `${index * 24}ms`;

      return `
        <div class="skill-node-sub" style="--tx:${tx}; --ty:${ty}; --sub-delay:${delay}; --sub-opacity-delay:${opacityDelay}">
          ${escapeHtml(sub)}
        </div>
      `;
    })
    .join("");

  return `
    <div class="skill-node" style="left:${skill.px}%; top:${skill.py}%;" data-skill-id="${skill.id}">
      ${subs}
      <button type="button" class="skill-node-chip" data-hover data-skill-handle="${skill.id}">
        ${escapeHtml(skill.label)}
      </button>
    </div>
  `;
}

function renderBioIntroItem(item) {
  if (item.type === "text") {
    return `<span class="bio-intro-copy">${escapeHtml(item.value)}</span>`;
  }

  const isActive = state.activeBioChipId === item.id;
  const detail = isActive ? ` ${state.bioTypedText}` : "";

  return `
    <span class="bio-chip-group ${isActive ? "is-active" : ""}">
      <button
        type="button"
        class="bio-chip ${isActive ? "is-active" : ""}"
        data-hover
        data-bio-chip="${item.id}"
      >
        <span class="bio-chip-label">${escapeHtml(item.label)}</span>
      </button>
      <span class="bio-chip-detail ${isActive ? "is-visible" : ""}">${escapeHtml(detail)}</span>
    </span>
  `;
}

function renderBioIntro() {
  return BIO_INTRO_ITEMS.map(renderBioIntroItem).join(" ");
}

function renderHomePage() {
  return `
    <div>
      <section class="hero">
        <div class="hero-glow"></div>
        <div class="hero-main">
          <div class="hero-copy">
            <p class="eyebrow hero-label">Product Designer / Based in [City]</p>
            ${typeReveal("Medha Singh", "h1", "hero-title", 300)}
            <div class="bio-intro" aria-label="Designer bio highlights">
              <p class="bio-intro-line">
                ${renderBioIntro()}
              </p>
            </div>
          </div>
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="hero-stat-value">5+</div>
              <div class="hero-stat-label">Years</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-value">20+</div>
              <div class="hero-stat-label">Projects</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-value">3</div>
              <div class="hero-stat-label">Industries</div>
            </div>
          </div>
        </div>
        <div class="hero-scroll">
          <span class="hero-scroll-label">scroll</span>
        </div>
      </section>

      <section class="stack-sequence" data-stack-sequence>
        <div class="stack-sticky" data-stack-sticky>
          <div class="content-section stack-panel stack-panel-work" data-stack-panel="work">
            ${sectionHeader("01", "Selected Work")}
            <div class="stack-panel-body stack-panel-body-scroll" data-stack-scroll>
              <div class="project-grid">
                ${PROJECTS.map(projectCard).join("")}
              </div>
            </div>
          </div>

          <div class="content-section content-section-skills stack-panel stack-panel-skills" data-stack-panel="skills">
            ${sectionHeader("02", "Skills")}
            <div class="stack-panel-body">
              <div class="skills-canvas" data-skills-canvas>
                <p class="skills-canvas-note">hover to explore / drag to rearrange</p>
                ${state.skills.map(renderSkillNode).join("")}
              </div>
            </div>
          </div>

          <div id="about-section" class="content-section stack-panel stack-panel-about" data-stack-panel="about">
            ${sectionHeader("03", "About")}
            <div class="stack-panel-body">
              <div class="about-grid">
                <div class="about-photo">
                  <span class="label-inline">Photo</span>
                </div>
                <div>
                  ${typeReveal("I design with clarity and intention", "h2", "about-title", 80)}
                  <p class="about-copy about-copy-spaced">
                    Hi, I'm Medha Singh, a product designer with 5+ years working across fintech, health, and SaaS. I believe great design lives at the intersection of deep user empathy and sharp business thinking.
                  </p>
                  <p class="about-copy">
                    I'm most at home in the messy middle, turning fuzzy problems into clear, elegant solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderWorkPage(filter, label) {
  const filtered = PROJECTS.filter((project) => project.tags.includes(filter));

  return `
    <section class="page-shell">
      <div class="page-header">
        <p class="eyebrow page-header-breadcrumb">Work /</p>
        <h1 class="page-title">${escapeHtml(label)}</h1>
      </div>
      <div class="project-grid">
        ${filtered.map(projectCard).join("")}
      </div>
    </section>
  `;
}

function renderProjectPage(project) {
  const detailSections = [
    { id: "overview", label: "Overview" },
    ...project.full.sections.map((section) => ({
      id: slugify(section.heading),
      label: section.heading,
    })),
  ];

  return `
    <div class="project-detail page-shell page-shell-narrow">
      <div class="detail-layout">
        <aside class="detail-sidebar">
          <button type="button" class="button-ghost detail-back" data-hover data-nav-back>&lt;- Back</button>
          <nav class="detail-toc" aria-label="Case study sections">
            ${detailSections
              .map(
                (section) => `
                  <a href="#${escapeHtml(section.id)}" class="detail-toc-link">${escapeHtml(section.label)}</a>
                `
              )
              .join("")}
          </nav>
        </aside>

        <div class="detail-main">
          <div class="detail-tags">
            ${project.tags.map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}
          </div>

          <header class="detail-hero">
            <p class="eyebrow detail-subtitle">${escapeHtml(project.subtitle)}</p>
            <h1 class="detail-title">${escapeHtml(project.title)}</h1>
            <p class="detail-overview">${escapeHtml(project.full.overview)}</p>
          </header>

          <div class="detail-meta-grid">
            <div>
              <p class="label-inline detail-meta-label">Role</p>
              <p class="detail-meta-value">${escapeHtml(project.full.role)}</p>
            </div>
            <div>
              <p class="label-inline detail-meta-label">Duration</p>
              <p class="detail-meta-value">${escapeHtml(project.full.duration)}</p>
            </div>
            <div>
              <p class="label-inline detail-meta-label">Outcome</p>
              <p class="detail-meta-value">${escapeHtml(project.full.outcome)}</p>
            </div>
          </div>

          <div class="detail-cover">
            <span class="label-inline">Cover Image</span>
          </div>

          <section id="overview" class="detail-section detail-section-editorial">
            <h2 class="detail-section-title">Overview</h2>
            <p class="detail-section-copy">
              ${escapeHtml(project.full.overview)}
            </p>
          </section>

          ${project.full.sections
            .map(
              (section) => `
                <section id="${escapeHtml(slugify(section.heading))}" class="detail-section detail-section-editorial">
                  <h2 class="detail-section-title">${escapeHtml(section.heading)}</h2>
                  <p class="detail-section-copy">${escapeHtml(section.body)}</p>
                </section>
              `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function renderContactModal() {
  if (!state.contactOpen) return "";

  return `
    <div class="contact-modal-backdrop" data-contact-backdrop>
      <div class="contact-modal">
        <button type="button" class="contact-modal-close" data-hover data-contact-close>X</button>
        <p class="label-inline contact-modal-label">Get in touch</p>
        <h2 class="contact-modal-title">Let's make something <em>together.</em></h2>
        ${CONTACT_LINKS.map(
          ([label, value, href]) => `
            <a href="${escapeHtml(href)}" class="contact-link" data-hover>
              <span class="contact-link-label">${escapeHtml(label)}</span>
              <span>${escapeHtml(value)} -&gt;</span>
            </a>
          `
        ).join("")}
      </div>
    </div>
  `;
}

function renderMain() {
  if (state.page === "ux") return renderWorkPage("UX Design", "UX Design");
  if (state.page === "graphic") return renderWorkPage("Graphic Design", "Graphic Design");
  if (state.page === "project" && getActiveProject()) return renderProjectPage(getActiveProject());
  return renderHomePage();
}

function renderNav() {
  return `
    <nav class="site-nav">
      <button type="button" class="nav-button" data-hover data-nav-home>Medha Singh</button>
      <div class="site-nav-links">
        <div class="nav-dropdown-wrap ${state.workMenuOpen ? "is-open" : ""}" data-work-wrap>
          <button type="button" class="nav-button" data-hover data-work-toggle aria-expanded="${state.workMenuOpen ? "true" : "false"}">Work v</button>
          <div class="nav-dropdown">
            <button type="button" class="nav-dropdown-button nav-dropdown-button-bordered" data-hover data-nav-page="ux">UX Design</button>
            <button type="button" class="nav-dropdown-button" data-hover data-nav-page="graphic">Graphic Design</button>
          </div>
        </div>
        <button type="button" class="nav-button" data-hover data-nav-about>About</button>
        <button type="button" class="nav-button" data-hover data-contact-open>Contact</button>
        <div class="nav-socials" aria-label="Social links">
          <a href="https://linkedin.com/in/yourname" class="nav-social-link" data-hover aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" class="nav-social-svg" focusable="false">
              <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2 2 0 1 0 5.3 7a2 2 0 0 0-.05-4ZM20 20h-3.37v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.22V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z" />
            </svg>
          </a>
          <a href="https://www.behance.net/yourname" class="nav-social-link" data-hover aria-label="Behance">
            <svg viewBox="0 0 24 24" class="nav-social-svg" focusable="false">
              <path d="M3.5 6.5H9c2.2 0 3.75 1.1 3.75 3.05 0 1.2-.56 2.1-1.62 2.58 1.42.38 2.18 1.54 2.18 3.05 0 2.44-2.07 3.52-4.25 3.52H3.5V6.5Zm2.7 4.92h2.4c.84 0 1.46-.38 1.46-1.3 0-1.04-.8-1.26-1.67-1.26H6.2v2.56Zm0 5h2.53c.93 0 1.74-.3 1.74-1.42 0-1.1-.7-1.54-1.72-1.54H6.2v2.96Zm9.72-5.8h4.58v1.35h-4.58v-1.35Zm4.66 4.56c-.24 2.34-2.15 3.82-4.48 3.82-3.34 0-4.92-2.3-5.02-5.5 0-3.14 2.06-5.44 4.92-5.44 3.7 0 4.84 3.46 4.66 5.98h-6.7c-.08 1.56.84 2.62 2.22 2.62.95 0 1.72-.46 1.94-1.48h2.46Zm-2.56-2.9c-.08-1.24-.95-2.24-2.16-2.24-1.28 0-2.04.96-2.12 2.24h4.28Z" />
            </svg>
          </a>
        </div>
        <button type="button" class="theme-toggle" data-hover data-theme-toggle title="${state.dark ? "Switch to light mode" : "Switch to dark mode"}">
          <span class="theme-toggle-icon" aria-hidden="true">
            ${state.dark
              ? `
                <svg viewBox="0 0 24 24" class="theme-toggle-svg" focusable="false">
                  <path d="M12 4.75V2.5M12 21.5v-2.25M6.88 6.88 5.3 5.3M18.7 18.7l-1.58-1.58M4.75 12H2.5M21.5 12h-2.25M6.88 17.12 5.3 18.7M18.7 5.3l-1.58 1.58M12 16.25A4.25 4.25 0 1 0 12 7.75a4.25 4.25 0 0 0 0 8.5Z" />
                </svg>
              `
              : `
                <svg viewBox="0 0 24 24" class="theme-toggle-svg" focusable="false">
                  <path d="M20.2 14.85A8.75 8.75 0 0 1 9.15 3.8a8.75 8.75 0 1 0 11.05 11.05Z" />
                </svg>
              `}
          </span>
          <span class="theme-toggle-label sr-only">${state.dark ? "Light mode" : "Dark mode"}</span>
        </button>
      </div>
    </nav>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <p class="site-footer-copy">(c) 2026 Medha Singh</p>
      <p class="site-footer-copy">Designed & coded with intention</p>
    </footer>
  `;
}

function buildAppMarkup() {
  return `
    <div class="app-shell ${state.dark ? "theme-dark" : "theme-light"}">
      ${renderNav()}
      <main>${renderMain()}</main>
      ${renderFooter()}
      ${renderContactModal()}
      <div class="dynaspot" data-dynaspot aria-hidden="true">
        <div class="dynaspot-ring"></div>
        <div class="dynaspot-dot"></div>
      </div>
    </div>
  `;
}

function handleProjectOpen(projectId) {
  state.activeProjectId = Number(projectId);
  state.projectReturnPage = state.page === "ux" || state.page === "graphic" ? state.page : "home";
  state.page = "project";
  state.contactOpen = false;
  render();
  window.scrollTo(0, 0);
}

function handlePageChange(page) {
  state.page = page;
  state.activeProjectId = null;
  state.contactOpen = false;
  state.workMenuOpen = false;
  clearBioTypeTimer();
  state.activeBioChipId = null;
  state.bioTypedText = "";
  render();
  window.scrollTo(0, 0);
}

function clearBioTypeTimer() {
  if (bioTypeTimer) {
    window.clearInterval(bioTypeTimer);
    bioTypeTimer = null;
  }
}

function syncBioDetailText() {
  const activeDetail = document.querySelector(".bio-chip-detail.is-visible");
  if (activeDetail) {
    activeDetail.textContent = state.bioTypedText ? ` ${state.bioTypedText}` : "";
  }
}

function setBioTypedText(text) {
  state.bioTypedText = text;
  syncBioDetailText();
}

function collapseBioChip() {
  if (!state.activeBioChipId) return;
  clearBioTypeTimer();
  setState({ activeBioChipId: null, bioTypedText: "" });
}

function startBioTypewriter(chip) {
  clearBioTypeTimer();
  let index = 0;

  bioTypeTimer = window.setInterval(() => {
    index += 1;

    if (index >= chip.detail.length) {
      clearBioTypeTimer();
      setBioTypedText(chip.detail);
      return;
    }

    setBioTypedText(chip.detail.slice(0, index));
  }, 16);
}

function toggleBioChip(chipId) {
  if (state.activeBioChipId === chipId) {
    collapseBioChip();
    return;
  }

  const chip = BIO_INTRO_ITEMS.find((item) => item.type === "chip" && item.id === chipId);
  if (!chip) return;

  clearBioTypeTimer();
  state.activeBioChipId = chipId;
  state.bioTypedText = "";
  render();
  startBioTypewriter(chip);
}

function attachEvents() {
  document.querySelectorAll("[data-project-id]").forEach((card) => {
    card.addEventListener("click", () => handleProjectOpen(card.dataset.projectId));
  });

  document.querySelectorAll("[data-nav-page]").forEach((button) => {
    button.addEventListener("click", () => handlePageChange(button.dataset.navPage));
  });

  document.querySelectorAll("[data-bio-chip]").forEach((chip) => {
    chip.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleBioChip(chip.dataset.bioChip);
    });
  });

  const workToggle = document.querySelector("[data-work-toggle]");
  if (workToggle) {
    workToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setState({ workMenuOpen: !state.workMenuOpen });
    });
  }

  document.querySelectorAll("[data-nav-home]").forEach((button) => {
    button.addEventListener("click", () => handlePageChange("home"));
  });

  document.querySelectorAll("[data-nav-back]").forEach((button) => {
    button.addEventListener("click", () => handlePageChange(state.projectReturnPage || "home"));
  });

  const aboutButton = document.querySelector("[data-nav-about]");
  if (aboutButton) {
    aboutButton.addEventListener("click", () => {
      if (state.page !== "home") {
        handlePageChange("home");
        requestAnimationFrame(() => {
          scrollToAboutSection();
        });
      } else {
        scrollToAboutSection();
      }
    });
  }

  const contactOpen = document.querySelector("[data-contact-open]");
  if (contactOpen) {
    contactOpen.addEventListener("click", () => setState({ contactOpen: true }));
  }

  const contactClose = document.querySelector("[data-contact-close]");
  if (contactClose) {
    contactClose.addEventListener("click", () => setState({ contactOpen: false }));
  }

  const contactBackdrop = document.querySelector("[data-contact-backdrop]");
  if (contactBackdrop) {
    contactBackdrop.addEventListener("click", (event) => {
      if (event.target === contactBackdrop) {
        setState({ contactOpen: false });
      }
    });
  }

  const themeToggle = document.querySelector("[data-theme-toggle]");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => setState({ dark: !state.dark }));
  }

  const skillsCanvas = document.querySelector("[data-skills-canvas]");
  if (skillsCanvas) {
    document.querySelectorAll("[data-skill-handle]").forEach((handle) => {
      handle.addEventListener("mousedown", (event) => {
        event.preventDefault();
        const rect = skillsCanvas.getBoundingClientRect();
        const skill = state.skills.find((item) => item.id === handle.dataset.skillHandle);
        dragState = {
          id: skill.id,
          startMouseX: event.clientX,
          startMouseY: event.clientY,
          startPx: skill.px,
          startPy: skill.py,
          width: rect.width,
          height: rect.height,
        };
      });
    });
  }

  initializeTypeReveal();
  initializeDynaspot();
  initializeStackPanels();
}

function initializeTypeReveal() {
  if (typeRevealObserver) {
    typeRevealObserver.disconnect();
  }

  typeRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const baseDelay = Number(element.dataset.delay || 0);
        element.classList.add("is-on");

        element.querySelectorAll(".type-reveal-char").forEach((char, index) => {
          char.style.transform = "translateY(108%)";
          char.style.opacity = "0";
          char.style.transition = `transform 0.72s cubic-bezier(.16,1,.3,1) ${baseDelay + index * 22}ms, opacity 0.45s ease ${baseDelay + index * 22}ms`;
        });

        requestAnimationFrame(() => {
          element.querySelectorAll(".type-reveal-char").forEach((char) => {
            char.style.transform = "translateY(0)";
            char.style.opacity = "1";
          });
        });

        typeRevealObserver.unobserve(element);
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll("[data-type-reveal]").forEach((element) => {
    typeRevealObserver.observe(element);
  });
}

function syncDynaspot() {
  if (!dynaspot) return;

  dynaspot.hidden = !dynaspotState.enabled;
  dynaspot.classList.toggle("is-visible", dynaspotState.enabled && dynaspotState.visible);
  dynaspot.classList.toggle("is-hovering", dynaspotState.hovering);
  dynaspot.classList.toggle("is-pressed", dynaspotState.pressed);
  dynaspot.style.transform = `translate(${dynaspotState.x - 8}px, ${dynaspotState.y - 8}px)`;
}

function setDynaspotEnabled(enabled) {
  dynaspotState.enabled = enabled;
  if (!enabled) {
    dynaspotState.visible = false;
    dynaspotState.hovering = false;
    dynaspotState.pressed = false;
  }
  syncDynaspot();
}

function initializeDynaspot() {
  dynaspot = document.querySelector("[data-dynaspot]");
  if (!dynaspotMediaQuery) {
    dynaspotMediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleChange = (event) => setDynaspotEnabled(event.matches);
    if (typeof dynaspotMediaQuery.addEventListener === "function") {
      dynaspotMediaQuery.addEventListener("change", handleChange);
    } else {
      dynaspotMediaQuery.addListener(handleChange);
    }
  }

  setDynaspotEnabled(dynaspotMediaQuery.matches);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getStackElements() {
  return {
    sequence: document.querySelector("[data-stack-sequence]"),
    sticky: document.querySelector("[data-stack-sticky]"),
    workScroll: document.querySelector("[data-stack-scroll]"),
    workPanel: document.querySelector('[data-stack-panel="work"]'),
    skillsPanel: document.querySelector('[data-stack-panel="skills"]'),
    aboutPanel: document.querySelector('[data-stack-panel="about"]'),
  };
}

function getStackMetrics(sequence) {
  const styles = window.getComputedStyle(sequence);
  const topOffset = Number.parseFloat(styles.getPropertyValue("--stack-top")) || STACK_TOP_OFFSET;
  const panelGap = Number.parseFloat(styles.getPropertyValue("--stack-panel-gap")) || STACK_PANEL_GAP;
  return { topOffset, panelGap };
}

function resetStackPanels(elements) {
  if (elements.sequence) {
    elements.sequence.style.minHeight = "";
  }
  if (elements.workScroll) {
    elements.workScroll.scrollTop = 0;
  }

  [elements.workPanel, elements.skillsPanel, elements.aboutPanel].forEach((panel) => {
    if (!panel) return;
    panel.style.transform = "";
    panel.style.boxShadow = "";
  });
}

function syncStackPanels() {
  const elements = getStackElements();
  const { sequence, sticky, workScroll, workPanel, skillsPanel, aboutPanel } = elements;

  if (!sequence || !sticky || !workScroll || !workPanel || !skillsPanel || !aboutPanel) {
    resetStackPanels(elements);
    return;
  }

  const { topOffset, panelGap } = getStackMetrics(sequence);
  const revealDistance = Math.max(STACK_MIN_REVEAL_DISTANCE, Math.round(window.innerHeight * STACK_REVEAL_RATIO));
  const stickyHeight = sticky.offsetHeight;
  const workScrollDistance = Math.max(0, workScroll.scrollHeight - workScroll.clientHeight);
  const totalProgress = workScrollDistance + revealDistance * 2;
  const sequenceHeight = stickyHeight + totalProgress + topOffset;
  const sequenceTop = sequence.offsetTop;
  const progress = clamp(window.scrollY - sequenceTop + topOffset, 0, totalProgress);

  sequence.style.minHeight = `${sequenceHeight}px`;
  workScroll.scrollTop = Math.min(workScrollDistance, progress);

  const skillsProgress = clamp((progress - workScrollDistance) / revealDistance, 0, 1);
  const aboutProgress = clamp((progress - workScrollDistance - revealDistance) / revealDistance, 0, 1);
  const hiddenOffset = stickyHeight + panelGap;
  const workScale = 1 - skillsProgress * STACK_ZOOM_OUT;
  const skillsScale = 1 - aboutProgress * STACK_ZOOM_OUT;
  const skillsY = hiddenOffset * (1 - skillsProgress);
  const aboutY = hiddenOffset * (1 - aboutProgress);

  workPanel.style.transform = `scale(${workScale})`;
  workPanel.style.boxShadow = skillsProgress > 0 ? "var(--shadow-card)" : "";
  skillsPanel.style.transform = `translateY(${skillsY}px) scale(${skillsScale})`;
  skillsPanel.style.boxShadow = skillsProgress > 0 ? STACK_ELEVATED_SHADOW : "";
  aboutPanel.style.transform = `translateY(${aboutY}px) scale(1)`;
  aboutPanel.style.boxShadow = aboutProgress > 0 ? STACK_ELEVATED_SHADOW : "";
}

function initializeStackPanels() {
  syncStackPanels();

  if (stackPanelsInitialized) return;
  stackPanelsInitialized = true;

  window.addEventListener("scroll", syncStackPanels, { passive: true });
  window.addEventListener("resize", syncStackPanels);
}

function attachGlobalEvents() {
  window.addEventListener("pointermove", (event) => {
    if (!dynaspotState.enabled) return;

    dynaspotState.visible = true;
    dynaspotState.x = event.clientX;
    dynaspotState.y = event.clientY;
    syncDynaspot();
  });

  document.addEventListener("pointerover", (event) => {
    if (!dynaspotState.enabled) return;
    dynaspotState.hovering = Boolean(event.target.closest("[data-hover]"));
    syncDynaspot();
  });

  document.addEventListener("pointerout", (event) => {
    if (!dynaspotState.enabled) return;
    if (event.relatedTarget && event.relatedTarget.closest("[data-hover]")) return;
    dynaspotState.hovering = false;
    syncDynaspot();
  });

  window.addEventListener("pointerdown", () => {
    if (!dynaspotState.enabled) return;
    dynaspotState.pressed = true;
    syncDynaspot();
  });

  window.addEventListener("pointerup", () => {
    if (!dynaspotState.enabled) return;
    dynaspotState.pressed = false;
    syncDynaspot();
  });

  document.addEventListener("mouseleave", () => {
    if (!dynaspotState.enabled) return;
    dynaspotState.visible = false;
    dynaspotState.hovering = false;
    dynaspotState.pressed = false;
    syncDynaspot();
  });

  window.addEventListener("blur", () => {
    if (!dynaspotState.enabled) return;
    dynaspotState.visible = false;
    dynaspotState.hovering = false;
    dynaspotState.pressed = false;
    syncDynaspot();
  });

  window.addEventListener("mousemove", (event) => {
    if (!dragState) return;

    const dx = ((event.clientX - dragState.startMouseX) / dragState.width) * 100;
    const dy = ((event.clientY - dragState.startMouseY) / dragState.height) * 100;
    const nextX = Math.max(5, Math.min(95, dragState.startPx + dx));
    const nextY = Math.max(5, Math.min(95, dragState.startPy + dy));
    const skill = state.skills.find((item) => item.id === dragState.id);

    if (!skill) return;

    skill.px = nextX;
    skill.py = nextY;

    const node = document.querySelector(`[data-skill-id="${dragState.id}"]`);
    if (node) {
      node.style.left = `${nextX}%`;
      node.style.top = `${nextY}%`;
    }
  });

  window.addEventListener("mouseup", () => {
    dragState = null;
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (state.contactOpen) {
        setState({ contactOpen: false });
        return;
      }

      if (state.workMenuOpen) {
        setState({ workMenuOpen: false });
        return;
      }

      if (state.activeBioChipId) {
        collapseBioChip();
      }
    }
  });

  document.addEventListener("click", (event) => {
    const workWrap = document.querySelector("[data-work-wrap]");
    if (state.workMenuOpen && workWrap && !workWrap.contains(event.target)) {
      setState({ workMenuOpen: false });
    }

    if (state.activeBioChipId && !event.target.closest("[data-bio-chip]")) {
      collapseBioChip();
    }
  });
}

function render() {
  app.innerHTML = buildAppMarkup();
  attachEvents();
}

try {
  attachGlobalEvents();
  render();
} catch (error) {
  console.error(error);
  app.innerHTML = `
    <div style="padding:40px;font-family:Arial,sans-serif">
      <h1>Preview Error</h1>
      <p>The portfolio script failed to load. Open the browser console for details.</p>
    </div>
  `;
}
