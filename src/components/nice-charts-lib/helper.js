import {
  DEFAULT_AXES_SEGMENTS,
  DEFAULT_CHART_WIDTH,
  DEFAULT_CANVAS_SPACING,
} from './constants';

const drawChartTitle = (context, chartOptions) => {
  const chartTitle = chartOptions.chartTitle || '';
  const chartWidth = chartOptions.chartWidth || DEFAULT_CHART_WIDTH;
  const textMeasure = context.measureText(chartTitle);
  context.font = '18px sans-serif';
  context.fillStyle = 'grey';
  context.fillText(
    chartTitle,
    chartWidth - (chartWidth / 2 + textMeasure.width),
    30
  );
};

const getAxesScale = (chartOptions) => {
  let scaleX = chartOptions.axisX.scale;
  let scaleY = chartOptions.axisY.scale;

  if (scaleX !== 'auto' && !Array.isArray(scaleX)) {
    throw new Error(
      `Inappropiate x-axis scale provided. Possible values are 'auto' or an array`
    );
  }

  if (scaleY !== 'auto' && !Array.isArray(scaleY)) {
    throw new Error(
      `Inappropiate y-axis scale provided. Possible values are 'auto' or an array`
    );
  }

  let minX = chartOptions.data[0].data[0][0];
  let maxX = chartOptions.data[0].data[0][0];
  let minY = chartOptions.data[0].data[0][1];
  let maxY = chartOptions.data[0].data[0][1];

  for (const group of chartOptions.data) {
    for (const dataPoint of group.data) {
      if (scaleX === 'auto') {
        minX = Math.min(minX, dataPoint[0]);
        maxX = Math.max(maxX, dataPoint[0]);
      }
      if (scaleY === 'auto') {
        minY = Math.min(minY, dataPoint[1]);
        maxY = Math.max(maxY, dataPoint[1]);
      }
    }
  }

  if (scaleX === 'auto') {
    let segments = chartOptions.axisX.segments || DEFAULT_AXES_SEGMENTS;
    minX = minX - segments;
    maxX = maxX + segments;
    let interval = Math.abs(maxX - minX) / segments;
    let intervalCeilToNearTen = Math.ceil(interval / 10) * 10;

    let scale = [];
    for (let i = 0; i <= segments; i++) {
      let temp = minX + intervalCeilToNearTen * i;
      scale.push(temp);
    }

    scaleX = scale;
  }

  if (scaleY === 'auto') {
    let segments = chartOptions.axisY.segments || DEFAULT_AXES_SEGMENTS;
    minY = minY - segments;
    maxY = maxY + segments;
    let interval = Math.abs(maxY - minY) / segments;
    let intervalCeilToNearTen = Math.ceil(interval / 10) * 10;

    let scale = [];
    for (let i = 0; i <= segments; i++) {
      let temp = minY + intervalCeilToNearTen * i;
      scale.push(temp);
    }

    scaleY = scale;
  }
  return { scaleX, scaleY };
};

const getRandomColor = () => {
  return `#${Math.random().toString(16).substr(2, 6)}`;
};

const drawAxisY = (context, chartOptions, maxValue) => {
  let scale = chartOptions.axisY.scale;
  let segments = chartOptions.axisX.segments || DEFAULT_AXES_SEGMENTS;
  const gap = DEFAULT_CANVAS_SPACING;
  const width = chartOptions.chartWidth;
  const height = chartOptions.chartHeight;

  const start = { x: width - (width - gap), y: height - gap };
  const end = { x: width - (width - gap), y: height - (height - gap) };
  const yAxisLength = Math.abs(start.y - end.y);
  if (scale === 'auto') {
    scale = [];
    for (let i = 0; i < segments; i += 1) {
      scale.push(Math.floor(maxValue / 5) * i);
    }
  }
  const yAxisPartsNeeded = scale.length;

  context.lineWidth = 1.0;
  context.strokeStyle = '#fff';
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();

  for (let i = 0; i < yAxisPartsNeeded; i++) {
    const stepSize = yAxisLength / yAxisPartsNeeded;

    const nextSegement = i * stepSize;
    context.lineWidth = 1.0;
    context.fillStyle = '#fff';
    context.beginPath();
    context.moveTo(start.x, start.y - nextSegement);
    context.lineTo(start.x - 8, start.y - nextSegement);
    context.stroke();

    let label = scale[i];
    //yAxisMap.set(label, start.y - nextSegement);
    const textMeasure = context.measureText(label);
    context.font = '10px sans-serif';
    context.strokeStyle = '#fff';
    context.fillText(
      label,
      start.x - 10 - textMeasure.width,
      start.y - nextSegement + 5
    );
  }
};

const drawAxisX = (context, xAxisParams) => {
  //const { maxBarsInVariant, width, height, chartOptions } = xAxisParams;
  const { width, height, chartOptions } = xAxisParams;
  const gap = 30;
  const start = { x: width - (width - gap), y: height - gap };
  const end = { x: width - gap, y: height - gap };
  const xAxisLength = Math.abs(start.x - end.x);
  let scale = chartOptions.axisX.scale;
  const xAxisPartsNeeded = scale.length;
  context.lineWidth = 1.0;
  context.strokeStyle = '#fff';
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();

  for (let i = 0; i < xAxisPartsNeeded; i++) {
    const stepSize = xAxisLength / xAxisPartsNeeded;

    const nextSegement = (i + 1) * stepSize;
    context.lineWidth = 1.0;
    context.strokeStyle = '#fff';
    context.beginPath();
    context.moveTo(start.x + nextSegement, start.y);
    context.lineTo(start.x + nextSegement, start.y + 8);
    context.stroke();

    let label = scale[i];
    const textMeasure = context.measureText(label);
    context.font = '10px sans-serif';
    context.fillStyle = '#fff';
    context.fillText(
      label,
      start.x + nextSegement - textMeasure.width / 2,
      start.y + 20
    );
  }
};

export { getAxesScale, drawChartTitle, getRandomColor, drawAxisY, drawAxisX };
