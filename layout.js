const pageMap = {
  intro: { href: '../../pages/intro/index.html', i18n: 'tabIntro', fallback: '概览' },
  empathy: { href: '../../pages/empathy/index.html', i18n: 'tabEmpathy', fallback: '影像' },
  game: { href: '../../pages/game/index.html', i18n: 'tabGame', fallback: '清理游戏' },
  cleanup: { href: '../../pages/cleanup/index.html', i18n: 'tabCleanup', fallback: '参与变化' },
  chart: { href: '../../pages/chart/index.html', i18n: 'tabChart', fallback: '数据' },
  map: { href: '../../pages/map/index.html', i18n: 'tabMap', fallback: '地图' },
  impact: { href: '../../pages/impact/index.html', i18n: 'tabImpact', fallback: '影响' },
  actions: { href: '../../pages/actions/index.html', i18n: 'tabActions', fallback: '行动' }
};

function createTopNav(activePage) {
  const nav = document.createElement('nav');
  nav.className = 'top-nav';
  nav.setAttribute('aria-label', '主导航');

  const links = Object.keys(pageMap)
    .map(key => {
      const page = pageMap[key];
      const isActive = key === activePage ? ' active' : '';
      return `<a class="tab-btn${isActive}" href="${page.href}" data-i18n="${page.i18n}">${page.fallback}</a>`;
    })
    .join('');

  nav.innerHTML = `
    <div class="top-nav-inner">
      <div class="brand" data-i18n="heroEyebrow">守护日本周边海洋</div>
      <div class="tab-nav top-tab-nav" aria-label="学习模块切换">
        ${links}
      </div>
      <div class="language-switcher">
        <label for="languageSwitch" data-i18n="languageLabel">语言</label>
        <select id="languageSwitch" aria-label="Language selector">
          <option value="ja">日本語</option>
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  `;

  return nav;
}

function createFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `<p data-i18n="footerText">データは日本近海の海洋ごみ調査をもとにした教育用コンテンツです。</p>`;
  return footer;
}

function injectLayout() {
  const body = document.body;
  const activePage = body.dataset.page || 'intro';
  const nav = createTopNav(activePage);
  body.prepend(nav);

  const syncBodyOffset = () => {
    const navHeight = nav.offsetHeight || 0;
    body.style.paddingTop = `${navHeight + 12}px`;
  };
  syncBodyOffset();
  window.addEventListener('resize', syncBodyOffset);

  const main = document.querySelector('main');
  if (main) {
    main.insertAdjacentElement('afterend', createFooter());
  } else {
    body.appendChild(createFooter());
  }
}

injectLayout();
