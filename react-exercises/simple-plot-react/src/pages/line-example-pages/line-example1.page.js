import React from 'react';

const LineExample1 = () => {
  const canvasRef = React.useRef(null);
  return (
    <div>
      <h3>Line chart (example 1)</h3>
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

export default LineExample1;
