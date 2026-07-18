/*
海洋垃圾项目 - 介绍页脚本
Intro page script for the Marine Debris Project

此脚本负责介绍页的语言初始化和“开始体验”按钮交互。
This script handles language initialization and the start experience button on the intro page.
*/

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();

  const startButton = document.getElementById('startExperience');
  const oceanScene = document.querySelector('.ocean-scene');

  if (startButton) {
    startButton.addEventListener('click', () => {
      // 先播放从污染到清洁的短过渡，再进入影像页，避免点击后突兀跳转。
      if (oceanScene) {
        oceanScene.classList.remove('polluted');
        oceanScene.classList.add('clean');
        oceanScene.setAttribute('aria-live', 'polite');
      }
      startButton.textContent = translations[currentLanguage].startButton;
      startButton.classList.add('button-fade');
      // 700ms 与 CSS 的淡出节奏一致。
      setTimeout(() => {
        startButton.style.display = 'none';
        window.location.href = new URL('../empathy/index.html', window.location.href).href;
      }, 700);
    });
  }
});
