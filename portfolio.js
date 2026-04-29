const state = {
  page: "home",
  activeProjectId: null,
  projectReturnPage: "home",
  contactOpen: false,
  dark: false,
  workMenuOpen: false,
  activeBioChipId: null,
  bioTypedText: "",
  skills: window.portfolioData.INITIAL_SKILLS.map((skill) => ({ ...skill, subs: [...skill.subs] })),
};

const app = document.getElementById("app");
let dragState = null;
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

function setState(nextState) {
  Object.assign(state, nextState);
  render();
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

  const chip = window.portfolioData.BIO_INTRO_ITEMS.find((item) => item.type === "chip" && item.id === chipId);
  if (!chip) return;

  clearBioTypeTimer();
  state.activeBioChipId = chipId;
  state.bioTypedText = "";
  render();
  startBioTypewriter(chip);
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

  const skillsCanvas = document.querySelector("[data-skills-canvas]");
  if (skillsCanvas) {
    document.querySelectorAll("[data-skill-handle]").forEach((handle) => {
      handle.addEventListener("mousedown", (event) => {
        event.preventDefault();
        const rect = skillsCanvas.getBoundingClientRect();
        const skill = state.skills.find((item) => item.id === handle.dataset.skillHandle);
        if (!skill) return;

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
  window.heroEnvelope?.initialize();
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
  app.innerHTML = window.portfolioRender.buildAppMarkup(state);
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
