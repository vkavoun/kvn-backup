import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import EventManager from '../../events/eventManager';
import * as Event from '../../events/events';
import { drawGrid } from '../../graphics/geometry';

import './kvn-game-stage.component.scss';

function KvnGameStageComponent() {
  const mainStage = useRef(null);
  const eventManager = EventManager.getInstance();

  let gridContainer = null;
  let bubbleContainer = null;
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

  const drawItems = () => {
    const container = new PIXI.Container();

    app.stage.addChild(container);

    // Create a new texture
    const texture = PIXI.Texture.from('/bunny.png');

    // Create a 5x5 grid of bunnies
    for (let i = 0; i < 25; i++) {
      const bunny = new PIXI.Sprite(texture);
      bunny.anchor.set(0.5);
      bunny.x = (i % 5) * 40;
      bunny.y = Math.floor(i / 5) * 40;
      container.addChild(bunny);
    }

    // Move container to the center
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;

    // Center bunny sprite in local container coordinates
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;

    // Listen for animate update
    app.ticker.add(delta => {
      // rotate the container!
      // use delta to create frame-independent transform
      container.rotation -= 0.01 * delta;
    });
  };

  useEffect(() => {
    app = new PIXI.Application({
      width: mainStage.current.clientWidth,
      height: mainStage.current.clientHeight,
      backgroundColor: 0x000000,
      resolution: 1,
      antialias: true
    });
    mainStage.current.appendChild(app.view);

    initGameConstants();

    gridContainer = drawGrid({
      cellWidth,
      gridSize
    });

    gridContainer.x = (app.screen.width - gridSize) / 2;
    gridContainer.y = (app.screen.height - gridSize) / 2;

    

    app.stage.addChild(gridContainer);
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
