(function () {
  const STACK_TOP_OFFSET = 104;
  const STACK_PANEL_GAP = 24;
  const STACK_MIN_REVEAL_DISTANCE = 220;
  const STACK_REVEAL_RATIO = 0.42;
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
      workScroll: document.querySelector("[data-stack-scroll]"),
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

  function sync() {
    const elements = getElements();
    const { sequence, sticky, workScroll, workPanel, skillsPanel, aboutPanel } = elements;

    if (!sequence || !sticky || !workScroll || !workPanel || !skillsPanel || !aboutPanel) {
      resetPanels(elements);
      return;
    }

    const { topOffset, panelGap } = getMetrics(sequence);
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

  function scrollToAboutSection() {
    const elements = getElements();
    const { sequence, sticky, workScroll } = elements;

    if (!sequence || !sticky || !workScroll) return;

    const { topOffset } = getMetrics(sequence);
    const revealDistance = Math.max(STACK_MIN_REVEAL_DISTANCE, Math.round(window.innerHeight * STACK_REVEAL_RATIO));
    const workScrollDistance = Math.max(0, workScroll.scrollHeight - workScroll.clientHeight);
    const targetTop = sequence.offsetTop + workScrollDistance + revealDistance * 2 - topOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });
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
    scrollToAboutSection,
    sync,
  };
})();
