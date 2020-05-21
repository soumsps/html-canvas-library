import React, { useEffect, useRef } from 'react';

const LineChart = ({ chartOptions }) => {
  const canvasRef = useRef(null);
  const width = chartOptions.chartWidth;
  const height = chartOptions.chartHeight;

  const drawChartTitle = (context) => {
    const textMeasure = context.measureText(chartOptions.chartTitle);
    context.font = '18px sans-serif';
    context.fillText(
      chartOptions.chartTitle,
      width - (width / 2 + textMeasure.width),
      30
    );
  };

  const drawAxisX = (context) => {
    const gap = 60;
    const start = { x: width - (width - gap), y: height - gap };
    const end = { x: width - gap, y: height - gap };
    const xAxisLength = Math.abs(start.x - end.x);
    const xAxisPartsNeeded =
      Math.abs(chartOptions.axisX.start - chartOptions.axisX.end) /
        chartOptions.axisX.interval +
      1;

    console.log('x axis length: ', xAxisLength);
    console.log('x axis parts needed', xAxisPartsNeeded);
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

  const drawAxisY = (context) => {
    const gap = 60;
    const start = { x: width - (width - gap), y: height - gap };
    const end = { x: width - (width - gap), y: height - (height - gap) };
    const yAxisLength = Math.abs(start.y - end.y);
    const yAxisPartsNeeded =
      Math.abs(chartOptions.axisY.start - chartOptions.axisY.end) /
        chartOptions.axisY.interval +
      1;

    console.log('y axis length: ', yAxisLength);
    console.log('y axis parts needed', yAxisPartsNeeded);

    context.lineWidth = 1.0;
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();

    for (let i = 0; i < yAxisPartsNeeded; i++) {
      const stepSize = yAxisLength / yAxisPartsNeeded;

      const nextSegement = i * stepSize;
      context.lineWidth = 1.0;
      context.beginPath();
      context.moveTo(start.x, start.y - nextSegement);
      context.lineTo(start.x - 8, start.y - nextSegement);
      context.stroke();

      let label = chartOptions.axisY.start + chartOptions.axisY.interval * i;
      const textMeasure = context.measureText(label);
      context.font = '10px sans-serif';
      context.fillText(
        label,
        start.x - 15 - textMeasure.width,
        start.y - nextSegement + 5
      );
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    drawChartTitle(context);
    drawAxisX(context);
    drawAxisY(context);
  });

  return (
    <div>
      <canvas
        className="canvas-line"
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};

export default LineChart;
