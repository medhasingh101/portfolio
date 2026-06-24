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

  function socialIcon(label) {
    const icons = {
      LinkedIn: `<svg viewBox="0 0 24 24" class="nav-social-svg" focusable="false"><path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2 2 0 1 0 5.3 7a2 2 0 0 0-.05-4ZM20 20h-3.37v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.22V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z" /></svg>`,
      Behance: `<svg viewBox="0 0 24 24" class="nav-social-svg" focusable="false"><path d="M3.5 6.5H9c2.2 0 3.75 1.1 3.75 3.05 0 1.2-.56 2.1-1.62 2.58 1.42.38 2.18 1.54 2.18 3.05 0 2.44-2.07 3.52-4.25 3.52H3.5V6.5Zm2.7 4.92h2.4c.84 0 1.46-.38 1.46-1.3 0-1.04-.8-1.26-1.67-1.26H6.2v2.56Zm0 5h2.53c.93 0 1.74-.3 1.74-1.42 0-1.1-.7-1.54-1.72-1.54H6.2v2.96Zm9.72-5.8h4.58v1.35h-4.58v-1.35Zm4.66 4.56c-.24 2.34-2.15 3.82-4.48 3.82-3.34 0-4.92-2.3-5.02-5.5 0-3.14 2.06-5.44 4.92-5.44 3.7 0 4.84 3.46 4.66 5.98h-6.7c-.08 1.56.84 2.62 2.22 2.62.95 0 1.72-.46 1.94-1.48h2.46Zm-2.56-2.9c-.08-1.24-.95-2.24-2.16-2.24-1.28 0-2.04.96-2.12 2.24h4.28Z" /></svg>`,
    };
    return icons[label] || escapeHtml(label);
  }

  function getActiveProject(state) {
    return window.portfolioData.PROJECTS.find((project) => project.id === state.activeProjectId) ?? null;
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
      return `<img class="project-card-preview-image" src="${escapeHtml(project.previewImage)}" alt="${escapeHtml(project.previewAlt || project.title)}" loading="lazy">`;
    }

    return `<span class="label-inline">${escapeHtml(project.previewLabel || "Preview")}</span>`;
  }

  function renderDetailCover(project) {
    const coverSrc = project.full.coverImage || project.previewImage;
    const coverAlt = project.full.coverAlt || project.previewAlt || project.title;

    if (coverSrc) {
      return `
        <div class="detail-cover">
          <img
            class="detail-cover-image"
            src="${escapeHtml(coverSrc)}"
            alt="${escapeHtml(coverAlt)}"
            loading="lazy"
            data-lightbox-image
            data-lightbox-src="${escapeHtml(coverSrc)}"
            data-lightbox-alt="${escapeHtml(coverAlt)}"
          >
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
                    data-lightbox-image
                    data-lightbox-src="${escapeHtml(image.src)}"
                    data-lightbox-alt="${escapeHtml(image.alt || project.title)}"
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
        <button type="button" class="button-ghost detail-back" data-hover data-nav-back>&#8592; Back</button>
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
          data-lightbox-image
          data-lightbox-src="${escapeHtml(module.src)}"
          data-lightbox-alt="${escapeHtml(module.alt || projectTitle)}"
        >
        ${module.captionHtml
          ? `<figcaption class="case-study-media-caption">${module.captionHtml}</figcaption>`
          : module.caption
          ? `<figcaption class="case-study-media-caption">${escapeHtml(module.caption)}</figcaption>`
          : ""}
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
    const embedStyle = buildStyleAttribute([
      ["--case-study-embed-max-width", module.maxWidth],
      ["--case-study-embed-aspect", module.aspectRatio],
    ]);

    return `
      <figure class="case-study-embed"${embedStyle}>
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
    const cardClassName = project.cardClassName ? ` ${project.cardClassName}` : "";

    return `
      <article class="project-card${cardClassName}" data-hover data-project-id="${project.id}">
        <div class="project-card-tags">
          ${project.tags.map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="project-card-preview"${getPreviewStyle(project)}>
          ${renderPreviewContent(project)}
          <div class="project-card-overlay">
            <p class="project-card-overlay-text">${escapeHtml(project.desc)}</p>
          </div>
        </div>
        <p class="eyebrow project-card-subtitle">${escapeHtml(project.subtitle)}</p>
        <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
        ${project.methods ? `<p class="project-card-methods">${escapeHtml(project.methods)}</p>` : ""}
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
        const ty = `${Math.sin(angle) * 44}px`;
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
      <div class="skill-node" style="left:${skill.px}%; top:${skill.py}%;${skill.color ? ` --skill-color:${skill.color};` : ""}" data-skill-id="${skill.id}">
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
    return window.portfolioData.BIO_INTRO_ITEMS.map((item) => renderBioIntroItem(item, state)).join("");
  }

  function renderHomePage(state) {
    const off = state.heroBtnOffsets || {};
    const wOff = off.work   || { x: 0, y: 0 };
    const aOff = off.about  || { x: 0, y: 0 };
    const sOff = off.skills || { x: 0, y: 0 };
    return `
      <div class="hero-scene">
        <section class="hero">
          <div class="hero-top">
            <div class="hero-side-nav">
              <div class="hero-btn-drag-wrap" data-hero-drag="about" style="transform:translate(${aOff.x}px,${aOff.y}px)">
                <button type="button" class="hero-side-btn" data-hover data-nav-about>
                  <img src="${state.dark ? 'assets/about me - dark.png' : 'assets/about me.png'}" alt="About me" class="hero-side-img" />
                </button>
              </div>
              <div class="hero-btn-drag-wrap" data-hero-drag="skills" style="transform:translate(${sOff.x}px,${sOff.y}px)">
                <button type="button" class="hero-side-btn" data-hover data-hero-skills>
                  <img src="${state.dark ? 'assets/skills - dark.png' : 'assets/skills.png'}" alt="Skills" class="hero-side-img" />
                </button>
              </div>
            </div>
          </div>
          <div class="hero-main">
            <div class="hero-copy">
              <p class="eyebrow hero-label">${escapeHtml(window.portfolioData.HERO_EYEBROW)}</p>
              <p class="hero-greeting">Hi, I'm Medha</p>
              <p class="hero-summary">a Product and User Experience Designer with academic foundations in human cognition and computer science.</p>
              <div class="bio-intro" aria-label="Designer bio highlights">
                <p class="bio-intro-line">
                  ${renderBioIntro(state)}
                </p>
              </div>
              <div class="hero-actions">
                <div class="hero-work-cluster" style="transform:translate(${wOff.x}px,${wOff.y}px)">
                  <div class="hero-btn-drag-wrap" data-hero-drag="work">
                    <button type="button" class="hero-work-img-btn" data-hover data-hero-work>
                      <img src="${state.dark ? 'assets/work - dark.png' : 'assets/work.png'}" alt="See my work" class="hero-work-img" />
                    </button>
                  </div>
                  <div class="hero-work-branches">
                      <div class="hero-work-branch">
                        <img src="assets/arrow ux-design.png" alt="" class="hero-work-branch-arrow" aria-hidden="true" />
                        <button type="button" class="hero-work-branch-btn" data-hover data-nav-page="ux">
                          <img src="assets/ux-design.png" alt="UX Design" class="hero-work-branch-img" />
                        </button>
                      </div>
                      <div class="hero-work-branch">
                        <img src="assets/arrow graphic design.png" alt="" class="hero-work-branch-arrow" aria-hidden="true" />
                        <button type="button" class="hero-work-branch-btn" data-hover data-nav-page="graphic">
                          <img src="assets/graphic design.png" alt="Graphic Design" class="hero-work-branch-img" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="hero-stats" aria-label="Experience highlights">
              ${window.portfolioData.HERO_PROOF_POINTS.map(
                (item) => `<span class="hero-proof-item">${escapeHtml(item)}</span>`
              ).join("")}
            </div>
          </div>
        </section>
      </div>

      <section class="stack-sequence" data-stack-sequence>
          <div class="stack-sticky" data-stack-sticky>
            <div class="content-section stack-panel stack-panel-work" data-stack-panel="work">
              ${sectionHeader("01", "Selected Work")}
              <div class="stack-panel-body stack-panel-body-scroll" data-stack-scroll>
                <div class="stack-panel-body-inner" data-stack-scroll-inner>
                  <div class="project-grid">
                    ${window.portfolioData.PROJECTS.map((project) => projectCard(project, state)).join("")}
                  </div>
                </div>
                <div class="stack-scrollbar" aria-hidden="true">
                  <div class="stack-scrollbar-thumb" data-work-scrollbar-thumb></div>
                </div>
              </div>
            </div>

            <div class="content-section content-section-skills stack-panel stack-panel-skills" data-stack-panel="skills">
              ${sectionHeader("02", "Skills")}
              <div class="stack-panel-body">
                <p class="skills-canvas-note">hover to explore / drag to rearrange</p>
                <div class="skills-canvas" data-skills-canvas>
                  ${state.skills.map(renderSkillNode).join("")}
                </div>
              </div>
            </div>

            <div id="about-section" class="content-section stack-panel stack-panel-about" data-stack-panel="about">
              ${sectionHeader("03", "About")}
              <div class="stack-panel-body">
                <div class="about-grid">
                  <div class="about-photo">
                    <img src="assets/about me - picture.png" alt="Medha Singh" class="about-photo-img" />
                  </div>
                  <div>
                    ${typeReveal("I design with clarity and intention", "h2", "about-title", 80)}
                    ${window.portfolioData.BIO_ABOUT.map((para, i) => `
                      <p class="about-copy${i < window.portfolioData.BIO_ABOUT.length - 1 ? " about-copy-spaced" : ""}">
                        ${escapeHtml(para)}
                      </p>
                    `).join("")}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
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

  function renderGalleryProjectPage(project) {
    return `
      <div class="project-gallery">
        <div class="gallery-header">
          <button type="button" class="button-ghost gallery-back" data-hover data-nav-back>&#8592; Back</button>
          <div class="gallery-header-meta">
            <div class="gallery-tags">
              ${project.tags.map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}
            </div>
            <p class="eyebrow gallery-subtitle">${escapeHtml(project.subtitle)}</p>
            <h1 class="gallery-title">${escapeHtml(project.title)}</h1>
            ${project.full.overview ? `<p class="gallery-overview">${escapeHtml(project.full.overview)}</p>` : ""}
            ${project.full.metaItems?.length ? `
              <div class="gallery-meta-row">
                ${project.full.metaItems.map((item) => `
                  <div class="gallery-meta-item">
                    <p class="gallery-meta-label">${escapeHtml(item.label)}</p>
                    <p class="gallery-meta-value">${escapeHtml(item.value)}</p>
                  </div>
                `).join("")}
              </div>
            ` : ""}
          </div>
        </div>
        <div class="gallery-flow">
          ${project.full.modules
            .map((module) => {
              if (module.type === "image") {
                return `
                  <figure class="gallery-figure">
                    <img
                      class="gallery-image"
                      src="${escapeHtml(module.src)}"
                      alt="${escapeHtml(module.alt || project.title)}"
                      loading="${escapeHtml(module.loading || "lazy")}"
                      data-lightbox-image
                      data-lightbox-src="${escapeHtml(module.src)}"
                      data-lightbox-alt="${escapeHtml(module.alt || project.title)}"
                    >
                  </figure>
                `;
              }
              if (module.type === "row") {
                return `
                  <div class="gallery-row">
                    ${module.items.map((item) => `
                      <figure class="gallery-figure gallery-figure-half" style="flex:${item.flex ?? 1}">
                        <img
                          class="gallery-image"
                          src="${escapeHtml(item.src)}"
                          alt="${escapeHtml(item.alt || project.title)}"
                          loading="lazy"
                          data-lightbox-image
                          data-lightbox-src="${escapeHtml(item.src)}"
                          data-lightbox-alt="${escapeHtml(item.alt || project.title)}"
                        >
                      </figure>
                    `).join("")}
                  </div>
                `;
              }
              if (module.type === "video") return renderVideoModule(module, project.title);
              return "";
            })
            .join("")}
        </div>
      </div>
    `;
  }

  function renderProjectPage(project) {
    if (project.pageLayout === "gallery") {
      return renderGalleryProjectPage(project);
    }
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

  function renderImageLightbox(state) {
    if (!state.lightboxOpen || !state.lightboxSrc) return "";

    return `
      <div class="image-lightbox-backdrop" data-lightbox-backdrop>
        <div class="image-lightbox">
          <div class="image-lightbox-toolbar">
            <div class="image-lightbox-zoom-label">
              ${Math.round((state.lightboxZoom || 1) * 100)}%
              ${state.lightboxZoom > 1 ? `<span class="image-lightbox-hint">drag to explore</span>` : ""}
            </div>
            <div class="image-lightbox-actions">
              <button type="button" class="image-lightbox-button" data-hover data-lightbox-zoom-out aria-label="Zoom out">-</button>
              <button type="button" class="image-lightbox-button" data-hover data-lightbox-zoom-in aria-label="Zoom in">+</button>
              <button type="button" class="image-lightbox-button" data-hover data-lightbox-close aria-label="Close image viewer">X</button>
            </div>
          </div>
          <div class="image-lightbox-stage" data-lightbox-stage>
            <img
              class="image-lightbox-image"
              src="${escapeHtml(state.lightboxSrc)}"
              alt="${escapeHtml(state.lightboxAlt || "Expanded project image")}"
              style="transform: translate(${state.lightboxPanX || 0}px, ${state.lightboxPanY || 0}px) scale(${state.lightboxZoom || 1})"
            >
          </div>
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
        <div class="site-nav-tools" aria-label="Quick actions">
          ${window.portfolioData.SOCIAL_LINKS.map(([label, href]) => `
            <a href="${escapeHtml(href)}" class="nav-social-link" data-hover aria-label="${escapeHtml(label)}">
              ${socialIcon(label)}
            </a>
          `).join("")}
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
        <button type="button" class="nav-button nav-button-brand" data-hover data-nav-home>MEDHA.</button>
        <div class="site-nav-links">
          <a href="https://drive.google.com/file/d/14fUNUMKbeWSZlCl-CfwXEUFrsEVeUfcf/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="nav-button" data-hover>Resume</a>
          <button type="button" class="nav-button" data-hover data-contact-open>Contact</button>
        </div>
      </nav>
    `;
  }

  function renderFooter() {
    return `
      <footer class="site-footer">
        <div class="site-footer-meta">
          <p class="site-footer-copy">(c) 2026 Medha Singh</p>
          <p class="site-footer-copy">Designed & coded with intention</p>
        </div>
        <div class="site-footer-links" aria-label="Social links">
          ${window.portfolioData.SOCIAL_LINKS.map(
            ([label, href]) => `<a href="${escapeHtml(href)}" class="site-footer-link" data-hover>${escapeHtml(label)}</a>`
          ).join("")}
        </div>
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
        ${renderImageLightbox(state)}
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
    buildContactModal: renderContactModal,
    buildImageLightbox: renderImageLightbox,
  };
})();
