/*
海洋垃圾项目 - 日本沿岸影响地图
Marine Debris Project - Coastal Impact Map

地图点位来自 shared.js 的 regionMapData。经纬度只用于把点放到静态日本地图上，
value 是展示用关注指数，不是该地点的实际垃圾吨数。
*/

// 静态底图覆盖的大致经纬度范围，用于转换成百分比定位。
const MAP_CONFIG = {
  bounds: {
    north: 46.0,
    south: 24.0,
    east: 150.0,
    west: 125.0
  }
};

// 颜色与手绘主题保持一致，并与低/中/高筛选等级对应。
const markerPalette = {
  low: '#2d5da1',
  medium: '#fff3a6',
  high: '#ff4d4d'
};

// 保留当前选中点，筛选或切换语言后继续显示同一地区。
let selectedRegion = null;
let currentMapFilter = 'all';

/** 把经纬度映射为底图容器内的 x/y 百分比。 */
function geoToPercent(lat, lng) {
  const latRange = MAP_CONFIG.bounds.north - MAP_CONFIG.bounds.south;
  const lngRange = MAP_CONFIG.bounds.east - MAP_CONFIG.bounds.west;
  const x = ((lng - MAP_CONFIG.bounds.west) / lngRange) * 100;
  const y = ((MAP_CONFIG.bounds.north - lat) / latRange) * 100;
  return { x, y };
}

function localText(key) {
  return getLocalizedLabel(key);
}

function getVisibleRegions() {
  return regionMapData.filter(region => currentMapFilter === 'all' || region.weight === currentMapFilter);
}

function getWeightLabel(weight) {
  const key = `mapWeight${weight.charAt(0).toUpperCase()}${weight.slice(1)}`;
  return translations[currentLanguage][key] || translations[currentLanguage].mapMedium || weight;
}

function initMap() {
  initMapControls();
  updateMapDisplay();
}

/** 根据当前筛选创建可点击地图点，并同步选中状态。 */
function addDebrisMarkers() {
  const markersContainer = document.getElementById('debris-markers');
  if (!markersContainer) return;

  markersContainer.innerHTML = '';
  getVisibleRegions().forEach(region => {
    const coords = geoToPercent(region.lat, region.lng);
    const marker = document.createElement('button');
    // 点位限制在 20-56px，既体现量级差异，也保证触控可点击性。
    const markerSize = Math.max(20, Math.min(56, region.value * 0.52));

    marker.type = 'button';
    marker.className = 'debris-marker';
    marker.style.left = `${coords.x}%`;
    marker.style.top = `${coords.y}%`;
    marker.style.width = `${markerSize}px`;
    marker.style.height = `${markerSize}px`;
    marker.style.setProperty('--marker-color', markerPalette[region.weight] || markerPalette.medium);
    marker.innerHTML = `<span>${region.value}</span>`;
    marker.setAttribute('aria-label', `${localText(region.labelKey)} ${region.value}`);
    marker.title = `${localText(region.labelKey)} · ${localText(region.amountKey)}`;

    marker.addEventListener('click', () => selectRegion(region));

    if (selectedRegion && selectedRegion.id === region.id) {
      marker.classList.add('selected');
    }

    markersContainer.appendChild(marker);
  });
}

/** 创建地图下方的地区摘要卡，内容全部从本地化键读取。 */
function updateRegionCards() {
  const regionCards = document.getElementById('regionCards');
  if (!regionCards) return;

  regionCards.innerHTML = '';
  getVisibleRegions().forEach(region => {
    const card = document.createElement('article');
    card.className = 'region-card map-point-card';
    card.id = `region-card-${region.id}`;
    card.innerHTML = `
      <div class="map-point-head">
        <span>${localText(region.typeKey)}</span>
        <strong>${region.value}</strong>
      </div>
      <h3>${localText(region.labelKey)}</h3>
      <p>${localText(region.descriptionKey)}</p>
      <div class="map-point-meta">
        <span>${localText(region.amountKey)}</span>
        <small>${getWeightLabel(region.weight)}</small>
      </div>
    `;
    card.addEventListener('click', () => selectRegion(region));
    regionCards.appendChild(card);
  });
}

/** 更新当前地区的来源、量级、生态影响和证据链接。 */
function showRegionDetail(region) {
  const mapDetail = document.getElementById('mapDetail');
  if (!mapDetail) return;

  mapDetail.innerHTML = `
    <div class="map-detail-kicker">${localText(region.typeKey)} · ${getWeightLabel(region.weight)}</div>
    <h3>${localText(region.labelKey)}</h3>
    <p>${localText(region.descriptionKey)}</p>
    <div class="map-detail-grid">
      <div>
        <span>${translations[currentLanguage].mapAmountLabel || '量级'}</span>
        <strong>${localText(region.amountKey)}</strong>
      </div>
      <div>
        <span>${translations[currentLanguage].mapImpactLabel || '影响'}</span>
        <strong>${localText(region.impactKey)}</strong>
      </div>
    </div>
    <p>${localText(region.evidenceKey)}</p>
    <a href="${region.sourceUrl}" target="_blank" rel="noopener">${localText(region.sourceKey)}</a>
  `;
}

/** 统一刷新点位、卡片与详情，并处理筛选后无数据的情况。 */
function updateMapDisplay() {
  addDebrisMarkers();
  updateRegionCards();

  const visibleRegions = getVisibleRegions();
  const mapDetail = document.getElementById('mapDetail');

  if (visibleRegions.length === 0) {
    if (mapDetail) {
      mapDetail.innerHTML = `<p>${translations[currentLanguage].mapNoData || 'No data for selected filter.'}</p>`;
    }
    selectedRegion = null;
    return;
  }

  if (!selectedRegion || !visibleRegions.some(region => region.id === selectedRegion.id)) {
    selectRegion(visibleRegions[0]);
    return;
  }

  showRegionDetail(selectedRegion);
}

/** 应用关注等级筛选，并让按钮视觉状态与数据一致。 */
function setMapFilter(filter) {
  currentMapFilter = filter;
  document.querySelectorAll('.map-control-button').forEach(button => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });
  updateMapDisplay();
}

function initMapControls() {
  const mapControls = document.getElementById('mapControls');
  if (!mapControls) return;

  mapControls.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      setMapFilter(button.dataset.filter || 'all');
    });
  });
}

function selectRegion(region) {
  selectedRegion = region;
  showRegionDetail(region);
  addDebrisMarkers();

  document.querySelectorAll('.region-card').forEach(card => card.classList.remove('active'));

  const regionCard = document.getElementById(`region-card-${region.id}`);
  if (regionCard) {
    regionCard.classList.add('active');
  }
}

// 动态生成内容没有 data-i18n 节点，语言切换后必须整体重绘。
window.onLanguageChanged = () => {
  updateMapDisplay();
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initMap();
});
