import React from 'react';
import NiceCharts from '../../components/nice-charts-lib/nice-charts.component';

const LineExample1 = () => {
  const options = {
    chartTitle: 'Wildlife Population',
    chartType: 'bar',
    chartWidth: 650,
    chartHeight: 450,
    chartBackgroundColor: '#f3f3f3',
    axisY: {
      title: 'Population in crores',
      scale: 'auto',
      segments: 5,
    },
    axisX: {
      title: 'Years',
      scale: [2014, 2015, 2016, 2017, 2018, 2019],
    },
    data: [
      {
        label: 'Bears',
        color: 'red',
        data: [
          [2014, 5],
          [2015, 50],
          [2016, 85],
          [2017, 114],
          [2018, 140],
          [2019, 182],
        ],
      },
      {
        label: 'Dolphins',
        color: 'blue',
        data: [
          [2014, 140],
          [2015, 77],
          [2016, 25],
          [2017, 11],
          [2018, 34],
          [2019, 5],
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
