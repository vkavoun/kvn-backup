import * as PIXI from 'pixi.js';

const COLOR = {
  RED: 0xff0000,
  GREEN: 0x00ff00,
  BLUE: 0x0000ff
};

/** Rendering parameters */
let mainStage = null;
let cellCount: number = 0;
let cellWidth: number = 0;
let gridSize: number = 0;
let app: PIXI.Application = null;
let gridContainer: PIXI.Container = null;
let spriteContainer: PIXI.Container = null;
let spriteTextures = new Map<number, PIXI.RenderTexture>();

/** Game components */
let sprites: PIXI.Sprite[][];

const initBaseTextures = () => {
  Object.values(COLOR).forEach(color => {
    spriteTextures.set(color, createTexture(color));
  });
};

const initSpriteArray = () => {
  sprites = [];
  for (let x = 0; x < cellCount; x++) {
    sprites[x] = [];
  }
};

export const initRenderer = (stage, count, width, size) => {
  mainStage = stage;
  cellCount = count;
  cellWidth = width;
  gridSize = size;

  app = new PIXI.Application({
    width: mainStage.current.clientWidth,
    height: mainStage.current.clientHeight,
    backgroundColor: 0x000000,
    resolution: 1,
    antialias: true
  });

  initBaseTextures();
  initSpriteArray();
  mainStage.current.appendChild(app.view);
};

const addContainer = (container: PIXI.Container) => {
  container.x = (app.screen.width - gridSize) / 2;
  container.y = (app.screen.height - gridSize) / 2;

  app.stage.addChild(container);
};

const createTexture = (color: number) => {
  const graphics = new PIXI.Graphics();
  const radius = (cellWidth - 20) / 2;
  graphics.beginFill(color, 0.7);
  graphics.moveTo(0, 0);
  graphics.lineStyle(0);
  graphics.drawCircle(radius, radius, (cellWidth - 20) / 2);
  graphics.endFill();

  const texture = PIXI.RenderTexture.create({
    width: graphics.width,
    height: graphics.height
  });

  app.renderer.render(graphics, texture);

  return texture;
};

function onDragStart(event) {
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

const getCell = sprite => {
  const position = sprite.data.getLocalPosition(sprite.parent);
  const xCell = Math.floor(position.x / cellWidth);
  const yCell = Math.floor(position.y / cellWidth);

  return { xCell, yCell };
};

const centerSprite = sprite => {
  const cell = getCell(sprite);

  sprite.x = cell.xCell * cellWidth + cellWidth / 2;
  sprite.y = cell.yCell * cellWidth + cellWidth / 2;
};

function onDragEnd() {
  centerSprite(this);
  this.alpha = 1;
  this.dragging = false;
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
    console.log(getCell(this));
  }
}

const createSprite = (color: number) => {
  const sprite = new PIXI.Sprite(spriteTextures.get(color));

  sprite.interactive = true;
  sprite.buttonMode = true;

  sprite
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  return sprite;
};

export const renderBubbles = () => {
  const graphicsContainer = new PIXI.Container();
  const graphics = new PIXI.Graphics();

  graphicsContainer.addChild(graphics);

  const maxItems = cellCount * cellCount;
  //draw cell boundary vertical lines
  for (let i = 0; i < maxItems; i++) {
    const bubble = createSprite(COLOR.BLUE);
    bubble.anchor.set(0.5);

    const xPos = i % cellCount;
    const yPos = Math.floor(i / cellCount);

    sprites[xPos][yPos] = bubble;

    bubble.x = xPos * cellWidth + cellWidth / 2;
    bubble.y = yPos * cellWidth + cellWidth / 2;

    graphicsContainer.addChild(bubble);
  }

  spriteContainer = graphicsContainer;
  addContainer(spriteContainer);
};

export const renderGrid = () => {
  const graphicsContainer = new PIXI.Container();
  const graphics = new PIXI.Graphics();
  graphicsContainer.addChild(graphics);

  const internalCellCount = 3;
  const internalCellWidth = cellWidth / internalCellCount;
  const internalCellTotalCount = gridSize / internalCellWidth;

  //draw cell boundary vertical lines
  for (let i = 0; i < internalCellTotalCount + 1; i++) {
    let x = (i % (internalCellTotalCount + 1)) * internalCellWidth;
    let y = gridSize;

    if (i % internalCellCount === 0) {
      graphics.lineStyle(2, 0xffd900, 1);
    } else {
      graphics.lineStyle(1, 0xffd900, 0.5);
    }

    graphics.beginFill(0xff3300);
    graphics.moveTo(x, 0);
    graphics.lineTo(x, y + 1);
    graphics.closePath();
    graphics.endFill();
  }

  //draw cell boundary horizontal lines lines
  for (let i = 0; i < internalCellTotalCount + 1; i++) {
    let x = -1;
    let y = (i % (internalCellTotalCount + 1)) * internalCellWidth;

    if (i % internalCellCount === 0) {
      graphics.lineStyle(2, 0xffd900, 1);
    } else {
      graphics.lineStyle(1, 0xffd900, 0.5);
    }

    graphics.beginFill(0xff3300);
    graphics.moveTo(x, y);
    graphics.lineTo(gridSize + 1, y);
    graphics.closePath();
    graphics.endFill();
  }

  gridContainer = graphicsContainer;

  addContainer(gridContainer);
};
