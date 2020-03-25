import React from 'react';

import './kvn-game-canvas.component.scss';

function KvnGameCanvasComponent() {
  const mainCanvas = React.useRef(null);

  return (
    <div className="kvn-game-canvas-component">
      <canvas
        className="kvn-game-canvas"
        ref={mainCanvas}
        onClick={e => {
          const canvas = mainCanvas.current;
          const ctx = canvas.getContext('2d');
          // implement draw on ctx here
        }}
      />
    </div>
  );
}

export default KvnGameCanvasComponent;
