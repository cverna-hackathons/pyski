/**
 * A player according to minimax algo
 */
const EMPTY_MARK = 0
/** [ X, Y ] - Direction vectors
 *
const DIRECTION_VECTORS = [
  [-1,-1], [ 0,-1], [ 1,-1],
  [-1, 0], [ 0, 0], [ 1, 0],
  [-1, 1], [ 0, 1], [ 1, 1],
]

 **/
const DIRECTION_VECTORS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  /* [ 0, 0], */ [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
]
const HALF_DIRECTIONS = DIRECTION_VECTORS.slice(
  0, (DIRECTION_VECTORS.length / 2) - 1
)

const getEmptyPositions = grid => grid.reduce((empties, row, rowIdx) => {
  row.forEach((value, colIdx) => {
    if (value === EMPTY_MARK) {
      empties.push([ colIdx, rowIdx ])
    }
    return empties
  })
}, [])

const getGridSize = grid => [grid[0].length, grid.length]
const lenInDirection = ({
  grid,
  colIdx,
  rowIdx,
  vector: [ colShift, rowShift ]
}) => {
  const [cols, rows] = getGridSize(grid)
  const mark = grid[rowIdx][colIdx]
  let len = 0
  let col = colShift + colIdx
  let row = rowShift + rowIdx
  const value = grid[row][col]

  while (
    value === mark &&
    row >= 0 &&
    row < rows &&
    col >= 0 &&
    col < cols &&
    data.len < winningLength
  ) {
    len++
    row += rowShift
    col += colShift
  }
  return len
}
const isTerminalFor = ({
  grid,
  move: [colIdx, rowIdx],
  winningLength,
}) => {
  const mark = grid[rowIdx][colIdx]
  return !!HALF_DIRECTIONS.find(([colShift, rowShift]) => {
    let len = lenInDirection({
      grid, mark, vector: [colShift, rowShift]
    })
    let oppositeLen = lenInDirection({
      grid, mark, vector: [colShift * -1, rowShift * -1]
    })

    return (len + 1 + oppositeLen) >= winningLength
  })
}

const copyGrid = src => src.map(row => row.slice(0))

const minimax = ({
  depth = 0,
  grid,
  mark,
  maxDepth,
  isMaximing = true,
  results = [],
  winningLength,
}) => {
  let result = {
    grid: null,
    move: null,
    moves: [],
    score: 0,
    tie: true,
  }
  const [ cols, rows ] = getGridSize(grid)
  const MAX_ABS_SCORE = Math.pow(rows * cols)
  const score = (isMaximing ? 1 : -1) * (MAX_ABS_SCORE - depth)
  const emptyPositions = getEmptyPositions(grid)

  emptyPositions.forEach(([ col, row ]) => {
    const move = [ col, row ]
    result.grid = copyGrid(grid)
    result.grid[row][col] = mark
    const isTerminal = isTerminalFor({
      grid: result.grid,
      move: [col, row],
      winningLength,
    })
    if (isTerminal) {
      if (
        (isMaximing && score > result.score) ||
        (!isMaximing && score < result.score)
      ) {
        result.score = score
      }
    } else {
      result = minimax({
        grid: result.grid,
        depth: (depth + 1),
        isMaximing: !isMaximing,
        mark: (mark === 1 ? 2 : 1),
        maxDepth,
        winningLength,
      })
    }
    if (depth === 0) {
      result.move = [ ...move, score ]
    }
    results.push({ move, score })
  })

  return result
}


module.exports = async function(grid, { mark: myMark, winningLength }) {
  return getMove(grid, myMark, winningLength)
}
