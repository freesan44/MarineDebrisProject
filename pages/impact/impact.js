/*
海洋垃圾项目 - 生态影响页交互
Marine Debris Project - Impact Page Interactions

本页有两组独立交互：影响路径负责同步左侧选项与详情卡；视觉对照负责切换图片、
替代文本和说明。滚动出现动画只增强展示，不参与内容状态。
*/

/** 获取当前语言文案，缺键时返回键名以便调试。 */
function getImpactCopy(key) {
  return translations[currentLanguage]?.[key] || key;
}

/**
 * 建立影响路径选项，并返回一个可在语言切换后重复调用的刷新函数。
 */
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

/** 建立污染/恢复视觉对照，并同步按钮可访问状态。 */
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
      // Web Animations API 不可用时仍会正常换图，只省略过渡效果。
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

/** 内容进入视口后只播放一次出现动画，并兼容旧浏览器。 */
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

  // 首次进入页面也要刷新动态详情，否则会保留 HTML 中的中文后备文案。
  refreshPathway();
  refreshLens();
});
