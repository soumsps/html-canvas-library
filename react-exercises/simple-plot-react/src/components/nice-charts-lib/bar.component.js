import React, { useEffect, useRef } from 'react';
import { drawAxisY, drawAxisX, drawChartTitle } from './helper';
import { DEFAULT_CANVAS_SPACING } from './constants';

const drawSingleBar = (ctx, startX, startY, width, height, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(startX, startY, width, height);
  ctx.restore();
};

const getMaxDataOfBar = (chartOptions) => {
  let maxBarsInVariant = 0;
  let maxHeight = 0;
  if (chartOptions['data'].length > 0) {
    for (const dataObj of chartOptions['data']) {
      console.log('DATA OBJ--->', dataObj);
      const barsOfDataObj = dataObj['data'];
      if (barsOfDataObj.length > maxBarsInVariant) {
        maxBarsInVariant = barsOfDataObj.length;
      }
      for (const bars of barsOfDataObj) {
        if (bars[1] > maxHeight) {
          maxHeight = bars[1];
        }
      }
    }
  }
  return { maxBarsInVariant, maxHeight };
};

const drawBarChart = (chartOptions, canvasRef) => {
  const canvas = canvasRef.current;
  const canvasOptions = {};
  canvasOptions.context = canvas.getContext('2d');
  canvasOptions.padding = DEFAULT_CANVAS_SPACING;
  const chartData = chartOptions.data;
  const width = chartOptions.chartWidth;
  const height = chartOptions.chartHeight;
  const canvasHeight = height - DEFAULT_CANVAS_SPACING * 2;
  const canvasWidth = width - DEFAULT_CANVAS_SPACING * 2;
  const { maxBarsInVariant, maxHeight } = getMaxDataOfBar(chartOptions);

  const barVariant = chartData.length + 1;
  const barSize = canvasWidth / (maxBarsInVariant * barVariant);
  const colors = ['#52dedd', '#e0e438', '#f7885d', '#f1558e', '#f1558e'];
  drawChartTitle(canvasOptions.context, chartOptions);
  drawAxisX(canvasOptions.context, {
    maxBarsInVariant,
    width,
    height,
    chartOptions,
  });
  drawAxisY(canvasOptions.context, chartOptions, maxHeight);
  let barIndex = 0;
  for (let i = 0; i < maxBarsInVariant; i += 1) {
    let colorIndex = 0;
    for (let j = 0; j <= chartData.length; j += 1) {
      if (
        chartData[j] &&
        chartData[j]['data'] &&
        chartData[j]['data'][i] &&
        chartData[j]['data'][i][1]
      ) {
        const barHeight = Math.round(
          (canvasHeight / maxHeight) * chartData[j]['data'][i][1]
        );
        const x = canvasOptions.padding + barIndex * barSize;
        const y = height - barHeight - canvasOptions.padding;
        console.log(
          `height => ${barHeight}, width => ${barSize} x => ${x} y => ${y}`
        );
        drawSingleBar(
          canvasOptions.context,
          x,
          y,
          barSize,
          barHeight,
          colors[colorIndex]
        );
        barIndex++;
      } else {
        barIndex++;
        continue;
      }
      colorIndex++;
    }
  }
};

const BarChart = ({ chartOptions }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    drawBarChart(chartOptions, canvasRef);
  });

  return (
    <div>
      <canvas
        className="canvas-bar"
        ref={canvasRef}
        width={chartOptions.chartWidth}
        height={chartOptions.chartHeight}
      />
    </div>
  );
};

export default BarChart;
