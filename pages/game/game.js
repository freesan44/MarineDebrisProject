/* Marine Debris Project - Cleanup Game */

const initialHealth = 20;
const maxHealth = 100;
const assetBase = '../../assets/game/diagnosis/';

const debrisTypes = [
  {
    id: 'plastic',
    image: 'plastic.png',
    labels: { zh: '塑料袋', ja: 'ビニール袋', en: 'Plastic bag' }
  },
  {
    id: 'fragments',
    image: 'fragments.png',
    labels: { zh: '塑料碎片', ja: 'プラスチック片', en: 'Plastic fragments' }
  },
  {
    id: 'net',
    image: 'net.png',
    labels: { zh: '废弃渔网', ja: '廃棄漁網', en: 'Discarded fishing net' }
  },
  {
    id: 'bottle',
    image: 'bottle.png',
    labels: { zh: '塑料瓶', ja: 'プラスチックボトル', en: 'Plastic bottle' }
  },
  {
    id: 'coral-debris',
    image: 'coral-debris.png',
    labels: { zh: '珊瑚区塑料垃圾', ja: 'サンゴ礁のプラスチックごみ', en: 'Plastic debris on coral' }
  }
];

const gameLevels = [
  {
    id: 'turtle',
    theme: 'philippines',
    animalImage: 'turtle.png',
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
    animalImage: 'albatross.png',
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
    animalImage: 'seal.png',
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
    animalImage: 'dolphin.png',
    primaryDebrisId: 'bottle',
    labels: {
      zh: { animal: '海豚', sea: '地中海', pollution: '塑料瓶', treatment: '清除垃圾' },
      ja: { animal: 'イルカ', sea: '地中海', pollution: 'プラスチックボトル', treatment: 'ごみを取り除く' },
      en: { animal: 'Dolphin', sea: 'Mediterranean Sea', pollution: 'Plastic bottle', treatment: 'Remove the debris' }
    }
  },
  {
    id: 'coral',
    theme: 'australia',
    animalImage: 'coral.png',
    primaryDebrisId: 'coral-debris',
    labels: {
      zh: { animal: '珊瑚', sea: '澳大利亚', pollution: '塑料与白化', treatment: '清理垃圾并恢复生态' },
      ja: { animal: 'サンゴ', sea: 'オーストラリア', pollution: 'プラスチックと白化', treatment: 'ごみを除去し生態を回復する' },
      en: { animal: 'Coral', sea: 'Australia', pollution: 'Plastic and bleaching', treatment: 'Clean debris and restore the ecosystem' }
    }
  }
];

const debrisPositions = [
  'trash-top-left',
  'trash-top-right',
  'trash-mid-left',
  'trash-mid-right',
  'trash-bottom-left',
  'trash-bottom-right'
];

let currentLevelIndex = 0;
let currentRound = 1;
let currentDebris = [];
let completedLevels = new Set();

const gameInstructionsElement = document.getElementById('game-instructions');
const healthValue = document.getElementById('healthValue');
const gameProgressFill = document.getElementById('gameProgressFill');
const gameProgressText = document.getElementById('gameProgressText');
const restartGameButton = document.getElementById('restartGameButton');
const nextLevelButton = document.getElementById('nextLevelButton');
const diagnosisSea = document.getElementById('diagnosisSea');
const diagnosisAnimal = document.getElementById('diagnosisAnimal');
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

function t(key, values = {}) {
  const template = translations[currentLanguage]?.[key] || key;
  return formatTemplate(template, values);
}

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

function createLevelDebris(level) {
  const primary = debrisTypes.find(debris => debris.id === level.primaryDebrisId);
  const otherDebris = shuffle(debrisTypes.filter(debris => debris.id !== level.primaryDebrisId));
  const extraCount = 1 + Math.floor(Math.random() * 3);
  const selectedDebris = shuffle([primary, ...otherDebris.slice(0, extraCount)]);
  const positions = shuffle(debrisPositions);

  return selectedDebris.map((debris, index) => ({
    instanceId: `${level.id}-${debris.id}-${index}`,
    debris,
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

function renderDebris() {
  if (!diagnosisDebrisLayer) return;
  diagnosisDebrisLayer.innerHTML = '';

  currentDebris.forEach(item => {
    const debrisName = getDebrisCopy(item.debris);
    const button = document.createElement('button');
    const image = document.createElement('img');

    button.type = 'button';
    button.className = `diagnosis-trash ${item.positionClass}`;
    button.dataset.debris = item.debris.id;
    button.dataset.debrisInstance = item.instanceId;
    button.setAttribute('aria-label', t('gameDebrisButtonLabel', { debris: debrisName }));
    button.title = debrisName;
    button.addEventListener('click', () => removeDebris(item.instanceId));

    image.src = `${assetBase}${item.debris.image}`;
    image.alt = t('gameDebrisAlt', { debris: debrisName });
    button.appendChild(image);
    diagnosisDebrisLayer.appendChild(button);
  });
}

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

function updateLevelState() {
  const complete = isCurrentLevelComplete();
  diagnosisSea?.classList.toggle('is-restored', complete);
  updateDashboard();
  updateInstructions();
  updateActions();
}

function renderLevel() {
  const level = gameLevels[currentLevelIndex];
  const copy = getLevelCopy(level);

  if (diagnosisSea) {
    diagnosisSea.dataset.theme = level.theme;
    diagnosisSea.classList.remove('is-restored');
  }

  if (diagnosisAnimal) {
    diagnosisAnimal.src = `${assetBase}${level.animalImage}`;
    diagnosisAnimal.alt = t('gameAnimalAlt', copy);
  }

  renderDebris();
  updateLevelState();
}

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

function startNewSession() {
  completedLevels = new Set();
  currentLevelIndex = 0;
  currentRound = 1;
  currentDebris = createLevelDebris(gameLevels[0]);
  renderLevel();
}

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

window.onLanguageChanged = () => renderLevel();

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  restartGameButton?.addEventListener('click', resetCurrentLevel);
  nextLevelButton?.addEventListener('click', openRandomRemainingLevel);
  startNewSession();
});
