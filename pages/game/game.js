/*
海洋垃圾项目 - 游戏页面脚本
Marine Debris Project - Game Page Script

此文件实现了一个教育性的海洋垃圾清理游戏。
This file implements an educational marine debris cleanup game.

主要功能：
- 垃圾分类和清理游戏逻辑
- 得分系统和进度跟踪
- 游戏状态管理和UI更新
- 教育性反馈和提示

Main features:
- Debris classification and cleanup game logic
- Scoring system and progress tracking
- Game state management and UI updates
- Educational feedback and hints

游戏机制：
- 玩家需要正确分类不同类型的海洋垃圾
- 积累得分并解锁区域清理进度
- 实时显示准确率和清理影响
- 支持多语言界面

Game mechanics:
- Players must correctly classify different types of marine debris
- Accumulate scores and unlock regional cleanup progress
- Real-time display of accuracy and cleanup impact
- Multi-language interface support

依赖：
- shared.js (垃圾数据和翻译)
- styles.css (游戏界面样式)

Dependencies:
- shared.js (debris data and translations)
- styles.css (game interface styles)
*/

let totalScore = 0;
let selectedRegion = null;
let totalAttempts = 0;
let correctAttempts = 0;
let totalDebrisCount = 0;
let gameQueue = [];
let currentDebrisType = null;

const gameInstructionsElement = document.getElementById('game-instructions');
const gameScoreEl = document.getElementById('gameScore');
const gameCorrectEl = document.getElementById('gameCorrect');
const gameRemainingEl = document.getElementById('gameRemaining');
const gameAccuracyEl = document.getElementById('gameAccuracy');
const gameProgressFill = document.getElementById('gameProgressFill');
const gameProgressText = document.getElementById('gameProgressText');
const currentDebrisCard = document.getElementById('currentDebrisCard');
const choiceButtons = document.querySelectorAll('.choice-button');
const restartGameButton = document.getElementById('restartGameButton');

function updateInstructions(message, success = true) {
  if (!gameInstructionsElement) return;
  gameInstructionsElement.textContent = message;
  gameInstructionsElement.style.color = success ? 'var(--accent-strong)' : 'var(--danger)';
}

function updateGameDashboard() {
  const remaining = currentDebrisType ? gameQueue.length + 1 : gameQueue.length;
  const completion = totalDebrisCount ? Math.round(((totalDebrisCount - remaining) / totalDebrisCount) * 100) : 0;
  const accuracy = totalAttempts ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  if (gameScoreEl) gameScoreEl.textContent = String(totalScore);
  if (gameCorrectEl) gameCorrectEl.textContent = String(correctAttempts);
  if (gameRemainingEl) gameRemainingEl.textContent = String(remaining);
  if (gameAccuracyEl) gameAccuracyEl.textContent = `${accuracy}%`;
  if (gameProgressFill) gameProgressFill.style.width = `${completion}%`;
  if (gameProgressText) {
    gameProgressText.textContent = formatTemplate(translations[currentLanguage].gameProgressText, { percent: completion });
  }
}

function refreshCurrentDebrisLabel() {
  if (!currentDebrisCard) return;
  if (!currentDebrisType) {
    currentDebrisCard.textContent = '✅';
    return;
  }
  const debris = debrisPieces[currentDebrisType];
  currentDebrisCard.textContent = getLocalizedLabel(debris.labelKey);
}

function showCurrentDebris() {
  if (!currentDebrisCard) return;
  currentDebrisType = gameQueue.shift() || null;
  if (!currentDebrisType) {
    currentDebrisCard.textContent = '✅';
    choiceButtons.forEach(btn => { btn.disabled = true; });
    updateInstructions(
      formatTemplate(translations[currentLanguage].gameProgressText, { percent: 100 }),
      true
    );
    updateGameDashboard();
    return;
  }
  refreshCurrentDebrisLabel();
  choiceButtons.forEach(btn => { btn.disabled = false; });
  updateGameDashboard();
}

function setupSortingGame() {
  gameQueue = Object.keys(debrisPieces);
  totalDebrisCount = gameQueue.length;
  totalScore = 0;
  totalAttempts = 0;
  correctAttempts = 0;
  showCurrentDebris();
  updateGameDashboard();
}

function setupChoiceButtons() {
  choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!currentDebrisType) return;
      handleChoice(button.dataset.target);
    });
  });
}

function setupRestartGameButton() {
  if (!restartGameButton) return;
  restartGameButton.addEventListener('click', () => {
    setupSortingGame();
    updateInstructions(translations[currentLanguage].gameInstructions, true);
  });
}

function handleChoice(target) {
  const type = currentDebrisType;
  const debris = debrisPieces[type];
  const itemLabel = getLocalizedLabel(debris?.labelKey || '');
  totalAttempts += 1;

  if (!debris) {
    updateInstructions(translations[currentLanguage].instructionUnknown, false);
    return;
  }

  const correct = debris.target === target;
  if (correct) {
    totalScore += debris.score;
    correctAttempts += 1;
    updateInstructions(
      formatTemplate(translations[currentLanguage].instructionCorrect, {
        item: itemLabel,
        score: debris.score,
        totalScore
      }),
      true
    );
    showCurrentDebris();
    updateGameDashboard();
  } else {
    updateInstructions(
      formatTemplate(translations[currentLanguage].instructionWrong, {
        item: itemLabel
      }),
      false
    );
    updateGameDashboard();
  }
}

window.onLanguageChanged = () => {
  refreshCurrentDebrisLabel();
  updateGameDashboard();
  updateInstructions(translations[currentLanguage].gameInstructions, true);
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  setupChoiceButtons();
  setupRestartGameButton();
  setupSortingGame();
  updateInstructions(translations[currentLanguage].gameInstructions, true);
});