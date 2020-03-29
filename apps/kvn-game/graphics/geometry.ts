import * as PIXI from 'pixi.js';

export const drawGrid = ({ cellWidth, gridSize }) => {
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

  return graphicsContainer;
};
