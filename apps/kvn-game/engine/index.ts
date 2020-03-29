import * as PIXI from 'pixi.js';

const COLOR = {
  RED: 0xff0000,
  GREEN: 0x00ff00,
  BLUE: 0x0000ff
};

export default class RenderingEngine {
  mainStage = null;
  cellCount: number = 0;
  cellWidth: number = 0;
  gridSize: number = 0;
  app: PIXI.Application;
  gridContainer: PIXI.Container;
  spriteContainer: PIXI.Container;
  spriteTextures = new Map<number, PIXI.RenderTexture>();

  constructor({ mainStage, cellCount, cellWidth, gridSize }) {
    this.mainStage = mainStage;
    this.cellCount = cellCount;
    this.cellWidth = cellWidth;
    this.gridSize = gridSize;

    this.app = new PIXI.Application({
      width: mainStage.current.clientWidth,
      height: mainStage.current.clientHeight,
      backgroundColor: 0x000000,
      resolution: 1,
      antialias: true
    });

    this.initBaseTextures();

    this.mainStage.current.appendChild(this.app.view);
  }

  private addContainer(container: PIXI.Container) {
    container.x = (this.app.screen.width - this.gridSize) / 2;
    container.y = (this.app.screen.height - this.gridSize) / 2;

    this.app.stage.addChild(container);
  }

  private createTexture(color: number) {
    const graphics = new PIXI.Graphics();
    const radius = (this.cellWidth - 20) / 2;
    graphics.beginFill(color, 0.7);
    graphics.moveTo(0, 0);
    graphics.lineStyle(0);
    graphics.drawCircle(radius, radius, (this.cellWidth - 20) / 2);
    graphics.endFill();

    const texture = PIXI.RenderTexture.create({
      width: graphics.width,
      height: graphics.height
    });

    this.app.renderer.render(graphics, texture);

    return texture;
  }

  private initBaseTextures() {
    Object.values(COLOR).forEach(color => {
      this.spriteTextures.set(color, this.createTexture(color));
    });
  }

  private createSprite(color: number) {
    return new PIXI.Sprite(this.spriteTextures.get(color));
  }

  renderBubbles() {
    const graphicsContainer = new PIXI.Container();
    const graphics = new PIXI.Graphics();
    graphicsContainer.addChild(graphics);

    const maxItems = this.cellCount * this.cellCount;
    //draw cell boundary vertical lines
    for (let i = 0; i < maxItems; i++) {
      const bubble = this.createSprite(COLOR.BLUE);
      bubble.anchor.set(0.5);
      bubble.x = (i % this.cellCount) * this.cellWidth + this.cellWidth / 2;
      bubble.y =
        Math.floor(i / this.cellWidth) * this.cellWidth +
        this.cellWidth / 2 +
        this.cellWidth * Math.floor(i / this.cellCount);

      bubble.interactive = true;
      bubble.buttonMode = true;

      graphicsContainer.addChild(bubble);
    }

    this.spriteContainer = graphicsContainer;
    this.addContainer(this.spriteContainer);
  }

  public renderGrid() {
    const graphicsContainer = new PIXI.Container();
    const graphics = new PIXI.Graphics();
    graphicsContainer.addChild(graphics);

    const internalCellCount = 3;
    const internalCellWidth = this.cellWidth / internalCellCount;
    const internalCellTotalCount = this.gridSize / internalCellWidth;

    //draw cell boundary vertical lines
    for (let i = 0; i < internalCellTotalCount + 1; i++) {
      let x = (i % (internalCellTotalCount + 1)) * internalCellWidth;
      let y = this.gridSize;

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
      graphics.lineTo(this.gridSize + 1, y);
      graphics.closePath();
      graphics.endFill();
    }

    this.gridContainer = graphicsContainer;

    this.addContainer(this.gridContainer);
  }
}
