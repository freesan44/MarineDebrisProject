/*
海洋垃圾项目 - 影像页脚本
Empathy page script for the Marine Debris Project

此脚本负责页面语言初始化，并增加影像卡片的交互效果。
This script initializes language support for the empathy page and adds image card interactions.
*/

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();

  // 点击卡片在新标签查看原图；noopener 防止新页面访问当前窗口对象。
  const imageCards = document.querySelectorAll('.image-card');
  imageCards.forEach(card => {
    card.addEventListener('click', () => {
      const image = card.querySelector('img');
      if (image?.src) {
        window.open(image.src, '_blank', 'noopener');
      }
    });
  });
});
