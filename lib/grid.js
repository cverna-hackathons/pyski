'use strict';

let CheckWin = require('./check-win');

let DEFAULT_VALUE = 0;

module.exports = {
  defaultValue: DEFAULT_VALUE,
  createGrid: createGrid,
  makeMove: makeMove,
  checkWin: CheckWin,
  isFull: isFull,
  toString: toString
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

function isFull(grid) {
  for (let x=0, lenX = grid.length; x < lenX; x++) {
    for (let y=0, lenY = grid[x].length; y < lenY; y++) {
      if (grid[x][y] === DEFAULT_VALUE) return false;
    }
  }
  return true;
}

function toString(grid) {
  let res = '';
  for (let y=0, yLen = grid[0].length; y < yLen; y++) {
    for (let x=0, xLen = grid.length; x < xLen; x++) {
      res += grid[x][y];
    }
    res += '\n';
  }
  return res;
}
