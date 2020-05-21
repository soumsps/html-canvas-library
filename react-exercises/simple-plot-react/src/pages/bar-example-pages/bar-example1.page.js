import React from 'react';
import NiceCharts from '../../components/nice-charts-lib/nice-charts.component';

const BarExample1 = () => {
  const options = {
    chartTitle: 'State-wise annual max temparature comparision',
    chartType: 'bar',
    axisY: {
      title: 'Temp in degrees',
      suffix: '°C',
      start: -5,
      end: 50,
      interval: 5,
    },
    axisX: {
      title: 'Years',
      start: 2010,
      end: 2014,
      interval: 1,
    },
    data: [
      {
        dataPoints: [
          { state: 'UP', x: 2010, y: 40 },
          { state: 'DL', x: 2010, y: 42 },
          { state: 'UP', x: 2011, y: 45 },
          { state: 'DL', x: 2011, y: 47 },
          { state: 'UP', x: 2012, y: 44 },
          { state: 'DL', x: 2012, y: 47 },
          { state: 'UP', x: 2013, y: 45 },
          { state: 'DL', x: 2013, y: 45 },
        ],
      },
    ],
  };
  return (
    <div>
      <h3>Bar chart (example 1)</h3>
      <NiceCharts chartOptions={options} />
    </div>
  );
};

export default BarExample1;
