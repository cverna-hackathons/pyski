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
  })
  return empties
}, [])

const getGridSize = grid => [grid[0].length, grid.length]
const lenInDirection = ({
  grid,
  colIdx,
  rowIdx,
  vector: [ colShift, rowShift ],
  winningLength,
}) => {
  const [cols, rows] = getGridSize(grid)
  const mark = grid[rowIdx][colIdx]
  let len = 0
  let col = colShift + colIdx
  let row = rowShift + rowIdx

  while (
    row >= 0 &&
    row < rows &&
    col >= 0 &&
    col < cols &&
    grid[row][col] === mark &&
    len < winningLength
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
      grid,
      vector: [colShift, rowShift],
      colIdx,
      rowIdx,
      winningLength,
    })
    let oppositeLen = lenInDirection({
      grid,
      mark,
      vector: [colShift * -1, rowShift * -1],
      rowIdx,
      colIdx,
      winningLength,
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
  isMaximizing = true,
  winningLength,
}) => {
  const [ cols, rows ] = getGridSize(grid)
  const MAX_ABS_SCORE = Math.pow(rows * cols)
  const terminalScore = (isMaximizing ? 1 : -1) * (MAX_ABS_SCORE - depth)

  return getEmptyPositions(grid).reduce((best, [ col, row ]) => {
    const nextMove = [ col, row ]
    const nextGrid = copyGrid(grid)

    nextGrid[row][col] = mark
    const isTerminal = isTerminalFor({
      grid: nextGrid,
      move: nextMove,
      winningLength,
    })
    let score = 0

    if (isTerminal) {
      printGrid(nextGrid, `terminal move: [${nextMove}] - d:${depth}/${maxDepth} -`)
      score = terminalScore
    } else if (depth < maxDepth) {
      score = minimax({
        grid: nextGrid,
        depth: (depth + 1),
        isMaximizing: !isMaximizing,
        mark: (mark === 1 ? 2 : 1),
        maxDepth,
        winningLength,
      }).score
    }

    if (
      !best.move || (
        (isMaximizing && score > best.score) ||
        (!isMaximizing && score < best.score)
      )
    ) {
      best.move = nextMove
      best.score = score
    }

    return best
  }, { move: null, score: 0 })
}

const printGrid = (
  grid,
  label = `[${grid.length}x${grid[0].length}]`
) => {
  const markMap = {
    '1': 'x',
    '2': 'o',
    '0': ' ',
  }
  console.info(`Grid: ${label}`)
  grid.forEach(
    row => console.info(`${row.map(v => markMap[v]).join('|')}\n${Array(row.length).fill('-')}`)
  )
}

const getMove = ({
  grid,
  mark,
  winningLength,
}) => {
  // let's get empties
  // now let's get the terminal score for each of the empty positions
  const {
    move,
    score,
  } = minimax({
    grid,
    isMaximizing: true,
    maxDepth: (winningLength * 2),
    mark,
    winningLength,
  })

  console.log('getMove score, move', score, move)

  return move
}

module.exports = async function(grid, { mark, winningLength }) {
  return getMove({
    grid,
    mark,
    winningLength,
  })
}
