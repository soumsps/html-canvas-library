import React from 'react';
import LineChart from '../nice-charts-lib/line.component';
import BarChart from '../nice-charts-lib/bar.component';

const NiceCharts = ({ chartOptions }) => {
  const renderSwitch = (type) => {
    switch (type) {
      case 'line':
        return <LineChart chartOptions={chartOptions} />;
      case 'bar':
        return <BarChart chartOptions={chartOptions} />;
      default:
        throw new Error(`${type} chart type does not exist.`);
    }
  };
  return <>{renderSwitch(chartOptions.chartType)}</>;
};

export default NiceCharts;
