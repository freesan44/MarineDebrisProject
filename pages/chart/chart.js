/*
海洋垃圾项目 - 数据页动态图表
Marine Debris Project - Data Chart

chartData 在 shared.js 中保存统一的“吨/年”数值，本文件负责本地化单位、
把区间换算为相对长度，并生成可响应布局的横向比较条。
*/

// 图表容器与顶部总量摘要。
const chartBars = document.getElementById('chartBars');
const leadingCategory = document.getElementById('leadingCategory');

// 各垃圾类型的颜色通过 CSS 自定义属性传给同一套条形组件。
const chartTheme = {
  macro: {
    start: '#2d5da1',
    end: '#6f95ca',
    soft: 'rgba(45, 93, 161, 0.14)'
  },
  micro: {
    start: '#ff4d4d',
    end: '#ff8b83',
    soft: 'rgba(255, 77, 77, 0.13)'
  },
  additive: {
    start: '#2d2d2d',
    end: '#696969',
    soft: 'rgba(45, 45, 45, 0.1)'
  },
  fiber: {
    start: '#2d5da1',
    end: '#9eb7da',
    soft: 'rgba(45, 93, 161, 0.12)'
  },
  pellet: {
    start: '#ff4d4d',
    end: '#ffaaa5',
    soft: 'rgba(255, 77, 77, 0.12)'
  },
  detergent: {
    start: '#2d2d2d',
    end: '#8a8a8a',
    soft: 'rgba(45, 45, 45, 0.1)'
  },
  total: {
    start: '#2d2d2d',
    end: '#2d5da1',
    soft: 'rgba(45, 93, 161, 0.14)'
  }
};

/** 将共享数据补充为当前语言可直接渲染的对象。 */
function getChartItems() {
  return chartData.map(item => ({
    ...item,
    label: getLocalizedLabel(item.labelKey),
    source: item.sourceKey ? getLocalizedLabel(item.sourceKey) : '',
    minValue: item.min ?? item.value ?? 0,
    maxValue: item.max ?? item.value ?? 0
  }));
}

function trimDecimal(value) {
  return Number(value.toFixed(1)).toLocaleString();
}

/**
 * 按语言习惯格式化吨数：日中使用“万”，英文使用 thousand。
 * @param {number} value - 每年估算重量（吨）
 */
function formatWeight(value) {
  if (currentLanguage === 'ja') {
    if (value >= 10000) return `${trimDecimal(value / 10000)}万トン`;
    return `${value.toLocaleString()}トン`;
  }

  if (currentLanguage === 'en') {
    if (value >= 10000) return `${trimDecimal(value / 1000)} thousand tons`;
    return `${value.toLocaleString()} tons`;
  }

  if (value >= 10000) return `${trimDecimal(value / 10000)}万吨`;
  return `${value.toLocaleString()} 吨`;
}

/** 将 min/max 区间转换为完整的“每年约……”文本。 */
function formatRange(item) {
  const prefixes = {
    ja: '年間 約',
    zh: '每年约 ',
    en: 'about '
  };
  const suffixes = {
    ja: '',
    zh: '',
    en: ' each year'
  };
  const prefix = prefixes[currentLanguage] ?? prefixes.en;
  const suffix = suffixes[currentLanguage] ?? suffixes.en;

  if (item.minValue === item.maxValue) {
    return `${prefix}${formatWeight(item.maxValue)}${suffix}`;
  }

  if (currentLanguage === 'zh' && item.minValue < 10000 && item.maxValue < 10000) {
    return `${prefix}${item.minValue.toLocaleString()}-${item.maxValue.toLocaleString()} 吨`;
  }

  if (currentLanguage === 'zh' && item.minValue >= 10000 && item.maxValue >= 10000) {
    return `${prefix}${trimDecimal(item.minValue / 10000)}万-${trimDecimal(item.maxValue / 10000)}万吨`;
  }

  if (currentLanguage === 'ja' && item.minValue < 10000 && item.maxValue < 10000) {
    return `${prefix}${item.minValue.toLocaleString()}-${item.maxValue.toLocaleString()}トン`;
  }

  if (currentLanguage === 'ja' && item.minValue >= 10000 && item.maxValue >= 10000) {
    return `${prefix}${trimDecimal(item.minValue / 10000)}万-${trimDecimal(item.maxValue / 10000)}万トン`;
  }

  if (currentLanguage === 'en' && item.minValue < 10000 && item.maxValue < 10000) {
    return `${prefix}${item.minValue.toLocaleString()}-${item.maxValue.toLocaleString()} tons${suffix}`;
  }

  return `${prefix}${formatWeight(item.minValue)}-${formatWeight(item.maxValue)}${suffix}`;
}

function formatMinimumLabel(value) {
  const labels = {
    ja: '下限',
    zh: '下限',
    en: 'min'
  };

  return `${labels[currentLanguage] || labels.en} ${formatWeight(value)}`;
}

function setLeadingMetric(items) {
  if (!leadingCategory) return;

  const total = items.find(item => item.type === 'total');
  leadingCategory.textContent = total ? formatRange(total) : '';
}

/** 重新创建全部条形项；语言切换时也调用此函数。 */
function renderChartBars() {
  if (!chartBars) return;

  const items = getChartItems();
  const spatialItems = items.filter(item => item.type !== 'total');
  const maxValue = Math.max(...spatialItems.map(item => item.maxValue));
  const fragment = document.createDocumentFragment();

  chartBars.innerHTML = '';
  setLeadingMetric(items);

  spatialItems.forEach((item, index) => {
    const palette = chartTheme[item.type] || chartTheme.micro;
    // 最小 7% 保证极小数量仍可被看见；右端按最大估值对齐。
    const width = Math.max(7, (item.maxValue / maxValue) * 100);
    const markerLeft = Math.min(100, Math.max(0, (item.minValue / maxValue) * 100));
    const rangeLabel = item.minValue === item.maxValue ? '' : formatMinimumLabel(item.minValue);
    const row = document.createElement('article');

    row.className = 'spatial-bar-card';
    row.style.setProperty('--bar-width', `${width}%`);
    row.style.setProperty('--marker-left', `${markerLeft}%`);
    row.style.setProperty('--bar-start', palette.start);
    row.style.setProperty('--bar-end', palette.end);
    row.style.setProperty('--bar-soft', palette.soft);
    row.style.setProperty('--bar-delay', `${index * 110}ms`);
    row.innerHTML = `
      <div class="spatial-bar-top">
        <div>
          <span class="spatial-index">0${index + 1}</span>
          <h4>${item.label}</h4>
        </div>
        <strong>${formatRange(item)}</strong>
      </div>
      <div class="spatial-track">
        <span class="spatial-fill"></span>
        <span class="spatial-marker${rangeLabel ? '' : ' is-fixed'}" aria-hidden="true"></span>
      </div>
      <div class="spatial-bar-foot">
        <small>${item.source}</small>
        <span>${rangeLabel || item.label}</span>
      </div>
    `;
    fragment.appendChild(row);
  });

  chartBars.appendChild(fragment);
}

// 固定 HTML 文案由 shared.js 翻译，动态生成的条形项在这里重绘。
window.onLanguageChanged = renderChartBars;

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  renderChartBars();
});
