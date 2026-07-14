/*
海洋垃圾项目 - 参与变化页脚本
Cleanup page script for the Marine Debris Project

此脚本负责模拟场景切换、页面语言本地化、以及清理影响的实时可视化更新。
This script handles scenario switching, localization, and cleanup impact visualization for the cleanup page.
*/

const statusFill = document.getElementById('statusFill');
const statusText = document.getElementById('statusText');
const impactVisual = document.getElementById('impactVisual');
const simulationButtons = document.querySelectorAll('.simulation-button');
const simulationImage = document.getElementById('simulationImage');
const simulationImageCaption = document.getElementById('simulationImageCaption');
const debrisLevelText = document.getElementById('debrisLevelText');
const marineLifeText = document.getElementById('marineLifeText');
const waterColorText = document.getElementById('waterColorText');

let currentScenario = 'current';

const simulationScenarios = {
  current: {
    labelKey: 'simulationCurrent',
    debris: 80,
    marineLifeKey: 'marineLifePoor',
    waterColorKey: 'waterCloudy',
    imageSrc: '../../assets/generated/simulation-current.png',
    imageAltKey: 'simulationImageAltCurrent',
    imageCaptionKey: 'simulationImageCaptionCurrent',
    impactClass: 'impact-current'
  },
  partial: {
    labelKey: 'simulationPartial',
    debris: 45,
    marineLifeKey: 'marineLifeModerate',
    waterColorKey: 'waterModerate',
    imageSrc: '../../assets/generated/simulation-partial.png',
    imageAltKey: 'simulationImageAltPartial',
    imageCaptionKey: 'simulationImageCaptionPartial',
    impactClass: 'impact-moderate'
  },
  full: {
    labelKey: 'simulationFull',
    debris: 10,
    marineLifeKey: 'marineLifeHealthy',
    waterColorKey: 'waterClear',
    imageSrc: '../../assets/generated/simulation-full.png',
    imageAltKey: 'simulationImageAltFull',
    imageCaptionKey: 'simulationImageCaptionFull',
    impactClass: 'impact-clean'
  }
};

/**
 * 更新清理影响进度条
 * Update cleanup impact progress bar
 */
function updateCleanupImpact(scenarioKey = currentScenario) {
  const scenario = simulationScenarios[scenarioKey] || simulationScenarios.current;
  const percent = Math.min(100, Math.max(0, 100 - scenario.debris));
  if (statusFill) statusFill.style.width = `${percent}%`;
  if (statusText) statusText.textContent = translations[currentLanguage].statusText.replace('{percent}', percent);
  if (impactVisual) {
    impactVisual.classList.remove('impact-current', 'impact-moderate', 'impact-clean');
    impactVisual.classList.add(scenario.impactClass);
  }
}

/**
 * 更新模拟信息内容
 * Update simulation information content
 */
function updateSimulationInfo(scenarioKey) {
  const scenario = simulationScenarios[scenarioKey] || simulationScenarios.current;
  currentScenario = scenarioKey;

  simulationButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.scenario === scenarioKey);
  });

  if (debrisLevelText) debrisLevelText.textContent = `${scenario.debris}%`;
  if (marineLifeText) marineLifeText.textContent = translations[currentLanguage][scenario.marineLifeKey] || scenario.marineLifeKey;
  if (waterColorText) waterColorText.textContent = translations[currentLanguage][scenario.waterColorKey] || scenario.waterColorKey;
  if (simulationImage && scenario.imageSrc) simulationImage.src = scenario.imageSrc;
  if (simulationImage && scenario.imageAltKey) simulationImage.alt = translations[currentLanguage][scenario.imageAltKey] || scenario.imageAltKey;
  if (simulationImageCaption) simulationImageCaption.textContent = translations[currentLanguage][scenario.imageCaptionKey] || scenario.imageCaptionKey;
  updateCleanupImpact(scenarioKey);
}

/**
 * 绑定模拟按钮点击事件
 * Attach click events for scenario buttons
 */
function setupSimulationControls() {
  simulationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const scenario = button.dataset.scenario;
      if (!scenario || !simulationScenarios[scenario]) return;
      updateSimulationInfo(scenario);
    });
  });
}

window.onLanguageChanged = () => {
  updateSimulationInfo(currentScenario);
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  setupSimulationControls();
  updateSimulationInfo(currentScenario);
});
