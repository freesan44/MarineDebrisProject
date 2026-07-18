/*
海洋垃圾项目 - 海洋问诊清理游戏
Marine Debris Project - Diagnosis Cleanup Game

流程：固定从海龟关开始；每关保留主要污染物，再随机加入 1-3 种其他垃圾；
全部清除后才把污染对象切换为健康素材，并从尚未体验的关卡中随机进入下一关。
*/

// 健康度按本关清理比例从 20% 线性恢复到 100%。
const initialHealth = 20;
const maxHealth = 100;
const clinicAssetBase = '../../assets/game/clinic/';

// 垃圾定义只保存素材与名称；出现在哪一关由 createLevelDebris 动态决定。
const debrisTypes = [
  {
    id: 'plastic',
    image: `${clinicAssetBase}turtle-debris.png`,
    labels: { zh: '塑料袋', ja: 'ビニール袋', en: 'Plastic bag' }
  },
  {
    id: 'fragments',
    image: `${clinicAssetBase}albatross-debris.png`,
    labels: { zh: '塑料碎片', ja: 'プラスチック片', en: 'Plastic fragments' }
  },
  {
    id: 'net',
    image: `${clinicAssetBase}seal-debris.png`,
    labels: { zh: '废弃渔网', ja: '廃棄漁網', en: 'Discarded fishing net' }
  },
  {
    id: 'film',
    image: `${clinicAssetBase}dolphin-debris.png`,
    labels: { zh: '塑料薄膜', ja: 'プラスチックフィルム', en: 'Plastic film' }
  }
];

// 每个关卡指定对象、主题背景和必须出现的主要污染物。
const gameLevels = [
  {
    id: 'turtle',
    theme: 'philippines',
    roomImage: `${clinicAssetBase}turtle-room.png`,
    chartImages: {
      ja: `${clinicAssetBase}turtle-chart.png`,
      zh: `${clinicAssetBase}turtle-chart-zh.webp`,
      en: `${clinicAssetBase}turtle-chart-en.webp`
    },
    pollutedImage: `${clinicAssetBase}turtle-before.png`,
    animalImage: `${clinicAssetBase}turtle-after.png`,
    primaryDebrisId: 'plastic',
    labels: {
      zh: { animal: '海龟', sea: '菲律宾', pollution: '塑料袋', treatment: '取出塑料袋' },
      ja: { animal: 'ウミガメ', sea: 'フィリピン海域', pollution: 'ビニール袋', treatment: 'ビニール袋を取り除く' },
      en: { animal: 'Sea turtle', sea: 'Philippine waters', pollution: 'Plastic bag', treatment: 'Remove the plastic bag' }
    }
  },
  {
    id: 'albatross',
    theme: 'hawaii',
    roomImage: `${clinicAssetBase}albatross-room.png`,
    chartImages: {
      ja: `${clinicAssetBase}albatross-chart.png`,
      zh: `${clinicAssetBase}albatross-chart-zh.webp`,
      en: `${clinicAssetBase}albatross-chart-en.webp`
    },
    pollutedImage: `${clinicAssetBase}albatross-before.png`,
    animalImage: `${clinicAssetBase}albatross-after.png`,
    primaryDebrisId: 'fragments',
    labels: {
      zh: { animal: '信天翁', sea: '夏威夷附近', pollution: '塑料碎片', treatment: '清理胃中塑料' },
      ja: { animal: 'アホウドリ', sea: 'ハワイ周辺', pollution: 'プラスチック片', treatment: '胃の中のプラスチックを取り除く' },
      en: { animal: 'Albatross', sea: 'Near Hawaii', pollution: 'Plastic fragments', treatment: 'Clear plastic from the stomach' }
    }
  },
  {
    id: 'seal',
    theme: 'north-pacific',
    roomImage: `${clinicAssetBase}seal-room.png`,
    chartImages: {
      ja: `${clinicAssetBase}seal-chart.png`,
      zh: `${clinicAssetBase}seal-chart-zh.webp`,
      en: `${clinicAssetBase}seal-chart-en.webp`
    },
    pollutedImage: `${clinicAssetBase}seal-before.png`,
    animalImage: `${clinicAssetBase}seal-after.png`,
    primaryDebrisId: 'net',
    labels: {
      zh: { animal: '海豹', sea: '北太平洋', pollution: '废弃渔网', treatment: '剪断渔网' },
      ja: { animal: 'アザラシ', sea: '北太平洋', pollution: '廃棄漁網', treatment: '漁網を切り離す' },
      en: { animal: 'Seal', sea: 'North Pacific', pollution: 'Discarded fishing net', treatment: 'Cut the fishing net' }
    }
  },
  {
    id: 'dolphin',
    theme: 'mediterranean',
    roomImage: `${clinicAssetBase}dolphin-room.png`,
    chartImages: {
      ja: `${clinicAssetBase}dolphin-chart.png`,
      zh: `${clinicAssetBase}dolphin-chart-zh.webp`,
      en: `${clinicAssetBase}dolphin-chart-en.webp`
    },
    pollutedImage: `${clinicAssetBase}dolphin-before.png`,
    animalImage: `${clinicAssetBase}dolphin-after.png`,
    primaryDebrisId: 'film',
    labels: {
      zh: { animal: '海豚', sea: '北太平洋', pollution: '塑料薄膜', treatment: '移除覆盖呼吸孔的薄膜' },
      ja: { animal: 'イルカ', sea: '北太平洋', pollution: 'プラスチックフィルム', treatment: '噴気孔を覆うフィルムを取り除く' },
      en: { animal: 'Dolphin', sea: 'North Pacific', pollution: 'Plastic film', treatment: 'Remove film covering the blowhole' }
    }
  }
];

// 位置类由 CSS 控制，随机打乱后可避免垃圾每次出现在同一处。
const debrisPositions = [
  'trash-top-left',
  'trash-top-right',
  'trash-mid-left',
  'trash-mid-right',
  'trash-bottom-left',
  'trash-bottom-right'
];

// 会话状态仅保存在当前页面内；刷新页面会重新从海龟关开始。
let currentLevelIndex = 0;
let currentRound = 1;
let currentDebris = [];
let completedLevels = new Set();

// 缓存频繁更新的界面节点，渲染函数只负责写入状态，不重复查询 DOM。
const gameInstructionsElement = document.getElementById('game-instructions');
const healthValue = document.getElementById('healthValue');
const gameProgressFill = document.getElementById('gameProgressFill');
const gameProgressText = document.getElementById('gameProgressText');
const restartGameButton = document.getElementById('restartGameButton');
const nextLevelButton = document.getElementById('nextLevelButton');
const diagnosisSea = document.getElementById('diagnosisSea');
const diagnosisRoomImage = document.getElementById('diagnosisRoomImage');
const diagnosisPatient = document.getElementById('diagnosisPatient');
const diagnosisPollutedAnimal = document.getElementById('diagnosisPollutedAnimal');
const diagnosisAnimal = document.getElementById('diagnosisAnimal');
const diagnosisChartImage = document.getElementById('diagnosisChartImage');
const diagnosisDebrisLayer = document.getElementById('diagnosisDebrisLayer');
const levelAnimalName = document.getElementById('levelAnimalName');
const levelHabitat = document.getElementById('levelHabitat');
const levelPollution = document.getElementById('levelPollution');
const levelTreatment = document.getElementById('levelTreatment');
const levelDebrisCount = document.getElementById('levelDebrisCount');
const gameRoundText = document.getElementById('gameRoundText');
const gameRemainingText = document.getElementById('gameRemainingText');
const gameStepOne = document.getElementById('gameStepOne');
const gameStepTwo = document.getElementById('gameStepTwo');
const gameStepThree = document.getElementById('gameStepThree');

/** 读取当前语言模板并替换 {placeholder}。 */
function t(key, values = {}) {
  const template = translations[currentLanguage]?.[key] || key;
  return formatTemplate(template, values);
}

/** 使用 Fisher-Yates 算法返回新数组，不改变原始配置顺序。 */
function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function getLevelCopy(level = gameLevels[currentLevelIndex]) {
  return level.labels[currentLanguage] || level.labels.zh;
}

function getDebrisCopy(debris) {
  return debris.labels[currentLanguage] || debris.labels.zh;
}

/**
 * 为关卡创建本轮可点击垃圾。
 * 主要污染物始终出现，额外垃圾数量在 1-3 种之间随机选择。
 */
function createLevelDebris(level) {
  const primary = debrisTypes.find(debris => debris.id === level.primaryDebrisId);
  const otherDebris = shuffle(debrisTypes.filter(debris => debris.id !== level.primaryDebrisId));
  const extraCount = 1 + Math.floor(Math.random() * 3);
  const selectedDebris = shuffle([primary, ...otherDebris.slice(0, extraCount)]);
  const positions = shuffle(debrisPositions);

  return selectedDebris.map((debris, index) => ({
    instanceId: `${level.id}-${debris.id}-${index}`,
    debris,
    isPrimary: debris.id === level.primaryDebrisId,
    positionClass: positions[index],
    removed: false
  }));
}

function getRemovedDebrisCount() {
  return currentDebris.filter(item => item.removed).length;
}

function isCurrentLevelComplete() {
  return currentDebris.length > 0 && currentDebris.every(item => item.removed);
}

function getHealth() {
  if (!currentDebris.length) return initialHealth;
  const restored = (getRemovedDebrisCount() / currentDebris.length) * (maxHealth - initialHealth);
  return Math.round(initialHealth + restored);
}

function getOverallPercent() {
  return Math.round((completedLevels.size / gameLevels.length) * 100);
}

// ---------- 诊疗室污染物渲染 ----------
function renderDebris() {
  if (!diagnosisDebrisLayer) return;
  diagnosisDebrisLayer.innerHTML = '';

  currentDebris.forEach(item => {
    const debrisName = getDebrisCopy(item.debris);
    const button = document.createElement('button');
    const image = document.createElement('img');

    button.type = 'button';
    button.className = `diagnosis-trash ${item.positionClass}${item.isPrimary ? ' is-primary' : ''}`;
    button.dataset.debris = item.debris.id;
    button.dataset.debrisInstance = item.instanceId;
    button.setAttribute('aria-label', t('gameDebrisButtonLabel', { debris: debrisName }));
    button.title = debrisName;
    button.addEventListener('click', () => removeDebris(item.instanceId));

    image.src = item.debris.image;
    image.alt = t('gameDebrisAlt', { debris: debrisName });
    button.appendChild(image);
    diagnosisDebrisLayer.appendChild(button);
  });
}

// ---------- 文案、诊断面板与操作按钮同步 ----------
function updateInstructions() {
  if (!gameInstructionsElement) return;
  const copy = getLevelCopy();
  const values = {
    ...copy,
    cleaned: getRemovedDebrisCount(),
    total: currentDebris.length
  };

  if (isCurrentLevelComplete()) {
    const key = completedLevels.size === gameLevels.length
      ? 'gameAllCompleteMessage'
      : 'gameLevelCompleteMessage';
    gameInstructionsElement.textContent = t(key, values);
  } else if (getRemovedDebrisCount() > 0) {
    gameInstructionsElement.textContent = t('gameLevelProgressMessage', values);
  } else {
    gameInstructionsElement.textContent = t('gameLevelInstruction', values);
  }
}

function updateDashboard() {
  const copy = getLevelCopy();
  const health = getHealth();
  const overallPercent = getOverallPercent();
  const cleanedDebris = getRemovedDebrisCount();
  const remainingLevels = gameLevels.length - completedLevels.size;

  if (levelAnimalName) levelAnimalName.textContent = copy.animal;
  if (levelHabitat) levelHabitat.textContent = copy.sea;
  if (levelPollution) levelPollution.textContent = copy.pollution;
  if (levelTreatment) levelTreatment.textContent = copy.treatment;
  if (levelDebrisCount) {
    levelDebrisCount.textContent = t('gameDebrisCountText', {
      cleaned: cleanedDebris,
      total: currentDebris.length
    });
  }
  if (gameRoundText) {
    gameRoundText.textContent = t('gameRoundText', {
      current: currentRound,
      total: gameLevels.length
    });
  }
  if (gameRemainingText) {
    const key = completedLevels.size === gameLevels.length
      ? 'gameAllStationsComplete'
      : 'gameRemainingLevelsText';
    gameRemainingText.textContent = t(key, { remaining: remainingLevels });
  }
  if (healthValue) healthValue.textContent = `${health}%`;
  if (gameProgressFill) gameProgressFill.style.width = `${overallPercent}%`;
  if (gameProgressText) {
    gameProgressText.textContent = t('gameProgressText', {
      cleaned: completedLevels.size,
      total: gameLevels.length,
      percent: overallPercent
    });
  }

  document.querySelector('.health-ring')?.style.setProperty('--health', `${health}%`);

  if (gameStepOne) gameStepOne.textContent = t('gameStep1', copy);
  if (gameStepTwo) {
    gameStepTwo.textContent = t('gameStep2', {
      ...copy,
      total: currentDebris.length
    });
  }
  if (gameStepThree) gameStepThree.textContent = t('gameStep3');
}

function updateActions() {
  const complete = isCurrentLevelComplete();
  const allComplete = completedLevels.size === gameLevels.length;

  if (restartGameButton) restartGameButton.textContent = t('restartGameButton');
  if (nextLevelButton) {
    nextLevelButton.disabled = !complete;
    const key = allComplete
      ? 'restartSessionButton'
      : complete
        ? 'randomNextLevelButton'
        : 'nextLevelLockedButton';
    nextLevelButton.textContent = t(key);
  }
}

/** 一次状态变更后集中刷新画面，避免各点击处理器分别更新界面。 */
function updateLevelState() {
  const complete = isCurrentLevelComplete();
  diagnosisSea?.classList.toggle('is-restored', complete);
  diagnosisPatient?.classList.toggle('is-restored', complete);
  updateDashboard();
  updateInstructions();
  updateActions();
}

/** 根据当前关卡切换背景、污染对象、健康对象和随机垃圾。 */
function renderLevel() {
  const level = gameLevels[currentLevelIndex];
  const copy = getLevelCopy(level);
  const chartImage = level.chartImages[currentLanguage] || level.chartImages.ja;

  if (diagnosisSea) {
    diagnosisSea.dataset.theme = level.theme;
    diagnosisSea.dataset.scene = 'clinic';
    diagnosisSea.classList.remove('is-restored');
  }

  if (diagnosisRoomImage) {
    diagnosisRoomImage.src = level.roomImage;
    diagnosisRoomImage.alt = t('gameClinicRoomAlt', { animal: copy.animal });
  }

  if (diagnosisPatient) {
    diagnosisPatient.dataset.patient = level.id;
    diagnosisPatient.classList.remove('is-restored');
  }

  if (diagnosisPollutedAnimal) {
    diagnosisPollutedAnimal.style.backgroundImage = `url("${level.pollutedImage}")`;
    diagnosisPollutedAnimal.setAttribute('aria-label', t('gamePollutedAnimalAlt', { animal: copy.animal }));
  }

  if (diagnosisAnimal) {
    diagnosisAnimal.src = level.animalImage;
    diagnosisAnimal.alt = t('gameRestoredAnimalAlt', { animal: copy.animal });
  }

  if (diagnosisChartImage) {
    diagnosisChartImage.hidden = false;
    diagnosisChartImage.src = chartImage;
    diagnosisChartImage.alt = t('gameDiagnosisChartAlt', { animal: copy.animal });
  }

  renderDebris();
  updateLevelState();
}

/** 标记垃圾已清除，并在最后一件垃圾移除时完成当前关卡。 */
function removeDebris(instanceId) {
  const item = currentDebris.find(debris => debris.instanceId === instanceId);
  if (!item || item.removed) return;

  item.removed = true;
  const button = diagnosisDebrisLayer?.querySelector(`[data-debris-instance="${instanceId}"]`);
  if (button) {
    button.disabled = true;
    button.classList.add('is-cleaned');
    window.setTimeout(() => button.remove(), 260);
  }

  if (isCurrentLevelComplete()) {
    completedLevels.add(gameLevels[currentLevelIndex].id);
  }
  updateLevelState();
}

function resetCurrentLevel() {
  const level = gameLevels[currentLevelIndex];
  completedLevels.delete(level.id);
  currentDebris = createLevelDebris(level);
  renderLevel();
}

/** 新会话必须从海龟关开始，这是整个游戏的固定入口。 */
function startNewSession() {
  completedLevels = new Set();
  currentLevelIndex = 0;
  currentRound = 1;
  currentDebris = createLevelDebris(gameLevels[0]);
  renderLevel();
}

/** 通关后只从未完成关卡中随机抽取，四关完成后重新开始。 */
function openRandomRemainingLevel() {
  if (!isCurrentLevelComplete()) return;
  if (completedLevels.size === gameLevels.length) {
    startNewSession();
    return;
  }

  const remainingIndexes = gameLevels
    .map((level, index) => ({ level, index }))
    .filter(item => !completedLevels.has(item.level.id))
    .map(item => item.index);

  currentLevelIndex = remainingIndexes[Math.floor(Math.random() * remainingIndexes.length)];
  currentRound = completedLevels.size + 1;
  currentDebris = createLevelDebris(gameLevels[currentLevelIndex]);
  renderLevel();
}

// 切换语言时重新渲染当前状态，不重置随机垃圾或通关进度。
window.onLanguageChanged = () => renderLevel();

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  restartGameButton?.addEventListener('click', resetCurrentLevel);
  nextLevelButton?.addEventListener('click', openRandomRemainingLevel);
  startNewSession();
});
