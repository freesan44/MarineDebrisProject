/*
海洋垃圾项目 - 参与变化页脚本
Cleanup page script for the Marine Debris Project

此脚本负责模拟场景切换、页面语言本地化、以及清理影响的实时可视化更新。
This script handles scenario switching, localization, and cleanup impact visualization for the cleanup page.
*/

// 模拟区域需要同时更新进度、图片、说明和三个结果字段。
const statusFill = document.getElementById('statusFill');
const statusText = document.getElementById('statusText');
const impactVisual = document.getElementById('impactVisual');
const simulationButtons = document.querySelectorAll('.simulation-button');
const simulationImage = document.getElementById('simulationImage');
const simulationImageCaption = document.getElementById('simulationImageCaption');
const debrisLevelText = document.getElementById('debrisLevelText');
const marineLifeText = document.getElementById('marineLifeText');
const waterColorText = document.getElementById('waterColorText');

// 保存当前场景，确保切换语言后仍停留在用户选择的清理阶段。
let currentScenario = 'current';

// 场景配置只描述数据，具体 DOM 更新统一由 updateSimulationInfo 完成。
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
  // 恢复度与剩余垃圾量互补，并限制在合法百分比范围内。
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

  // 按钮激活态、图片和结果必须在同一次更新中保持一致。
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

// 语言切换只重绘当前场景，不把用户强制切回“当前状态”。
window.onLanguageChanged = () => {
  updateSimulationInfo(currentScenario);
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  setupSimulationControls();
  updateSimulationInfo(currentScenario);
});
