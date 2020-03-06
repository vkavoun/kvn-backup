import React from 'react';
import KvnGameContainer from '../container/kvn-game.container';

import './index.scss';

import { environment } from '../environments/environment';

export const Index = () => {
  return (
    <div className="app">
      <header className="flex">
        <h1>
          Welcome to kvn-game! [{environment.production ? 'PROD' : 'DEV'}]
        </h1>
      </header>
      <main>
        <KvnGameContainer></KvnGameContainer>
      </main>
    </div>
  );
};

export default Index;
