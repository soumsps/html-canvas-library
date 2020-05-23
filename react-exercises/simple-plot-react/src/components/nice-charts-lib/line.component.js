import React, { useEffect, useRef } from 'react';
import {
  DEFAULT_CHART_BACKGROUND_COLOR,
  DEFAULT_CHART_WIDTH,
  DEFAULT_CHART_HEIGHT,
} from './constants';
import { getAxesScale, drawChartTitle, getRandomColor } from './helper';

const LineChart = ({ chartOptions }) => {
  const canvasRef = useRef(null);

  const xAxisMap = new Map();
  const yAxisMap = new Map();

  const drawAxisX = (context, chartOptions, scale) => {
    const gap = 60;
    const width = chartOptions.chartWidth || DEFAULT_CHART_WIDTH;
    const height = chartOptions.chartHeight || DEFAULT_CHART_HEIGHT;

    const start = { x: width - (width - gap), y: height - gap };
    const end = { x: width - gap, y: height - gap };
    const xAxisLength = Math.abs(start.x - (end.x - 40));
    const xAxisPartsNeeded = scale.length;

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

      let label = scale[i];
      xAxisMap.set(label, start.x + nextSegement);
      const textMeasure = context.measureText(label);
      context.font = '10px sans-serif';

      context.fillText(
        label,
        start.x + nextSegement - textMeasure.width / 2,
        start.y + 20
      );
    }
  };

  const drawAxisY = (context, chartOptions, scale) => {
    const gap = 60;
    const width = chartOptions.chartWidth || DEFAULT_CHART_WIDTH;
    const height = chartOptions.chartHeight || DEFAULT_CHART_HEIGHT;

    const start = { x: width - (width - gap), y: height - gap };
    const end = { x: width - (width - gap), y: height - (height - gap) };
    const yAxisLength = Math.abs(start.y - end.y);
    const yAxisPartsNeeded = scale.length;

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

      let label = scale[i];
      yAxisMap.set(label, start.y - nextSegement);
      const textMeasure = context.measureText(label);
      context.font = '10px sans-serif';
      context.fillText(
        label,
        start.x - 15 - textMeasure.width,
        start.y - nextSegement + 5
      );
    }
  };

  const calculateAbsoluteCoordinates = (relativeX, relativeY) => {
    let absoluteX = null;
    let absoluteY = null;

    if (xAxisMap.has(relativeX)) {
      absoluteX = xAxisMap.get(relativeX);
    } else {
      let interval = null;
      let lastKey = null;
      let lastValue = null;
      for (const [key, value] of xAxisMap) {
        if (lastKey != null) {
          interval = key - lastKey;
        }
        if (relativeX < key && absoluteX === null) {
          let oneUnitValueOfInterval = Math.abs(lastValue - value) / interval;
          absoluteX =
            lastValue + Math.abs(lastKey - relativeX) * oneUnitValueOfInterval;
        }
        lastKey = key;
        lastValue = value;
      }
    }

    if (yAxisMap.has(relativeY)) {
      absoluteY = yAxisMap.get(relativeY);
    } else {
      let interval = null;
      let lastKey = null;
      let lastValue = null;
      for (const [key, value] of yAxisMap) {
        if (lastKey != null) {
          interval = key - lastKey;
        }
        if (relativeY < key && absoluteY === null) {
          let oneUnitValueOfInterval = Math.abs(lastValue - value) / interval;
          absoluteY =
            lastValue - Math.abs(lastKey - relativeY) * oneUnitValueOfInterval;
        }
        lastKey = key;
        lastValue = value;
      }
    }

    return { x: absoluteX, y: absoluteY };
  };

  const drawChart = (context) => {
    const markDot = (color, x, y) => {
      context.fillStyle = color;
      context.fillRect(x - 3, y - 3, 6, 6);
      // context.fill();
    };

    for (const group of chartOptions.data) {
      let color = group.color || getRandomColor();
      //let label = group.label;

      context.lineWidth = 1.0;
      context.beginPath();
      context.strokeStyle = color;
      for (let i = 0; i < group.data.length; i++) {
        let absoluteCoordinates = calculateAbsoluteCoordinates(
          group.data[i][0],
          group.data[i][1]
        );

        markDot(color, absoluteCoordinates.x, absoluteCoordinates.y);

        if (i === 0) {
          context.moveTo(absoluteCoordinates.x, absoluteCoordinates.y);
        } else {
          context.lineTo(absoluteCoordinates.x, absoluteCoordinates.y);
          context.stroke();
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const scale = getAxesScale(chartOptions);
    drawChartTitle(context, chartOptions);
    drawAxisX(context, chartOptions, scale.scaleX);
    drawAxisY(context, chartOptions, scale.scaleY);
    drawChart(context);
  });

  return (
    <div>
      <canvas
        className="canvas-line"
        ref={canvasRef}
        width={chartOptions.chartWidth || DEFAULT_CHART_WIDTH}
        height={chartOptions.chartHeight || DEFAULT_CHART_HEIGHT}
        style={{
          backgroundColor:
            chartOptions.chartBackgroundColor || DEFAULT_CHART_BACKGROUND_COLOR,
        }}
      />
    </div>
  );
};

export default LineChart;
