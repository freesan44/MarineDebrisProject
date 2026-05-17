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
- japan_map.svg (map image)
*/

// 日本地图图片尺寸和坐标映射
const MAP_CONFIG = {
  width: 800,
  height: 1000,
  bounds: {
    north: 45.5,
    south: 31.0,
    east: 146.0,
    west: 128.0
  }
};

function geoToPixel(lat, lng) {
  const latRange = MAP_CONFIG.bounds.north - MAP_CONFIG.bounds.south;
  const lngRange = MAP_CONFIG.bounds.east - MAP_CONFIG.bounds.west;
  const x = ((lng - MAP_CONFIG.bounds.west) / lngRange) * MAP_CONFIG.width;
  const y = ((MAP_CONFIG.bounds.north - lat) / latRange) * MAP_CONFIG.height;
  return { x, y };
}

const regionPixelCoordinates = {
  hokkaido: geoToPixel(43.5, 142.5),
  tohoku: geoToPixel(39.0, 141.0),
  kanto: geoToPixel(35.7, 139.7),
  chubu: geoToPixel(35.0, 137.0),
  kansai: geoToPixel(34.7, 135.5),
  chugoku_shikoku: geoToPixel(34.0, 133.0),
  kyushu_okinawa: geoToPixel(31.5, 130.5)
};

let selectedRegion = null;

function initMap() {
  addDebrisMarkers();
  updateRegionCards();
  if (regionMapData.length > 0) {
    selectRegion(regionMapData[0]);
  }
}

function addDebrisMarkers() {
  const markersContainer = document.getElementById('debris-markers');
  if (!markersContainer) return;
  markersContainer.innerHTML = '';

  regionMapData.forEach(region => {
    const coords = regionPixelCoordinates[region.id];
    if (!coords) return;
    let color;
    if (region.weight === 'low') color = '#00ff00';
    else if (region.weight === 'medium') color = '#ffff00';
    else color = '#ff0000';

    const marker = document.createElement('button');
    marker.type = 'button';
    marker.className = 'debris-marker';
    marker.style.left = `${coords.x}px`;
    marker.style.top = `${coords.y}px`;
    marker.style.backgroundColor = color;
    marker.style.width = `${Math.max(region.value * 2, 12)}px`;
    marker.style.height = `${Math.max(region.value * 2, 12)}px`;
    marker.setAttribute('aria-label', `${getLocalizedLabel(region.labelKey)} ${region.value}%`);

    marker.addEventListener('click', () => {
      selectRegion(region);
    });

    marker.title = `${getLocalizedLabel(region.labelKey)} - ${region.value}%`;
    markersContainer.appendChild(marker);
  });
}

function updateRegionCards() {
  const regionCards = document.getElementById('regionCards');
  if (!regionCards) return;
  regionCards.innerHTML = '';

  regionMapData.forEach(region => {
    const card = document.createElement('article');
    card.className = 'region-card';
    card.innerHTML = `
      <h3>${getLocalizedLabel(region.labelKey)}</h3>
      <p>${getLocalizedLabel(region.descriptionKey)}</p>
      <p><strong>${region.value}%</strong> ${translations[currentLanguage].regionValueSuffix}</p>
    `;
    card.addEventListener('click', () => {
      selectRegion(region);
      const mapContainer = document.querySelector('.map-container');
      if (mapContainer) {
        mapContainer.scrollIntoView({ behavior: 'smooth' });
      }
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

function selectRegion(region) {
  selectedRegion = region;
  showRegionDetail(region);
  const markers = document.querySelectorAll('.debris-marker');
  markers.forEach(marker => marker.classList.remove('selected'));
  const markerIndex = regionMapData.findIndex(item => item.id === region.id);
  if (markerIndex >= 0) {
    markers[markerIndex]?.classList.add('selected');
  }
}

window.onLanguageChanged = () => {
  addDebrisMarkers();
  updateRegionCards();
  if (selectedRegion) {
    showRegionDetail(selectedRegion);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initMap();
});
