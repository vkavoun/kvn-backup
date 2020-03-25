import React from 'react';
import KvnGameCanvasComponent from '../component/kvn-game-canvas/kvn-game-canvas.component';
import KvnDevControlsComponent from '../component/kvn-dev-controls/kvn-dev-controls.component';

import { environment } from '../environments/environment';

import './kvn-game.container.scss';

function KvnGameContainer() {
  return (
    <>
      <header className="flex">
        <h1>
          Welcome to kvn-game! [{environment.production ? 'PROD' : 'DEV'}]
        </h1>
      </header>
      <main
        className={`kvn-game-container ${
          environment.production ? 'prod' : 'dev'
        }`}
      >
        <KvnGameCanvasComponent></KvnGameCanvasComponent>
      </main>
      {!environment.production && (
        <KvnDevControlsComponent></KvnDevControlsComponent>
      )}
    </>
  );
}

export default KvnGameContainer;
