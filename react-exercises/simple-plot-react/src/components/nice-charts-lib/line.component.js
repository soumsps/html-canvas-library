import React from 'react';

const LineChart = ({ chartOptions }) => {
  const canvasRef = React.useRef(null);
  return (
    <div>
      <canvas
        className="canvas-line"
        ref={canvasRef}
        width={600}
        height={400}
        onClick={(e) => {
          alert(e.clientX);
        }}
      />
    </div>
  );
};

export default LineChart;
