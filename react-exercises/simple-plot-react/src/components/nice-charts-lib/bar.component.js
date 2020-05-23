import React, { useEffect, useRef } from 'react';

const drawSingleBar = (ctx, startX, startY, width, height, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(startX, startY, width, height);
  ctx.restore();
};

const drawAxisX = (context, xAxisParams) => {
  const { maxBarsInVariant, width, height, chartOptions } = xAxisParams;
  const gap = 18;
  const start = { x: width - (width - gap), y: height - gap };
  const end = { x: width - gap, y: height - gap };
  const xAxisLength = Math.abs(start.x - end.x);

  const xAxisPartsNeeded = maxBarsInVariant;
  context.lineWidth = 1.0;
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();

  for (let i = 0; i < xAxisPartsNeeded; i++) {
    const stepSize = xAxisLength / xAxisPartsNeeded;

    const nextSegement = (i + 1) * stepSize;
    context.lineWidth = 1.0;
    context.beginPath();
    context.moveTo(start.x + nextSegement, start.y);
    context.lineTo(start.x + nextSegement, start.y + 8);
    context.stroke();

    let label = chartOptions.axisX.start + chartOptions.axisX.interval * i;
    const textMeasure = context.measureText(label);
    context.font = '10px sans-serif';
    context.fillText(
      label,
      start.x + nextSegement - textMeasure.width / 2,
      start.y + 20
    );
  }
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
  canvasOptions.padding = 20;
  const options = canvasOptions;
  const chartData = chartOptions.data;
  const width = chartOptions.chartWidth;
  const height = chartOptions.chartHeight;
  const canvasHeight = height - options.padding * 2;
  const canvasWidth = width - options.padding * 2;
  const { maxBarsInVariant, maxHeight } = getMaxDataOfBar(chartOptions);

  const barVariant = chartData.length + 1;
  const barSize = canvasWidth / (maxBarsInVariant * barVariant);
  const colors = ['#52dedd', '#e0e438', '#f7885d', '#f1558e', '#f1558e'];
  drawAxisX(options.context, {
    maxBarsInVariant,
    width,
    height,
    chartOptions,
  });
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
        const x = options.padding + barIndex * barSize;
        const y = height - barHeight - options.padding;
        console.log(
          `height => ${barHeight}, width => ${barSize} x => ${x} y => ${y}`
        );
        drawSingleBar(
          options.context,
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
    //const chartData = chartOptions.data;
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
