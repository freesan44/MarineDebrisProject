/* Marine Debris Project - Impact page interactions */

function getImpactCopy(key) {
  return translations[currentLanguage]?.[key] || key;
}

function setupImpactPathways() {
  const buttons = [...document.querySelectorAll('.impact-path-card')];
  const detailNumber = document.getElementById('impactDetailNumber');
  const detailTitle = document.getElementById('impactDetailTitle');
  const detailText = document.getElementById('impactDetailText');
  const detailFlow = document.getElementById('impactDetailFlow');

  function selectPath(button) {
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });

    if (detailNumber) detailNumber.textContent = button.dataset.number;
    if (detailTitle) detailTitle.textContent = getImpactCopy(button.dataset.titleKey);
    if (detailText) detailText.textContent = getImpactCopy(button.dataset.textKey);
    if (detailFlow) detailFlow.textContent = getImpactCopy(button.dataset.flowKey);
  }

  buttons.forEach(button => button.addEventListener('click', () => selectPath(button)));

  return () => {
    const activeButton = buttons.find(button => button.classList.contains('active')) || buttons[0];
    if (activeButton) selectPath(activeButton);
  };
}

function setupImpactLens() {
  const buttons = [...document.querySelectorAll('.impact-lens-toolbar button')];
  const image = document.getElementById('impactLensImage');
  const caption = document.getElementById('impactLensCaption');

  function selectView(button, animate = true) {
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    if (image) {
      image.src = button.dataset.imageSrc;
      image.alt = getImpactCopy(button.dataset.altKey);
      if (animate && typeof image.animate === 'function') {
        image.animate(
          [
            { opacity: 0.45, transform: 'scale(1.015)' },
            { opacity: 1, transform: 'scale(1)' }
          ],
          { duration: 420, easing: 'ease-out' }
        );
      }
    }
    if (caption) caption.textContent = getImpactCopy(button.dataset.captionKey);
  }

  buttons.forEach(button => button.addEventListener('click', () => selectView(button)));

  return () => {
    const activeButton = buttons.find(button => button.classList.contains('active')) || buttons[0];
    if (activeButton) selectView(activeButton, false);
  };
}

function setupImpactReveal() {
  const items = document.querySelectorAll('.impact-story, .impact-system-band, .impact-lens, .impact-next-step');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(item => observer.observe(item));
}

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  const refreshPathway = setupImpactPathways();
  const refreshLens = setupImpactLens();
  setupImpactReveal();

  window.onLanguageChanged = () => {
    refreshPathway();
    refreshLens();
  };
});
