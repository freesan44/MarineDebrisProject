/*
海洋垃圾项目 - 影响页脚本
Impact page script for the Marine Debris Project

此脚本负责页面语言初始化，并添加区域卡片点击高亮交互。
This script initializes language support for the impact page and adds highlight interactions for region cards.
*/

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();

  const impactArticles = document.querySelectorAll('.impact-path-card');
  impactArticles.forEach(article => {
    article.addEventListener('click', () => {
      impactArticles.forEach(item => item.classList.remove('selected', 'active'));
      article.classList.add('selected');
    });
  });
});
