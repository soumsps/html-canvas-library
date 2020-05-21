import React from 'react';

const BarExample1 = () => {
  const canvasRef = React.useRef(null);
  return (
    <div>
      <h3>Bar chart (example 1)</h3>
      <canvas
        className="canvas-bar"
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

export default BarExample1;
