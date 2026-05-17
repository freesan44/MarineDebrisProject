/*
海洋垃圾项目 - 行动页脚本
Actions page script for the Marine Debris Project

此脚本负责页面语言初始化，并添加行动建议条目的交互反馈。
This script initializes language support for the actions page and adds interaction feedback for action items.
*/

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();

  const actionItems = document.querySelectorAll('.actions ul li');
  actionItems.forEach(item => {
    item.addEventListener('click', () => {
      actionItems.forEach(other => other.classList.remove('selected'));
      item.classList.add('selected');
    });
  });
});