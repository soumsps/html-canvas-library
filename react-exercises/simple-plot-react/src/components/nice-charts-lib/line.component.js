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
    context.lineWidth = 1.0;
    context.beginPath();
    context.moveTo(width - (width - 30), height - 30);
    context.lineTo(width - 30, height - 30);
    context.stroke();
  };
  const drawAxisY = (context) => {
    context.lineWidth = 1.0;
    context.beginPath();
    context.moveTo(width - (width - 30), height - 30);
    context.lineTo(width - (width - 30), height - (height - 30));
    context.stroke();
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
