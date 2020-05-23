import { DEFAULT_AXES_SEGMENTS } from './constants';

const drawChartTitle = (context, chartOptions) => {
  const textMeasure = context.measureText(chartOptions.chartTitle);
  context.font = '18px sans-serif';
  context.fillText(
    chartOptions.chartTitle,
    chartOptions.chartWidth - (chartOptions.chartWidth / 2 + textMeasure.width),
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
      // console.log(dataPoint);
    }
  }

  if (scaleX === 'auto') {
    let segments = chartOptions.axisX.segments || DEFAULT_AXES_SEGMENTS;
    minX = minX - segments;
    maxX = maxX + segments;
    let interval = Math.abs(maxX - minX) / segments;
    let intervalCeilToNearTen = Math.ceil(interval / 10) * 10;

    // console.log('X interval calc: ', intervalCeilToNearTen);

    let scale = [];
    for (let i = 0; i <= segments; i++) {
      let temp = minX + intervalCeilToNearTen * i;
      scale.push(temp);
    }

    scaleX = scale;
    // console.log('x scale:', scale);
  }

  if (scaleY === 'auto') {
    let segments = chartOptions.axisY.segments || DEFAULT_AXES_SEGMENTS;
    minY = minY - segments;
    maxY = maxY + segments;
    let interval = Math.abs(maxY - minY) / segments;
    let intervalCeilToNearTen = Math.ceil(interval / 10) * 10;

    //  console.log('Y interval calc: ', intervalCeilToNearTen);

    let scale = [];
    for (let i = 0; i <= segments; i++) {
      let temp = minY + intervalCeilToNearTen * i;
      scale.push(temp);
    }

    scaleY = scale;
    // console.log('y scale:', scale);
  }

  // console.log(minX, minY);
  // console.log(maxX, maxY);
  return { scaleX, scaleY };
};

const getRandomColor = () => {
  return `#${Math.random().toString(16).substr(2, 6)}`;
};

export { getAxesScale, drawChartTitle, getRandomColor };
