(function () {
  const HERO_ENVELOPE_DISTANCE = 0.9;
  const HERO_ENVELOPE_MIN_DISTANCE = 520;
  const HERO_ENVELOPE_OPEN_END = 0.2;
  const HERO_ENVELOPE_RISE_START = 0.2;
  const HERO_ENVELOPE_RISE_END = 0.46;
  const HERO_ENVELOPE_SETTLE_START = 0.5;
  const HERO_ENVELOPE_SETTLE_END = 0.72;
  const HERO_ENVELOPE_UNFOLD_START = 0.72;
  const HERO_ENVELOPE_UNFOLD_END = 0.88;
  const HERO_ENVELOPE_CONTENT_START = 0.84;
  const HERO_ENVELOPE_CONTENT_END = 0.96;
  const HERO_ENVELOPE_OPEN_CLASS_THRESHOLD = 0.92;
  const HERO_CARD_SHOW_THRESHOLD = 0.03;

  let initialized = false;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getElements() {
    return {
      sequence: document.querySelector("[data-hero-sequence]"),
      sticky: document.querySelector("[data-hero-sticky]"),
      scene: document.querySelector("[data-hero-envelope]"),
      letter: document.querySelector(".scroll-envelope-letter"),
      heroCard: document.querySelector(".hero-card"),
    };
  }

  function getProgressState(scrollY, sequenceTop) {
    const revealDistance = Math.max(window.innerHeight * HERO_ENVELOPE_DISTANCE, HERO_ENVELOPE_MIN_DISTANCE);
    const progress = clamp((scrollY - sequenceTop) / revealDistance, 0, 1);

    return {
      revealDistance,
      progress,
      flapProgress: clamp(progress / HERO_ENVELOPE_OPEN_END, 0, 1),
      riseProgress: clamp(
        (progress - HERO_ENVELOPE_RISE_START) / (HERO_ENVELOPE_RISE_END - HERO_ENVELOPE_RISE_START),
        0,
        1,
      ),
      settleProgress: clamp(
        (progress - HERO_ENVELOPE_SETTLE_START) / (HERO_ENVELOPE_SETTLE_END - HERO_ENVELOPE_SETTLE_START),
        0,
        1,
      ),
      unfoldProgress: clamp(
        (progress - HERO_ENVELOPE_UNFOLD_START) / (HERO_ENVELOPE_UNFOLD_END - HERO_ENVELOPE_UNFOLD_START),
        0,
        1,
      ),
      contentProgress: clamp(
        (progress - HERO_ENVELOPE_CONTENT_START) / (HERO_ENVELOPE_CONTENT_END - HERO_ENVELOPE_CONTENT_START),
        0,
        1,
      ),
    };
  }

  function applyProgress(scene, progressState) {
    const { progress, flapProgress, riseProgress, settleProgress, unfoldProgress, contentProgress } = progressState;

    scene.style.setProperty("--envelope-progress", progress.toFixed(4));
    scene.style.setProperty("--envelope-flap-progress", flapProgress.toFixed(4));
    scene.style.setProperty("--envelope-rise-progress", riseProgress.toFixed(4));
    scene.style.setProperty("--envelope-settle-progress", settleProgress.toFixed(4));
    scene.style.setProperty("--envelope-content-progress", contentProgress.toFixed(4));
    scene.style.setProperty("--envelope-unfold-progress", unfoldProgress.toFixed(4));
    scene.classList.toggle("is-envelope-open", flapProgress > HERO_ENVELOPE_OPEN_CLASS_THRESHOLD);
  }

  function syncHeroCardHandoff(scene, letter, heroCard, settleProgress) {
    if (!letter || !heroCard) return;

    const finalWidth = heroCard.offsetWidth;
    const finalHeight = heroCard.offsetHeight;
    const sceneRect = scene.getBoundingClientRect();
    const sceneStyles = window.getComputedStyle(scene);
    const finalBottom = Number.parseFloat(sceneStyles.getPropertyValue("--hero-final-bottom")) || 96;
    const finalLeft = (sceneRect.width - finalWidth) / 2;
    const finalTop = sceneRect.height - finalBottom - finalHeight;
    const letterRect = letter.getBoundingClientRect();
    const letterLeft = letterRect.left - sceneRect.left;
    const letterTop = letterRect.top - sceneRect.top;
    const startScaleX = letterRect.width / finalWidth;
    const startScaleY = letterRect.height / finalHeight;
    const heroX = letterLeft + (finalLeft - letterLeft) * settleProgress;
    const heroY = letterTop + (finalTop - letterTop) * settleProgress;
    const heroScaleX = startScaleX + (1 - startScaleX) * settleProgress;
    const heroScaleY = startScaleY + (1 - startScaleY) * settleProgress;
    const heroOpacity = settleProgress > HERO_CARD_SHOW_THRESHOLD ? 1 : 0;

    heroCard.style.setProperty("--hero-card-x", `${heroX.toFixed(2)}px`);
    heroCard.style.setProperty("--hero-card-y", `${heroY.toFixed(2)}px`);
    heroCard.style.setProperty("--hero-card-scale-x", heroScaleX.toFixed(4));
    heroCard.style.setProperty("--hero-card-scale-y", heroScaleY.toFixed(4));
    heroCard.style.setProperty("--hero-card-opacity", heroOpacity.toFixed(4));
  }

  function sync() {
    const { sequence, sticky, scene, letter, heroCard } = getElements();
    if (!sequence || !sticky || !scene) return;

    const progressState = getProgressState(window.scrollY, sequence.offsetTop);
    sequence.style.minHeight = `${sticky.offsetHeight + progressState.revealDistance}px`;

    applyProgress(scene, progressState);
    syncHeroCardHandoff(scene, letter, heroCard, progressState.settleProgress);
  }

  function initialize() {
    const { sequence, sticky, scene } = getElements();
    if (!sequence || !sticky || !scene) return;

    sync();

    if (initialized) return;
    initialized = true;

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
  }

  window.heroEnvelope = {
    initialize,
    sync,
  };
})();
