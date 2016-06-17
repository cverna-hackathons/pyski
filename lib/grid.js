'use strict';

let DEFAULT_VALUE = 0;

module.exports = {
  createGrid: createGrid,
  makeMove: makeMove,
  checkWin: checkWin,
  isFull: isFull
};

function createGrid(X,Y) {
  let result = [];
  for(let i=0; i<X; i++) {
    let line = [];
    for(let k=0; k<Y; k++) {
      line.push(DEFAULT_VALUE);
    }
    result.push(line);
  }
  return result;
}

function makeMove(grid, x, y, value) {
  if (grid[x][y] !== DEFAULT_VALUE) {
    return false;
  }

  grid[x][y] = value;
  return grid;
}

function checkWin(grid, value) {

}

function isFull(grid) {

}
