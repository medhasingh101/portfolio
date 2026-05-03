(function () {
  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getActiveProject(state) {
    return window.portfolioData.PROJECTS.find((project) => project.id === state.activeProjectId) ?? null;
  }

  function cardBackground(project, state) {
    return state.dark ? window.portfolioData.DARK_CARD_COLORS[project.color] || "#181614" : "#ffffff";
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
      .map((word) => {
        const chars = word
          .split("")
          .map((char) => `<span class="type-reveal-char" data-char>${escapeHtml(char)}</span>`)
          .join("");

        return `<span class="type-reveal-word">${chars}</span>`;
      })
      .join("");

    return `<${tag} class="${className} type-reveal" data-type-reveal data-delay="${delay}">${words}</${tag}>`;
  }

  function buildStyleAttribute(entries) {
    const styleValue = entries
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([name, value]) => `${name}:${value}`)
      .join(";");

    return styleValue ? ` style="${escapeHtml(styleValue)}"` : "";
  }

  function getPreviewStyle(project) {
    return buildStyleAttribute([
      ["--preview-shell-bg", project.previewOuterBackground],
      ["--preview-shell-border", project.previewOuterBorder],
      ["--preview-stage-bg", project.previewStageBackground],
      ["--preview-stage-width", project.previewStageWidth],
      ["--preview-stage-aspect", project.previewStageAspect],
      ["--preview-stage-radius", project.previewStageRadius],
      ["--preview-stage-border", project.previewStageBorder],
      ["--preview-image-fit", project.previewImageFit],
      ["--preview-image-position", project.previewImagePosition],
      ["--preview-image-padding", project.previewImagePadding],
      ["--preview-image-scale", project.previewImageScale],
    ]);
  }

  function renderPreviewContent(project) {
    if (project.previewImage) {
      return `
        <div class="project-card-preview-stage">
          <img class="project-card-preview-image" src="${escapeHtml(project.previewImage)}" alt="${escapeHtml(project.previewAlt || project.title)}" loading="lazy">
        </div>
      `;
    }

    return `<span class="label-inline">${escapeHtml(project.previewLabel || "Preview")}</span>`;
  }

  function renderDetailCover(project) {
    const coverSrc = project.full.coverImage || project.previewImage;
    const coverAlt = project.full.coverAlt || project.previewAlt || project.title;

    if (coverSrc) {
      return `
        <div class="detail-cover">
          <img class="detail-cover-image" src="${escapeHtml(coverSrc)}" alt="${escapeHtml(coverAlt)}" loading="lazy">
        </div>
      `;
    }

    return `
      <div class="detail-cover">
        <span class="label-inline">Cover Image</span>
      </div>
    `;
  }

  function renderDetailGallery(project) {
    if (!project.full.gallery?.length) return "";

    return `
      <section class="detail-gallery" aria-label="Project visuals">
        ${project.full.gallery
          .map(
            (image) => `
              <figure class="detail-gallery-figure">
                <div class="detail-gallery-media">
                  <img
                    class="detail-gallery-image"
                    src="${escapeHtml(image.src)}"
                    alt="${escapeHtml(image.alt || project.title)}"
                    loading="lazy"
                  >
                </div>
                ${image.caption ? `<figcaption class="detail-gallery-caption">${escapeHtml(image.caption)}</figcaption>` : ""}
              </figure>
            `
          )
          .join("")}
      </section>
    `;
  }

  function getProjectSections(project) {
    if (project.full.modules?.length) {
      return project.full.modules
        .filter((module) => module.type === "section")
        .map((module) => ({
          id: module.id || slugify(module.title),
          label: module.title,
        }));
    }

    return [
      { id: "overview", label: "Overview" },
      ...project.full.sections.map((section) => ({
        id: slugify(section.heading),
        label: section.heading,
      })),
    ];
  }

  function renderProjectSidebar(sections) {
    return `
      <aside class="detail-sidebar">
        <button type="button" class="button-ghost detail-back" data-hover data-nav-back>&lt;- Back</button>
        <nav class="detail-toc" aria-label="Case study sections">
          ${sections
            .map(
              (section) => `
                <a href="#${escapeHtml(section.id)}" class="detail-toc-link">${escapeHtml(section.label)}</a>
              `
            )
            .join("")}
        </nav>
      </aside>
    `;
  }

  function renderProjectMeta(project) {
    const metaItems =
      project.full.metaItems ||
      [
        { label: "Role", value: project.full.role },
        project.full.team ? { label: "Team", value: project.full.team } : null,
        { label: "Duration", value: project.full.duration },
        { label: "Outcome", value: project.full.outcome },
      ].filter(Boolean);

    return `
      <div class="detail-meta-grid case-study-meta-grid">
        ${metaItems
          .map(
            (item) => `
              <div class="case-study-meta-item">
                <p class="case-study-meta-label">${escapeHtml(item.label)}</p>
                <p class="case-study-meta-value">${escapeHtml(item.value)}</p>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderMediaModule(module, projectTitle) {
    const loading = module.loading || "lazy";
    const layoutClass = module.layout ? ` case-study-media-${module.layout}` : "";

    return `
      <figure class="case-study-media${layoutClass}">
        <img
          class="case-study-media-image"
          src="${escapeHtml(module.src)}"
          alt="${escapeHtml(module.alt || projectTitle)}"
          loading="${escapeHtml(loading)}"
        >
        ${module.caption ? `<figcaption class="case-study-media-caption">${escapeHtml(module.caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  function renderVideoModule(module, projectTitle) {
    const layoutClass = module.layout ? ` case-study-media-${module.layout}` : "";
    const autoplay = module.autoplay ? " autoplay" : "";
    const muted = module.muted === false ? "" : " muted";
    const loop = module.loop ? " loop" : "";
    const controls = module.controls === false ? "" : " controls";
    const playsInline = module.playsInline === false ? "" : " playsinline";
    const poster = module.poster ? ` poster="${escapeHtml(module.poster)}"` : "";

    return `
      <figure class="case-study-media${layoutClass}">
        <video class="case-study-media-image" ${controls}${autoplay}${muted}${loop}${playsInline}${poster}>
          <source src="${escapeHtml(module.src)}" type="${escapeHtml(module.mimeType || "video/mp4")}">
          ${escapeHtml(module.alt || projectTitle)}
        </video>
        ${module.caption ? `<figcaption class="case-study-media-caption">${escapeHtml(module.caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  function renderTextModule(module) {
    const layoutClass = module.layout ? ` case-study-text-${module.layout}` : "";
    return `<section class="case-study-text${layoutClass}">${module.html}</section>`;
  }

  function renderEmbedModule(module) {
    return `
      <figure class="case-study-embed">
        <div class="case-study-embed-frame">
          <iframe
            src="${escapeHtml(module.src)}"
            title="${escapeHtml(module.title || "Embedded prototype")}"
            allowfullscreen
            class="case-study-embed-content"
            sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
        </div>
        ${module.caption ? `<figcaption class="case-study-media-caption">${escapeHtml(module.caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  function renderSectionModule(module) {
    const sectionId = module.id || slugify(module.title);

    return `
      <section id="${escapeHtml(sectionId)}" class="case-study-section">
        <h2 class="case-study-section-kicker">${escapeHtml(module.title)}</h2>
        <div class="case-study-section-body">
          ${module.html || ""}
        </div>
      </section>
    `;
  }

  function renderStructuredProjectPage(project) {
    const detailSections = getProjectSections(project);

    return `
      <div class="project-detail page-shell page-shell-narrow">
        <div class="detail-layout">
          ${renderProjectSidebar(detailSections)}

          <div class="detail-main detail-main-structured">
            <div class="detail-tags">
              ${project.tags.map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}
            </div>

            <header class="detail-hero">
              <p class="eyebrow detail-subtitle">${escapeHtml(project.subtitle)}</p>
              <h1 class="detail-title">${escapeHtml(project.title)}</h1>
              <p class="detail-overview">${escapeHtml(project.full.overview)}</p>
            </header>

            ${renderProjectMeta(project)}

            <div class="case-study-flow">
              ${project.full.modules
                .map((module) => {
                  if (module.type === "section") return renderSectionModule(module);
                  if (module.type === "text") return renderTextModule(module);
                  if (module.type === "image") return renderMediaModule(module, project.title);
                  if (module.type === "video") return renderVideoModule(module, project.title);
                  if (module.type === "embed") return renderEmbedModule(module);
                  return "";
                })
                .join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function projectCard(project, state) {
    return `
      <article class="project-card" data-hover data-project-id="${project.id}" style="background:${cardBackground(project, state)}">
        <div class="project-card-tags">
          ${project.tags.map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="project-card-preview"${getPreviewStyle(project)}>
          ${renderPreviewContent(project)}
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

  function renderBioIntroItem(item, state) {
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

  function renderBioIntro(state) {
    return window.portfolioData.BIO_INTRO_ITEMS.map((item) => renderBioIntroItem(item, state)).join(" ");
  }

  function renderHomePage(state) {
    return `
      <div>
        <section class="hero-sequence" data-hero-sequence>
          <div class="hero-sticky" data-hero-sticky>
            <div class="hero-envelope-scene" data-hero-envelope>
              <div class="scroll-envelope" aria-hidden="true">
                <div class="scroll-envelope-back"></div>
                <div class="scroll-envelope-letter"></div>
                <div class="scroll-envelope-flap scroll-envelope-flap-front"></div>
                <div class="scroll-envelope-flap scroll-envelope-flap-top"></div>
              </div>
              <div class="hero hero-card">
                <div class="hero-card-fold hero-card-fold-top" aria-hidden="true"></div>
                <div class="hero-card-fold hero-card-fold-bottom" aria-hidden="true"></div>
                <div class="hero-glow"></div>
                <div class="hero-main">
                  <div class="hero-copy">
                    <p class="eyebrow hero-label">Product Designer / Based in [City]</p>
                    ${typeReveal("Medha Singh", "h1", "hero-title", 300)}
                    <div class="bio-intro" aria-label="Designer bio highlights">
                      <p class="bio-intro-line">
                        ${renderBioIntro(state)}
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
              </div>
            </div>
          </div>
        </section>

        <section class="stack-sequence" data-stack-sequence>
          <div class="stack-sticky" data-stack-sticky>
            <div class="content-section stack-panel stack-panel-work" data-stack-panel="work">
              ${sectionHeader("01", "Selected Work")}
              <div class="stack-panel-body stack-panel-body-scroll" data-stack-scroll>
                <div class="project-grid">
                  ${window.portfolioData.PROJECTS.map((project) => projectCard(project, state)).join("")}
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

  function renderWorkPage(filter, label, state) {
    const filtered = window.portfolioData.PROJECTS.filter((project) => project.tags.includes(filter));

    return `
      <section class="page-shell">
        <div class="page-header">
          <p class="eyebrow page-header-breadcrumb">Work /</p>
          <h1 class="page-title">${escapeHtml(label)}</h1>
        </div>
        <div class="project-grid">
          ${filtered.map((project) => projectCard(project, state)).join("")}
        </div>
      </section>
    `;
  }

  function renderSimpleProjectPage(project) {
    const detailSections = getProjectSections(project);

    return `
      <div class="project-detail page-shell page-shell-narrow">
        <div class="detail-layout">
          ${renderProjectSidebar(detailSections)}

          <div class="detail-main">
            <div class="detail-tags">
              ${project.tags.map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}
            </div>

            <header class="detail-hero">
              <p class="eyebrow detail-subtitle">${escapeHtml(project.subtitle)}</p>
              <h1 class="detail-title">${escapeHtml(project.title)}</h1>
              <p class="detail-overview">${escapeHtml(project.full.overview)}</p>
            </header>

            ${renderProjectMeta(project)}

            ${renderDetailCover(project)}
            ${renderDetailGallery(project)}

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

  function renderProjectPage(project) {
    if (project.full.modules?.length) {
      return renderStructuredProjectPage(project);
    }

    return renderSimpleProjectPage(project);
  }

  function renderContactModal(state) {
    if (!state.contactOpen) return "";

    return `
      <div class="contact-modal-backdrop" data-contact-backdrop>
        <div class="contact-modal">
          <button type="button" class="contact-modal-close" data-hover data-contact-close>X</button>
          <p class="label-inline contact-modal-label">Get in touch</p>
          <h2 class="contact-modal-title">Let's make something <em>together.</em></h2>
          ${window.portfolioData.CONTACT_LINKS.map(
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

  function renderMain(state) {
    if (state.page === "ux") return renderWorkPage("UX Design", "UX Design", state);
    if (state.page === "graphic") return renderWorkPage("Graphic Design", "Graphic Design", state);

    const activeProject = getActiveProject(state);
    if (state.page === "project" && activeProject) return renderProjectPage(activeProject);

    return renderHomePage(state);
  }

  function renderNav(state) {
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

  function buildAppMarkup(state) {
    return `
      <div class="app-shell ${state.dark ? "theme-dark" : "theme-light"}">
        ${renderNav(state)}
        <main>${renderMain(state)}</main>
        ${renderFooter()}
        ${renderContactModal(state)}
        <div class="dynaspot" data-dynaspot aria-hidden="true">
          <div class="dynaspot-ring"></div>
          <div class="dynaspot-dot"></div>
        </div>
      </div>
    `;
  }

  window.portfolioRender = {
    buildAppMarkup,
    getActiveProject,
  };
})();
