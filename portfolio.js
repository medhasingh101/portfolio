const state = {
  page: "home",
  activeProjectId: null,
  projectReturnPage: "home",
  contactOpen: false,
  lightboxOpen: false,
  lightboxSrc: "",
  lightboxAlt: "",
  lightboxZoom: 1,
  lightboxPanX: 0,
  lightboxPanY: 0,
  dark: false,
  workMenuOpen: false,
  activeBioChipId: null,
  bioTypedText: "",
  skills: window.portfolioData.INITIAL_SKILLS.map((skill) => ({ ...skill, subs: [...skill.subs] })),
};

const app = document.getElementById("app");
let dragState = null;
let lightboxDragState = null;
let typeRevealObserver = null;
let bioTypeTimer = null;
let dynaspot = null;
let dynaspotMediaQuery = null;

const dynaspotState = {
  enabled: false,
  visible: false,
  hovering: false,
  pressed: false,
  x: 0,
  y: 0,
};

function syncLightboxTransform() {
  const img = document.querySelector(".image-lightbox-image");
  if (img) {
    img.style.transform = `translate(${state.lightboxPanX}px, ${state.lightboxPanY}px) scale(${state.lightboxZoom})`;
  }
  const zoomLabel = document.querySelector(".image-lightbox-zoom-label");
  if (zoomLabel) {
    const pct = Math.round(state.lightboxZoom * 100);
    const hint = state.lightboxZoom > 1 ? ` <span class="image-lightbox-hint">drag to explore</span>` : "";
    zoomLabel.innerHTML = `${pct}%${hint}`;
  }
}

function applyThemeChange() {
  const shell = document.querySelector(".app-shell");
  if (!shell) return false;
  shell.classList.toggle("theme-dark", state.dark);
  shell.classList.toggle("theme-light", !state.dark);
  document.body.classList.toggle("theme-dark", state.dark);
  document.body.classList.toggle("theme-light", !state.dark);

  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.title = state.dark ? "Switch to light mode" : "Switch to dark mode";
    const label = toggle.querySelector(".theme-toggle-label");
    if (label) label.textContent = state.dark ? "Light mode" : "Dark mode";
    const icon = toggle.querySelector(".theme-toggle-icon");
    if (icon) {
      icon.innerHTML = state.dark
        ? `<svg viewBox="0 0 24 24" class="theme-toggle-svg" focusable="false"><path d="M12 4.75V2.5M12 21.5v-2.25M6.88 6.88 5.3 5.3M18.7 18.7l-1.58-1.58M4.75 12H2.5M21.5 12h-2.25M6.88 17.12 5.3 18.7M18.7 5.3l-1.58 1.58M12 16.25A4.25 4.25 0 1 0 12 7.75a4.25 4.25 0 0 0 0 8.5Z" /></svg>`
        : `<svg viewBox="0 0 24 24" class="theme-toggle-svg" focusable="false"><path d="M20.2 14.85A8.75 8.75 0 0 1 9.15 3.8a8.75 8.75 0 1 0 11.05 11.05Z" /></svg>`;
    }
  }
  return true;
}

function applyWorkMenuChange() {
  const wrap = document.querySelector("[data-work-wrap]");
  if (!wrap) return false;
  wrap.classList.toggle("is-open", state.workMenuOpen);
  const toggle = wrap.querySelector("[data-work-toggle]");
  if (toggle) toggle.setAttribute("aria-expanded", String(state.workMenuOpen));
  return true;
}

function attachContactEvents(backdrop) {
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) setState({ contactOpen: false });
  });
  backdrop.querySelector("[data-contact-close]")?.addEventListener("click", () => setState({ contactOpen: false }));
}

function applyContactModal() {
  const existing = document.querySelector("[data-contact-backdrop]");
  if (state.contactOpen) {
    if (existing) return;
    const html = window.portfolioRender.buildContactModal(state);
    if (!html) return;
    const div = document.createElement("div");
    div.innerHTML = html;
    const modal = div.firstElementChild;
    if (!modal) return;
    const shell = document.querySelector(".app-shell");
    if (shell) {
      shell.insertBefore(modal, document.querySelector("[data-dynaspot]") || null);
      attachContactEvents(modal);
    }
  } else {
    existing?.remove();
  }
}

function attachLightboxEvents(backdrop) {
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) closeImageLightbox();
  });
  backdrop.querySelector("[data-lightbox-close]")?.addEventListener("click", closeImageLightbox);
  backdrop.querySelector("[data-lightbox-zoom-in]")?.addEventListener("click", () => setLightboxZoom(state.lightboxZoom + 0.2));
  backdrop.querySelector("[data-lightbox-zoom-out]")?.addEventListener("click", () => setLightboxZoom(state.lightboxZoom - 0.2));
}

function applyLightboxModal() {
  const existing = document.querySelector("[data-lightbox-backdrop]");
  if (state.lightboxOpen && state.lightboxSrc) {
    if (existing) {
      syncLightboxTransform();
    } else {
      const html = window.portfolioRender.buildImageLightbox(state);
      if (!html) return;
      const div = document.createElement("div");
      div.innerHTML = html;
      const lightbox = div.firstElementChild;
      if (!lightbox) return;
      const shell = document.querySelector(".app-shell");
      if (shell) {
        shell.insertBefore(lightbox, document.querySelector("[data-dynaspot]") || null);
        attachLightboxEvents(lightbox);
      }
    }
  } else {
    existing?.remove();
  }
}

const TARGETED_UPDATE_SETS = [
  { keys: new Set(["dark"]), apply: () => applyThemeChange() },
  { keys: new Set(["workMenuOpen"]), apply: () => applyWorkMenuChange() },
  { keys: new Set(["contactOpen"]), apply: () => applyContactModal() },
  {
    keys: new Set(["lightboxOpen", "lightboxSrc", "lightboxAlt", "lightboxZoom", "lightboxPanX", "lightboxPanY"]),
    apply: () => applyLightboxModal(),
  },
  { keys: new Set(["activeBioChipId", "bioTypedText"]), apply: () => applyBioChipChange() },
];

function setState(nextState) {
  Object.assign(state, nextState);
  const changedKeys = new Set(Object.keys(nextState));
  const targeted = TARGETED_UPDATE_SETS.find((entry) =>
    [...changedKeys].every((k) => entry.keys.has(k))
  );
  if (targeted) {
    targeted.apply();
  } else {
    render();
  }
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

function applyBioChipChange() {
  document.querySelectorAll(".bio-chip-group").forEach((group) => {
    const btn = group.querySelector("[data-bio-chip]");
    if (!btn) return;
    const isActive = btn.dataset.bioChip === state.activeBioChipId;
    group.classList.toggle("is-active", isActive);
    btn.classList.toggle("is-active", isActive);
    const detail = group.querySelector(".bio-chip-detail");
    if (detail) {
      detail.classList.toggle("is-visible", isActive);
      if (!isActive) detail.textContent = "";
    }
  });
}

function toggleBioChip(chipId) {
  if (state.activeBioChipId === chipId) {
    collapseBioChip();
    return;
  }

  const chip = window.portfolioData.BIO_INTRO_ITEMS.find((item) => item.type === "chip" && item.id === chipId);
  if (!chip) return;

  clearBioTypeTimer();
  setState({ activeBioChipId: chipId, bioTypedText: "" });
  startBioTypewriter(chip);
}

function handleProjectOpen(projectId) {
  state.activeProjectId = Number(projectId);
  state.projectReturnPage = state.page === "ux" || state.page === "graphic" ? state.page : "home";
  state.page = "project";
  state.contactOpen = false;
  state.lightboxOpen = false;
  state.lightboxSrc = "";
  state.lightboxAlt = "";
  state.lightboxZoom = 1;
  state.lightboxPanX = 0;
  state.lightboxPanY = 0;
  state.workMenuOpen = false;
  render();
  window.scrollTo(0, 0);
}

function handlePageChange(page) {
  state.page = page;
  state.activeProjectId = null;
  state.contactOpen = false;
  state.lightboxOpen = false;
  state.lightboxSrc = "";
  state.lightboxAlt = "";
  state.lightboxZoom = 1;
  state.lightboxPanX = 0;
  state.lightboxPanY = 0;
  state.workMenuOpen = false;
  clearBioTypeTimer();
  state.activeBioChipId = null;
  state.bioTypedText = "";
  render();
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    window.portfolioStack?.sync();
  });
}

function scrollToWorkSection() {
  if (state.page !== "home") {
    handlePageChange("home");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.portfolioStack?.scrollToWorkSection();
      });
    });
    return;
  }

  window.portfolioStack?.scrollToWorkSection();
}

function openImageLightbox(src, alt) {
  setState({
    lightboxOpen: true,
    lightboxSrc: src,
    lightboxAlt: alt || "",
    lightboxZoom: 1,
    lightboxPanX: 0,
    lightboxPanY: 0,
  });
}

function closeImageLightbox() {
  if (!state.lightboxOpen) return;

  setState({
    lightboxOpen: false,
    lightboxSrc: "",
    lightboxAlt: "",
    lightboxZoom: 1,
    lightboxPanX: 0,
    lightboxPanY: 0,
  });
}

function setLightboxZoom(nextZoom) {
  if (!state.lightboxOpen) return;
  state.lightboxZoom = Math.max(0.5, Math.min(3, nextZoom));
  if (state.lightboxZoom <= 1) {
    state.lightboxPanX = 0;
    state.lightboxPanY = 0;
  }
  syncLightboxTransform();
}

function setLightboxPan(nextPanX, nextPanY) {
  if (!state.lightboxOpen) return;
  state.lightboxPanX = nextPanX;
  state.lightboxPanY = nextPanY;
  syncLightboxTransform();
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

function updateDynaspotFromEmbed(x, y, hovering) {
  if (!dynaspotState.enabled) return;
  dynaspotState.visible = true;
  dynaspotState.hovering = Boolean(hovering);
  dynaspotState.x = x;
  dynaspotState.y = y;
  syncDynaspot();
}
window.updateDynaspotFromEmbed = updateDynaspotFromEmbed;

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

function attachEvents() {
  document.querySelectorAll("[data-project-id]").forEach((card) => {
    card.addEventListener("click", () => handleProjectOpen(card.dataset.projectId));
  });

  document.querySelectorAll("[data-nav-page]").forEach((button) => {
    button.addEventListener("click", () => handlePageChange(button.dataset.navPage));
  });

  document.querySelectorAll("[data-hero-work]").forEach((button) => {
    button.addEventListener("click", scrollToWorkSection);
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

  document.querySelectorAll("[data-lightbox-image]").forEach((image) => {
    image.addEventListener("click", (event) => {
      event.stopPropagation();
      openImageLightbox(image.dataset.lightboxSrc, image.dataset.lightboxAlt);
    });
  });

  const aboutButton = document.querySelector("[data-nav-about]");
  if (aboutButton) {
    aboutButton.addEventListener("click", () => {
      if (state.page !== "home") {
        handlePageChange("home");
        requestAnimationFrame(() => {
          window.portfolioStack?.scrollToAboutSection();
        });
      } else {
        window.portfolioStack?.scrollToAboutSection();
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

  const lightboxBackdrop = document.querySelector("[data-lightbox-backdrop]");
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener("click", (event) => {
      if (event.target === lightboxBackdrop) {
        closeImageLightbox();
      }
    });
  }

  const lightboxClose = document.querySelector("[data-lightbox-close]");
  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeImageLightbox);
  }

  const lightboxZoomIn = document.querySelector("[data-lightbox-zoom-in]");
  if (lightboxZoomIn) {
    lightboxZoomIn.addEventListener("click", () => setLightboxZoom((state.lightboxZoom || 1) + 0.2));
  }

  const lightboxZoomOut = document.querySelector("[data-lightbox-zoom-out]");
  if (lightboxZoomOut) {
    lightboxZoomOut.addEventListener("click", () => setLightboxZoom((state.lightboxZoom || 1) - 0.2));
  }

  const skillsCanvas = document.querySelector("[data-skills-canvas]");
  if (skillsCanvas) {
    document.querySelectorAll("[data-skill-handle]").forEach((handle) => {
      const startDrag = (clientX, clientY) => {
        const rect = skillsCanvas.getBoundingClientRect();
        const skill = state.skills.find((item) => item.id === handle.dataset.skillHandle);
        if (!skill) return;
        dragState = {
          id: skill.id,
          startMouseX: clientX,
          startMouseY: clientY,
          startPx: skill.px,
          startPy: skill.py,
          width: rect.width,
          height: rect.height,
        };
      };

      handle.addEventListener("mousedown", (event) => {
        event.preventDefault();
        startDrag(event.clientX, event.clientY);
      });

      handle.addEventListener("touchstart", (event) => {
        event.preventDefault();
        const touch = event.touches[0];
        startDrag(touch.clientX, touch.clientY);
      }, { passive: false });
    });
  }

  initializeTypeReveal();
  initializeDynaspot();
  window.portfolioStack?.initialize();
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
    if (lightboxDragState) {
      event.preventDefault();
      const nextPanX = lightboxDragState.startPanX + (event.clientX - lightboxDragState.startX);
      const nextPanY = lightboxDragState.startPanY + (event.clientY - lightboxDragState.startY);
      setLightboxPan(nextPanX, nextPanY);
      return;
    }

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
    lightboxDragState = null;
  });

  window.addEventListener("touchend", () => {
    dragState = null;
    lightboxDragState = null;
  });

  window.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];

    if (lightboxDragState) {
      event.preventDefault();
      const nextPanX = lightboxDragState.startPanX + (touch.clientX - lightboxDragState.startX);
      const nextPanY = lightboxDragState.startPanY + (touch.clientY - lightboxDragState.startY);
      setLightboxPan(nextPanX, nextPanY);
      return;
    }

    if (!dragState) return;
    event.preventDefault();

    const dx = ((touch.clientX - dragState.startMouseX) / dragState.width) * 100;
    const dy = ((touch.clientY - dragState.startMouseY) / dragState.height) * 100;
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
  }, { passive: false });

  const startLightboxDrag = (clientX, clientY, event) => {
    const stage = event.target.closest("[data-lightbox-stage]");
    if (!stage || !state.lightboxOpen || state.lightboxZoom <= 1) return;
    event.preventDefault();
    lightboxDragState = {
      startX: clientX,
      startY: clientY,
      startPanX: state.lightboxPanX,
      startPanY: state.lightboxPanY,
    };
  };

  document.addEventListener("mousedown", (event) => startLightboxDrag(event.clientX, event.clientY, event));

  document.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    startLightboxDrag(touch.clientX, touch.clientY, event);
  }, { passive: false });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (state.lightboxOpen) {
        if (state.lightboxZoom > 1 || state.lightboxPanX || state.lightboxPanY) {
          state.lightboxZoom = 1;
          state.lightboxPanX = 0;
          state.lightboxPanY = 0;
          syncLightboxTransform();
        } else {
          closeImageLightbox();
        }
        return;
      }

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

  document.addEventListener(
    "wheel",
    (event) => {
      if (!state.lightboxOpen || !event.target.closest("[data-lightbox-stage]")) return;
      event.preventDefault();
      const delta = event.deltaY > 0 ? -0.12 : 0.12;
      setLightboxZoom((state.lightboxZoom || 1) + delta);
    },
    { passive: false }
  );
}

function render() {
  app.innerHTML = window.portfolioRender.buildAppMarkup(state);
  attachEvents();
}

try {
  attachGlobalEvents();
  render();
  document.body.classList.toggle("theme-dark", state.dark);
  document.body.classList.toggle("theme-light", !state.dark);
} catch (error) {
  console.error(error);
  app.innerHTML = `
    <div style="padding:40px;font-family:Arial,sans-serif">
      <h1>Preview Error</h1>
      <p>The portfolio script failed to load. Open the browser console for details.</p>
    </div>
  `;
}
