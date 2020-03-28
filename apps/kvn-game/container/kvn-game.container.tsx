import React from 'react';
import dynamic from 'next/dynamic';
import KvnDevControlsComponent from '../component/kvn-dev-controls/kvn-dev-controls.component';
import EventManager from '../events/eventManager';
import * as Event from '../events/events';

const KvnGameStageComponent = dynamic(
  import('../component/kvn-game-stage/kvn-game-stage.component'),
  { ssr: false }
);

import { environment } from '../environments/environment';

import './kvn-game.container.scss';

function KvnGameContainer() {
  const eventManager = EventManager.getInstance();

  const handleResetClick = () => {
    eventManager.dispatch(Event.RESET);
  };

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
        <KvnGameStageComponent></KvnGameStageComponent>
      </main>
      {!environment.production && (
        <KvnDevControlsComponent
          handleResetClick={handleResetClick}
        ></KvnDevControlsComponent>
      )}
    </>
  );
}

export default KvnGameContainer;
