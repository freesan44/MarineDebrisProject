const chartBars = document.getElementById('chartBars');
const leadingCategory = document.getElementById('leadingCategory');

const chartTheme = {
  macro: {
    start: '#0b6e99',
    end: '#75d5ff',
    soft: 'rgba(117, 213, 255, 0.18)'
  },
  micro: {
    start: '#3157d5',
    end: '#9eb5ff',
    soft: 'rgba(49, 87, 213, 0.15)'
  },
  additive: {
    start: '#00a38a',
    end: '#9cf2d6',
    soft: 'rgba(0, 163, 138, 0.16)'
  },
  fiber: {
    start: '#7c4fd6',
    end: '#c5a8ff',
    soft: 'rgba(124, 79, 214, 0.14)'
  },
  pellet: {
    start: '#d77a15',
    end: '#ffd166',
    soft: 'rgba(215, 122, 21, 0.16)'
  },
  detergent: {
    start: '#d24b79',
    end: '#ff9dbc',
    soft: 'rgba(210, 75, 121, 0.14)'
  },
  total: {
    start: '#08304a',
    end: '#0b6e99',
    soft: 'rgba(8, 48, 74, 0.15)'
  }
};

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

window.onLanguageChanged = renderChartBars;

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  renderChartBars();
});
