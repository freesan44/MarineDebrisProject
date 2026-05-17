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
      if (oceanScene) {
        oceanScene.classList.remove('polluted');
        oceanScene.classList.add('clean');
        oceanScene.setAttribute('aria-live', 'polite');
      }
      startButton.textContent = translations[currentLanguage].startButton;
      startButton.classList.add('button-fade');
      setTimeout(() => {
        startButton.style.display = 'none';
        window.location.href = new URL('../empathy/index.html', window.location.href).href;
      }, 700);
    });
  }
});