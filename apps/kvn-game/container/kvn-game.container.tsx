import React from 'react';
import KvnGameCanvasComponent from '../component/kvn-game-canvas/kvn-game-canvas.component';
import KvnDevControlsComponent from '../component/kvn-dev-controls/kvn-dev-controls.component';

import './kvn-game-container.scss';

function KvnGameContainer() {
  return (
    <div className="kvn-game-container">
      <KvnGameCanvasComponent></KvnGameCanvasComponent>
      <KvnDevControlsComponent></KvnDevControlsComponent>
    </div>
  );
}

export default KvnGameContainer;
