import React from 'react';

const BarChart = ({ chartOptions }) => {
  const canvasRef = React.useRef(null);
  return (
    <div>
      <canvas
        className="canvas-bar"
        ref={canvasRef}
        width={700}
        height={400}
        onClick={(e) => {
          alert(e.clientX);
        }}
      />
    </div>
  );
};

export default BarChart;
