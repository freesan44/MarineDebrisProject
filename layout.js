/*
海洋垃圾项目 - 布局脚本
Marine Debris Project - Layout Script

此文件负责创建和管理网站的所有页面布局组件。
This file is responsible for creating and managing all page layout components of the website.

主要功能：
- 顶部导航栏创建和管理
- 页面映射和路由配置
- 语言切换器组件
- 响应式导航菜单

Main features:
- Top navigation bar creation and management
- Page mapping and routing configuration
- Language switcher component
- Responsive navigation menu

依赖：
- shared.js (翻译数据和工具函数)
- styles.css (样式定义)

Dependencies:
- shared.js (translation data and utility functions)
- styles.css (style definitions)
*/

// ============================================
// 页面导航配置
// ============================================

/**
 * 页面映射对象
 * 定义所有页面的路由、国际化键和备用文本
 * @type {Object<string, {href: string, i18n: string, fallback: string}>}
 */
// 发布新版本时同步修改此值与各页面的资源查询参数，避免 GitHub Pages 继续使用旧缓存。
const siteVersion = '20260720-1';

const pageMap = {
  intro: { href: `../../pages/intro/index.html?v=${siteVersion}`, i18n: 'tabIntro', fallback: '概览' },
  empathy: { href: `../../pages/empathy/index.html?v=${siteVersion}`, i18n: 'tabEmpathy', fallback: '影像' },
  game: { href: `../../pages/game/index.html?v=${siteVersion}`, i18n: 'tabGame', fallback: '清理游戏' },
  cleanup: { href: `../../pages/cleanup/index.html?v=${siteVersion}`, i18n: 'tabCleanup', fallback: '参与变化' },
  chart: { href: `../../pages/chart/index.html?v=${siteVersion}`, i18n: 'tabChart', fallback: '数据' },
  map: { href: `../../pages/map/index.html?v=${siteVersion}`, i18n: 'tabMap', fallback: '地图' },
  impact: { href: `../../pages/impact/index.html?v=${siteVersion}`, i18n: 'tabImpact', fallback: '影响' },
  actions: { href: `../../pages/actions/index.html?v=${siteVersion}`, i18n: 'tabActions', fallback: '行动' }
};

// ============================================
// 导航 UI 创建函数
// ============================================

/**
 * 创建顶部导航条
 * 包含品牌名、页面导航链接和语言切换器
 * @param {string} activePage - 当前活跃页面的标识符
 * @returns {HTMLElement} 构建的导航条 DOM 元素
 */
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
      <div class="tab-scroll-shell">
        <span class="tab-scroll-cue tab-scroll-cue-left" aria-hidden="true">‹</span>
        <div class="tab-nav top-tab-nav" aria-label="学习模块切换">
          ${links}
        </div>
        <span class="tab-scroll-cue tab-scroll-cue-right" aria-hidden="true">›</span>
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

/**
 * 保证当前标签始终可见，但只移动导航条本身，不改变页面纵向位置。
 * 【地图】【影响】【行动】会停在偏左位置，给右侧后续标签留出可发现空间。
 * @param {HTMLElement} nav - 已插入页面的顶部导航元素
 * @param {string} activePage - 当前页面标识
 */
function initTabScroll(nav, activePage) {
  const shell = nav.querySelector('.tab-scroll-shell');
  const tabNav = nav.querySelector('.top-tab-nav');
  const activeTab = tabNav?.querySelector('.tab-btn.active');
  if (!shell || !tabNav || !activeTab) return;

  const updateScrollCues = () => {
    // 留出少量阈值，避免小数滚动值让左右提示反复闪烁。
    const threshold = 6;
    const maxScroll = Math.max(0, tabNav.scrollWidth - tabNav.clientWidth);
    shell.classList.toggle('can-scroll-left', tabNav.scrollLeft > threshold);
    shell.classList.toggle('can-scroll-right', tabNav.scrollLeft < maxScroll - threshold);
  };

  const alignActiveTab = () => {
    const maxScroll = Math.max(0, tabNav.scrollWidth - tabNav.clientWidth);
    if (maxScroll <= 0) {
      tabNav.scrollLeft = 0;
      updateScrollCues();
      return;
    }

    const activeCenter = activeTab.offsetLeft + activeTab.offsetWidth / 2;
    const rightSidePages = new Set(['map', 'impact', 'actions']);
    const viewportAnchor = rightSidePages.has(activePage) ? 0.42 : 0.5;
    const target = Math.min(maxScroll, Math.max(0, activeCenter - tabNav.clientWidth * viewportAnchor));

    tabNav.scrollTo({ left: target, behavior: 'auto' });
    window.requestAnimationFrame(updateScrollCues);
  };

  const scheduleAlignment = () => {
    // 连续两帧等待字体和导航尺寸稳定，避免按旧宽度计算目标位置。
    window.requestAnimationFrame(() => window.requestAnimationFrame(alignActiveTab));
  };

  tabNav.addEventListener('scroll', updateScrollCues, { passive: true });
  nav.querySelector('#languageSwitch')?.addEventListener('change', scheduleAlignment);
  window.addEventListener('resize', scheduleAlignment);
  document.addEventListener('DOMContentLoaded', scheduleAlignment, { once: true });
  document.fonts?.ready.then(scheduleAlignment);
  scheduleAlignment();
}

// ============================================
// 页脚创建函数
// ============================================

/**
 * 创建页脚元素
 * 包含版权或免责声明信息
 * @returns {HTMLElement} 构建的页脚 DOM 元素
 */
function createFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `<p data-i18n="footerText">copyright © 2026 KCGI group 22 All rights reserved.</p>`;
  return footer;
}

// ============================================
// 布局注入和初始化
// ============================================

/**
 * 注入全局布局元素（导航和页脚）
 * 为所有页面提供统一的顶部导航和底部页脚
 * 自动计算导航条高度并调整页面内边距
 * 响应式处理窗口大小变化
 */
function injectLayout() {
  const body = document.body;
  const activePage = body.dataset.page || 'intro';
  
  // 创建并注入顶部导航条
  const nav = createTopNav(activePage);
  body.prepend(nav);
  initTabScroll(nav, activePage);

  // 计算导航条高度并设置页面顶部内边距
  const syncBodyOffset = () => {
    const navHeight = nav.offsetHeight || 0;
    body.style.paddingTop = `${navHeight + 12}px`;
  };
  syncBodyOffset();
  
  // 监听窗口大小变化，响应式调整内边距
  window.addEventListener('resize', syncBodyOffset);

  // 将页脚插入到主要内容之后，或如果没有main元素则添加到body末尾
  const main = document.querySelector('main');
  if (main) {
    main.insertAdjacentElement('afterend', createFooter());
  } else {
    body.appendChild(createFooter());
  }
}

// ============================================
// 应用初始化入口
// ============================================

// 页面加载完成后立即注入布局
injectLayout();
