/*
海洋垃圾项目 - 图表页面脚本
Marine Debris Project - Chart Page Script

此文件负责图表页面的数据可视化和交互功能。
This file handles data visualization and interactive features for the chart page.

主要功能：
- 柱状图和饼图的绘制
- 数据标签的本地化更新
- 动画效果的实现
- 响应式图表布局

Main features:
- Bar chart and pie chart drawing
- Localized data label updates
- Animation effects implementation
- Responsive chart layout

技术实现：
- Canvas API 绘制饼图
- CSS 动画实现柱状图增长效果
- 动态数据绑定和更新
- 颜色编码区分不同类型数据

Technical implementation:
- Canvas API for pie chart drawing
- CSS animations for bar chart growth effects
- Dynamic data binding and updates
- Color coding for different data types

依赖：
- shared.js (图表数据和翻译)
- styles.css (图表样式)

Dependencies:
- shared.js (chart data and translations)
- styles.css (chart styles)
*/

function updateChartLabels() {
  chartData.forEach(item => {
    item.label = getLocalizedLabel(item.labelKey);
  });
}

function renderChartBars() {
  if (!chartBars) return;
  chartBars.innerHTML = '';
  const maxValue = Math.max(...chartData.map(d => d.value));
  chartData.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'chart-row';
    const color = item.type === 'recycle' ? 'linear-gradient(90deg, #4CAF50, #66BB6A)' : 'linear-gradient(90deg, #FF9800, #FFB74D)';
    const width = Math.max(12, (item.value / maxValue) * 100);
    row.innerHTML = `
      <div class="chart-row-label">${item.label}</div>
      <div class="chart-row-bar-wrap">
        <div class="chart-row-bar" style="--bar-width: ${width}%; background: ${color}; animation: barGrow 1.5s ease-out ${index * 0.2}s forwards;"></div>
      </div>
      <div class="chart-row-value">${item.value}%</div>
    `;
    chartBars.appendChild(row);
  });
}

function drawChart() {
  const canvas = document.getElementById('debrisChart');
  if (!canvas) return;
  updateChartLabels();
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = 60;
  const maxValue = Math.max(...chartData.map(d => d.value));
  const barWidth = (width - padding * 2) / chartData.length - 20;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#eef9ff';
  ctx.fillRect(0, 0, width, height);

  ctx.font = '600 16px Inter, sans-serif';
  ctx.fillStyle = 'var(--text)';
  ctx.fillText(translations[currentLanguage].chartCanvasTitle, padding, 32);

  chartData.forEach((item, index) => {
    const x = padding + index * (barWidth + 30);
    const barHeight = (item.value / maxValue) * (height - padding * 2);
    const y = height - padding - barHeight;
    const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
    if (item.type === 'recycle') {
      gradient.addColorStop(0, '#4CAF50');
      gradient.addColorStop(1, '#66BB6A');
    } else {
      gradient.addColorStop(0, '#FF9800');
      gradient.addColorStop(1, '#FFB74D');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = 'var(--text)';
    ctx.font = '600 14px Inter, sans-serif';
    ctx.fillText(`${item.value}%`, x + barWidth / 2 - 10, y - 10);
    ctx.save();
    ctx.translate(x + barWidth / 2, height - padding + 18);
    ctx.rotate(-Math.PI / 8);
    ctx.textAlign = 'center';
    ctx.fillText(item.label, 0, 0);
    ctx.restore();
  });

  ctx.strokeStyle = 'rgba(15, 42, 80, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding + 10, height - padding);
  ctx.stroke();
  renderChartBars();
}

function resizeCanvas() {
  const canvas = document.getElementById('debrisChart');
  if (!canvas) return;
  const ratio = window.devicePixelRatio || 1;
  const displayedWidth = canvas.clientWidth;
  canvas.width = displayedWidth * ratio;
  canvas.height = 360 * ratio;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}