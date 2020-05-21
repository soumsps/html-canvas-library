import React from 'react';
import NiceCharts from '../../components/nice-charts-lib/nice-charts.component';

const LineExample1 = () => {
  const options = {
    chartTitle: 'Wildlife Population',
    chartType: 'line',
    chartWidth: 650,
    chartHeight: 450,
    axisY: {
      title: 'Population in crores',
      start: 0,
      end: 200,
      interval: 20,
    },
    axisX: {
      title: 'Years',
      start: 2017,
      end: 2022,
      interval: 1,
    },
    data: [
      {
        dataPoints: [
          { type: 'bears', x: 2017, y: 5 },
          { type: 'bears', x: 2018, y: 50 },
          { type: 'bears', x: 2019, y: 85 },
          { type: 'bears', x: 2020, y: 114 },
          { type: 'bears', x: 2021, y: 140 },
          { type: 'bears', x: 2022, y: 182 },
        ],
      },
    ],
  };
  return (
    <div>
      <h3>Line chart (example 1)</h3>
      <NiceCharts chartOptions={options} />
    </div>
  );
};

export default LineExample1;
