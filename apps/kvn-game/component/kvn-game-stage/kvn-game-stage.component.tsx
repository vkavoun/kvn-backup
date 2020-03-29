import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import EventManager from '../../events/eventManager';
import * as Event from '../../events/events';
import * as RenderingEngine from '../../engine';

import './kvn-game-stage.component.scss';

function KvnGameStageComponent() {
  const mainStage = useRef(null);
  const eventManager = EventManager.getInstance();

  const cellCount = 7;
  const padding = 20;
  let cellWidth = 0;
  let gridSize = 0;

  let app = null;

  eventManager.addEventListener(Event.RESET, () => {
    console.log('reset event');
  });

  const initGameConstants = () => {
    cellWidth = (mainStage.current.clientWidth - padding) / cellCount;
    gridSize = cellCount * cellWidth;
  };

  useEffect(() => {
    initGameConstants();
    RenderingEngine.initRenderer(mainStage, cellCount, cellWidth, gridSize);
    RenderingEngine.renderGrid();
    RenderingEngine.renderBubbles();
    // return () => {
    //   cleanup;
    // };
  }, [mainStage]);

  return <div ref={mainStage} className="kvn-game-stage-component"></div>;
}

export async function getStaticProps({ req }) {
  const isServer = !!req;
  return {
    props: {
      isServer
    }
  };
}

export default KvnGameStageComponent;
