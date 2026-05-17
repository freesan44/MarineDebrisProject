/*
海洋垃圾项目 - 地图页面脚本
Marine Debris Project - Map Page Script

此文件负责地图页面的所有交互功能和数据可视化。
This file handles all interactive features and data visualization for the map page.

主要功能：
- 静态地图图片上的标记定位
- 地理坐标到像素坐标的转换
- 垃圾浓度数据的可视化显示
- 区域选择和详细信息展示

Main features:
- Marker positioning on static map image
- Geographic coordinate to pixel coordinate conversion
- Visual display of debris concentration data
- Region selection and detail display

技术实现：
- 使用图片叠加技术显示标记点
- 坐标转换算法确保准确位置
- 响应式设计适配不同屏幕
- 无外部依赖的轻量级实现

Technical implementation:
- Image overlay technique for marker display
- Coordinate conversion algorithm for accurate positioning
- Responsive design for different screens
- Lightweight implementation without external dependencies

依赖：
- shared.js (区域数据和翻译)
- japan_map.svg (地图图片)

Dependencies:
- shared.js (region data and translations)
- 外部真实地图图片 URL (map image)
*/

// 日本地图图片的地理坐标范围（基于真实地图投影）
// 图片显示范围大约：西125°E 东150°E 南24°N 北46°N
const MAP_CONFIG = {
  width: 800,
  height: 1000,
  bounds: {
    north: 46.0,
    south: 24.0,
    east: 150.0,
    west: 125.0
  }
};

function geoToPercent(lat, lng) {
  const latRange = MAP_CONFIG.bounds.north - MAP_CONFIG.bounds.south;
  const lngRange = MAP_CONFIG.bounds.east - MAP_CONFIG.bounds.west;
  const x = ((lng - MAP_CONFIG.bounds.west) / lngRange) * 100;
  const y = ((MAP_CONFIG.bounds.north - lat) / latRange) * 100;
  return { x, y };
}

// 日本各地区在地图上的正确位置（单位：度）
const regionRelativeCoordinates = {
  hokkaido: geoToPercent(42.5, 144.0),      // 北海道 - 右上方
  tohoku: geoToPercent(39.5, 142.0),        // 东北 - 中上方
  kanto: geoToPercent(36.5, 141.0),         // 关东 - 右侧中上
  chubu: geoToPercent(35.5, 137.5),         // 中部 - 中间
  kansai: geoToPercent(34.5, 135.5),        // 关西 - 中下方
  chugoku_shikoku: geoToPercent(34.5, 133.0), // 中国四国 - 中下方左
  kyushu_okinawa: geoToPercent(32.5, 131.0)   // 九州冲绳 - 下方
};

let selectedRegion = null;
let currentMapFilter = 'all';

function getVisibleRegions() {
  return regionMapData.filter(region => currentMapFilter === 'all' || region.weight === currentMapFilter);
}

function initMap() {
  initMapControls();
  updateMapDisplay();
}

function addDebrisMarkers() {
  const markersContainer = document.getElementById('debris-markers');
  if (!markersContainer) return;
  markersContainer.innerHTML = '';

  getVisibleRegions().forEach(region => {
    const coords = regionRelativeCoordinates[region.id];
    if (!coords) return;
    let color;
    if (region.weight === 'low') color = '#00ff00';
    else if (region.weight === 'medium') color = '#ffff00';
    else color = '#ff0000';

    const marker = document.createElement('button');
    marker.type = 'button';
    marker.className = 'debris-marker';
    marker.style.left = `${coords.x}%`;
    marker.style.top = `${coords.y}%`;
    marker.style.backgroundColor = color;
    
    // 针对不同地区调整标记大小
    let markerSize;
      markerSize = Math.max(region.value * 1.8, 16);
    marker.style.width = `${markerSize}px`;
    marker.style.height = `${markerSize}px`;
    marker.setAttribute('aria-label', `${getLocalizedLabel(region.labelKey)} ${region.value}%`);

    marker.addEventListener('click', () => {
      selectRegion(region);
    });

    if (selectedRegion && selectedRegion.id === region.id) {
      marker.classList.add('selected');
    }

    marker.title = `${getLocalizedLabel(region.labelKey)} - ${region.value}%`;
    markersContainer.appendChild(marker);
  });
}

function updateRegionCards() {
  const regionCards = document.getElementById('regionCards');
  if (!regionCards) return;
  regionCards.innerHTML = '';

  getVisibleRegions().forEach(region => {
    const card = document.createElement('article');
    card.className = 'region-card';
    card.id = `region-card-${region.id}`;
    card.innerHTML = `
      <h3>${getLocalizedLabel(region.labelKey)}</h3>
      <p>${getLocalizedLabel(region.descriptionKey)}</p>
      <p><strong>${region.value}%</strong> ${translations[currentLanguage].regionValueSuffix}</p>
    `;
    card.addEventListener('click', () => {
      selectRegion(region);
    });
    regionCards.appendChild(card);
  });
}

function showRegionDetail(region) {
  const mapDetail = document.getElementById('mapDetail');
  if (!mapDetail) return;
  mapDetail.innerHTML = `
    <h3>${getLocalizedLabel(region.labelKey)}</h3>
    <p>${getLocalizedLabel(region.descriptionKey)}</p>
    <p><strong>${region.value}%</strong> ${translations[currentLanguage].regionValueSuffix}</p>
    <p>${translations[currentLanguage].mapDescription}</p>
  `;
}

function updateMapDisplay() {
  addDebrisMarkers();
  updateRegionCards();

  const visibleRegions = getVisibleRegions();
  if (visibleRegions.length === 0) {
    document.getElementById('mapDetail').innerHTML = `<p>${translations[currentLanguage].mapNoData || 'No data for selected filter.'}</p>`;
    selectedRegion = null;
    return;
  }

  if (!selectedRegion || !visibleRegions.some(region => region.id === selectedRegion.id)) {
    selectRegion(visibleRegions[0]);
    return;
  }

  showRegionDetail(selectedRegion);
}

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
  
  // 移除所有标记的选中状态
  const markers = document.querySelectorAll('.debris-marker');
  markers.forEach(marker => marker.classList.remove('selected'));
  
  // 移除所有卡片的高亮
  document.querySelectorAll('.region-card').forEach(card => card.classList.remove('active'));
  
  // 高亮对应标记
  markers.forEach((marker, index) => {
    const visibleRegions = getVisibleRegions();
    if (visibleRegions[index] && visibleRegions[index].id === region.id) {
      marker.classList.add('selected');
    }
  });
  
  // 高亮对应卡片并滚动
  const regionCard = document.getElementById(`region-card-${region.id}`);
  if (regionCard) {
    regionCard.classList.add('active');
    regionCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

window.onLanguageChanged = () => {
  updateMapDisplay();
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initMap();
});
