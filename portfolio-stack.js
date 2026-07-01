(function () {
  const STACK_TOP_OFFSET = 104;
  const STACK_PANEL_GAP = 24;
  const STACK_MIN_REVEAL_DISTANCE = 240;
  const STACK_REVEAL_RATIO = 0.38;
  const STACK_DWELL_RATIO = 1.0;
  const STACK_ABOUT_DWELL_RATIO = 2.5;
  const STACK_ZOOM_OUT = 0.06;
  const STACK_ELEVATED_SHADOW = "0 22px 48px rgba(15, 23, 42, 0.16)";
  const LERP_FACTOR = 0.1;

  let initialized = false;
  let smoothScrollY = -1;
  let rafId = null;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
      item.style.opacity = "";
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
    const cardSlot = revealDistance + dwellDistance;
    return { revealDistance, dwellDistance, cardSlot };
  }

  function applySync(scrollY) {
    const elements = getElements();
    const { sequence, sticky, bgFade, projectStack, projectStackItems, workPanel, skillsPanel, aboutPanel } = elements;

    if (!sequence || !sticky || !projectStackItems.length || !workPanel || !skillsPanel || !aboutPanel) {
      resetPanels(elements);
      return;
    }

    const { topOffset, panelGap } = getMetrics(sequence);
    const { revealDistance, cardSlot } = computeDistances();
    const numCards = projectStackItems.length;

    const workScrollDistance = (numCards - 1) * cardSlot;
    const aboutDwell = Math.round(revealDistance * STACK_ABOUT_DWELL_RATIO);
    const totalProgress = workScrollDistance + revealDistance * 2 + aboutDwell;
    const stickyHeight = sticky.offsetHeight;
    const sequenceHeight = stickyHeight + totalProgress + topOffset;
    const sequenceTop = sequence.offsetTop;
    const progress = clamp(scrollY - sequenceTop + topOffset, 0, totalProgress);

    sequence.style.minHeight = `${sequenceHeight}px`;

    const cardHeight = (projectStack ? projectStack.offsetHeight : 0) || (projectStackItems[0] ? projectStackItems[0].offsetHeight : 0);

    projectStackItems.forEach((item, i) => {
      const slideStart = (i - 1) * cardSlot;
      const slideProgress = i === 0
        ? 1
        : easeInOutCubic(clamp((progress - slideStart) / revealDistance, 0, 1));

      const coverStart = i * cardSlot;
      const coverProgress = i >= numCards - 1
        ? 0
        : easeInOutCubic(clamp((progress - coverStart) / revealDistance, 0, 1));

      const translateY = cardHeight * (1 - slideProgress);
      const scale = 1 - coverProgress * STACK_ZOOM_OUT;
      const opacity = clamp(1 - coverProgress * 1.15, 0, 1);
      item.style.transform = `translateY(${translateY}px) scale(${scale})`;
      item.style.opacity = opacity;
      item.style.visibility = slideProgress <= 0 ? "hidden" : "";
      item.style.boxShadow = slideProgress > 0 && slideProgress < 1 ? STACK_ELEVATED_SHADOW : "";
    });

    const skillsProgress = easeInOutCubic(clamp((progress - workScrollDistance) / revealDistance, 0, 1));
    const aboutProgress = easeInOutCubic(clamp((progress - workScrollDistance - revealDistance) / revealDistance, 0, 1));
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

    if (bgFade) {
      const rawScroll = scrollY - sequenceTop;
      const fadeIn = clamp(rawScroll / (revealDistance * 0.6), 0, 1);
      const fadeOut = clamp((rawScroll - totalProgress) / (revealDistance * 0.6), 0, 1);
      bgFade.style.opacity = fadeIn - fadeOut;
    }
  }

  function tick() {
    rafId = null;
    const target = window.scrollY;

    if (smoothScrollY < 0) smoothScrollY = target;

    smoothScrollY = lerp(smoothScrollY, target, LERP_FACTOR);
    applySync(smoothScrollY);

    if (Math.abs(smoothScrollY - target) > 0.25) {
      rafId = requestAnimationFrame(tick);
    } else {
      smoothScrollY = target;
      applySync(smoothScrollY);
    }
  }

  function scheduleSync() {
    if (!rafId) {
      rafId = requestAnimationFrame(tick);
    }
  }

  function sync() {
    smoothScrollY = window.scrollY;
    applySync(smoothScrollY);
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

    window.addEventListener("scroll", scheduleSync, { passive: true });
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
