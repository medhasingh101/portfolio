(function () {
  const STACK_TOP_OFFSET = 104;
  const STACK_PANEL_GAP = 24;
  const STACK_MIN_REVEAL_DISTANCE = 240;
  const STACK_REVEAL_RATIO = 0.38;
  const STACK_DWELL_RATIO = 1.0;   // fraction of revealDistance to hold each card before next slides in
  const STACK_ZOOM_OUT = 0.03;
  const STACK_ELEVATED_SHADOW = "0 22px 48px rgba(15, 23, 42, 0.16)";

  let initialized = false;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getElements() {
    return {
      sequence: document.querySelector("[data-stack-sequence]"),
      sticky: document.querySelector("[data-stack-sticky]"),
      bgFade: document.querySelector("[data-stack-bg-fade]"),
      projectStack: document.querySelector("[data-project-stack]"),
      projectStackItems: Array.from(document.querySelectorAll("[data-project-stack-item]")),
      workPanel: document.querySelector('[data-stack-panel="work"]'),
      skillsPanel: document.querySelector('[data-stack-panel="skills"]'),
      aboutPanel: document.querySelector('[data-stack-panel="about"]'),
    };
  }

  function getMetrics(sequence) {
    const styles = window.getComputedStyle(sequence);
    const topOffset = Number.parseFloat(styles.getPropertyValue("--stack-top")) || STACK_TOP_OFFSET;
    const panelGap = Number.parseFloat(styles.getPropertyValue("--stack-panel-gap")) || STACK_PANEL_GAP;
    return { topOffset, panelGap };
  }

  function resetPanels(elements) {
    if (elements.sequence) elements.sequence.style.minHeight = "";
    if (elements.bgFade) elements.bgFade.style.opacity = "";
    elements.projectStackItems.forEach((item) => {
      item.style.transform = "";
      item.style.boxShadow = "";
      item.style.visibility = "";
    });
    [elements.workPanel, elements.skillsPanel, elements.aboutPanel].forEach((panel) => {
      if (!panel) return;
      panel.style.transform = "";
      panel.style.boxShadow = "";
    });
  }

  function computeDistances() {
    const revealDistance = Math.max(STACK_MIN_REVEAL_DISTANCE, Math.round(window.innerHeight * STACK_REVEAL_RATIO));
    const dwellDistance = Math.round(revealDistance * STACK_DWELL_RATIO);
    const cardSlot = revealDistance + dwellDistance; // scroll distance "owned" by each card
    return { revealDistance, dwellDistance, cardSlot };
  }

  function sync() {
    const elements = getElements();
    const { sequence, sticky, bgFade, projectStack, projectStackItems, workPanel, skillsPanel, aboutPanel } = elements;

    if (!sequence || !sticky || !projectStackItems.length || !workPanel || !skillsPanel || !aboutPanel) {
      resetPanels(elements);
      return;
    }

    const { topOffset, panelGap } = getMetrics(sequence);
    const { revealDistance, cardSlot } = computeDistances();
    const numCards = projectStackItems.length;

    // workScrollDistance = scroll needed to fully reveal the last card
    const workScrollDistance = (numCards - 1) * cardSlot;
    const totalProgress = workScrollDistance + revealDistance * 2;
    const stickyHeight = sticky.offsetHeight;
    const sequenceHeight = stickyHeight + totalProgress + topOffset;
    const sequenceTop = sequence.offsetTop;
    const progress = clamp(window.scrollY - sequenceTop + topOffset, 0, totalProgress);

    sequence.style.minHeight = `${sequenceHeight}px`;

    // Use the grid's actual rendered height for clip accuracy
    const cardHeight = (projectStack ? projectStack.offsetHeight : 0) || (projectStackItems[0] ? projectStackItems[0].offsetHeight : 0);

    projectStackItems.forEach((item, i) => {
      // Card i slides in during: [(i-1)*cardSlot … (i-1)*cardSlot + revealDistance]
      const slideStart = (i - 1) * cardSlot;
      const slideProgress = i === 0
        ? 1
        : clamp((progress - slideStart) / revealDistance, 0, 1);

      // Card i starts being covered by card i+1 at: i*cardSlot
      const coverStart = i * cardSlot;
      const coverProgress = i >= numCards - 1
        ? 0
        : clamp((progress - coverStart) / revealDistance, 0, 1);

      const translateY = cardHeight * (1 - slideProgress);
      const scale = 1 - coverProgress * STACK_ZOOM_OUT;
      item.style.transform = `translateY(${translateY}px) scale(${scale})`;
      item.style.visibility = slideProgress <= 0 ? "hidden" : "";
      item.style.boxShadow = slideProgress > 0 && slideProgress < 1 ? STACK_ELEVATED_SHADOW : "";
    });

    // Animate main panels (skills + about slide in after all cards are revealed)
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

    // Fade background to --paper colour as the sequence enters, back out as it exits
    if (bgFade) {
      const rawScroll = window.scrollY - sequenceTop;
      const fadeIn = clamp(rawScroll / (revealDistance * 0.6), 0, 1);
      const fadeOut = clamp((rawScroll - totalProgress) / (revealDistance * 0.6), 0, 1);
      bgFade.style.opacity = fadeIn - fadeOut;
    }
  }

  function scrollToSkillsSection() {
    const { sequence, projectStackItems } = getElements();
    if (!sequence || !projectStackItems.length) return;

    const { topOffset } = getMetrics(sequence);
    const { cardSlot, revealDistance } = computeDistances();
    const workScrollDistance = (projectStackItems.length - 1) * cardSlot;
    const targetTop = sequence.offsetTop + workScrollDistance + revealDistance - topOffset;

    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  }

  function scrollToAboutSection() {
    const { sequence, projectStackItems } = getElements();
    if (!sequence || !projectStackItems.length) return;

    const { topOffset } = getMetrics(sequence);
    const { cardSlot, revealDistance } = computeDistances();
    const workScrollDistance = (projectStackItems.length - 1) * cardSlot;
    const targetTop = sequence.offsetTop + workScrollDistance + revealDistance * 2 - topOffset;

    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  }

  function scrollToWorkSection() {
    const { sequence } = getElements();
    if (!sequence) return;

    const { topOffset } = getMetrics(sequence);
    window.scrollTo({ top: Math.max(0, sequence.offsetTop - topOffset), behavior: "smooth" });
  }

  function initialize() {
    sync();

    if (initialized) return;
    initialized = true;

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
  }

  window.portfolioStack = {
    initialize,
    scrollToWorkSection,
    scrollToSkillsSection,
    scrollToAboutSection,
    sync,
  };
})();
