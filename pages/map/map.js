const MAP_CONFIG = {
  bounds: {
    north: 46.0,
    south: 24.0,
    east: 150.0,
    west: 125.0
  }
};

const markerPalette = {
  low: '#7dd0ff',
  medium: '#00a38a',
  high: '#f08a4b'
};

let selectedRegion = null;
let currentMapFilter = 'all';

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

function addDebrisMarkers() {
  const markersContainer = document.getElementById('debris-markers');
  if (!markersContainer) return;

  markersContainer.innerHTML = '';
  getVisibleRegions().forEach(region => {
    const coords = geoToPercent(region.lat, region.lng);
    const marker = document.createElement('button');
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

window.onLanguageChanged = () => {
  updateMapDisplay();
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initMap();
});
