let CheckWin = require('./checkWin')

let DEFAULT_VALUE = 0

module.exports = {
  defaultValue: DEFAULT_VALUE,
  createGrid: createGrid,
  makeMove: makeMove,
  checkWin: CheckWin,
  isFull: isFull,
  toString: toString,
}

function createGrid(width, height) {
  return Array(height)
    .fill(0)
    .map(() =>
      Array(width)
        .fill(0)
        .map(() => DEFAULT_VALUE),
    )
}

function makeMove(grid, x, y, value) {
  if (grid[y][x] !== DEFAULT_VALUE) {
    return false
  }

  grid[y][x] = value
  return grid
}

function isFull(grid) {
  return !toString(grid).includes(DEFAULT_VALUE)
}

function toString(grid) {
  return grid
    .reduce((result, row) => {
      result.push(row.join(''))
      return result
    }, [])
    .join('\n')
}
