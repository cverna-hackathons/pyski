/**
 * A player according to minimax algo
 */
const EMPTY_MARK = 0
const markMap = {
  '1': 'o',
  '2': 'x',
  '0': ' ',
}
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

let moveIter = 0

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
  position: [colIdx, rowIdx],
  winningLength,
}) => {
  let terminalFound
  let directionIdx = 0

  while (
    !terminalFound &&
    directionIdx < DIRECTION_VECTORS.length
  ) {
    const [ colShift, rowShift ] = DIRECTION_VECTORS[directionIdx]
    const len = lenInDirection({
      grid,
      vector: [colShift, rowShift],
      colIdx,
      rowIdx,
      winningLength,
    })
    const oppositeLen = lenInDirection({
      grid,
      vector: [colShift * -1, rowShift * -1],
      colIdx,
      rowIdx,
      winningLength,
    })
    const markLen = (len + 1 + oppositeLen)

    // console.log(
    //   `isTerminalFor [${markMap[grid[rowIdx][colIdx]]}], ` +
    //   `l:${markLen}[${len}-1-${oppositeLen}]/${winningLength} > p[${colIdx},${rowIdx}]` +
    //   `>>v[${colShift},${rowShift}]`
    // )
    terminalFound = markLen >= winningLength
    directionIdx++
  }

  return terminalFound
}

const copyGrid = src => src.map(row => row.slice(0))

const isTerminalWith = ({ grid, winningLength }) => {
  const winnerMark = grid.reduce((mark, row, rowIdx) => {
    if (mark === 0) {
      row.forEach((value, colIdx) => {
        if (
          value !== EMPTY_MARK &&
          isTerminalFor({
            grid,
            position: [ colIdx, rowIdx ],
            winningLength,
          })
        ) {
          mark = grid[rowIdx][colIdx]
        }
      })
    }
    return mark
  }, 0)

  if (winnerMark === 0 && getEmptyPositions(grid).length === 0) {
    // it's a tie
    // printGrid(grid, `tie`)
    return -1
  } else return winnerMark
}

const getOponentMark = mark => (mark === 1 ? 2 : 1)
const makeMove = ({ grid, mark, move: [ colIdx, rowIdx ] }) => {
  const nextGrid = copyGrid(grid)
  nextGrid[rowIdx][colIdx] = mark

  return nextGrid
}
const minimax = ({
  depth,
  grid,
  mark,
  maxDepth,
  winningLength,
}) => {
  moveIter++
  const isMaximizing = (depth % 2 === 0)
  const [ cols, rows ] = getGridSize(grid)
  const MAX_ABS_SCORE = (cols * rows)
  const terminalScore = (isMaximizing ? -1 : 1) * (MAX_ABS_SCORE - depth)
  const winStatus = isTerminalWith({
    grid,
    winningLength,
  })

  if (winStatus !== 0) {
    // if we have a result, return (0 for tie, terminal score for winner)
    // printGrid(
    //   grid,
    //   `[${depth}] WinStatus: ${winStatus} / max:${isMaximizing} > ${terminalScore}`
    // )
    // console.log(`WIN:${winStatus}:${mark}>>${terminalScore}`)
    return (winStatus > 0 ? terminalScore : 0)
  } else {
    // go through empty positions, and reduce them to a score
    return getEmptyPositions(grid).reduce((bestScore, move) => {
      const nextMark = getOponentMark(mark)
      const nextGrid = makeMove({
        grid,
        move,
        mark,
      })
      const score = minimax({
        depth: (depth + 1),
        grid: nextGrid,
        mark: nextMark,
        maxDepth,
        winningLength,
      })
      const newBestScore = (
        isMaximizing
          ? Math.max(bestScore, score)
          : Math.min(bestScore, score)
      )

      if (depth === 0) {
        // printGrid(
        //   nextGrid,
        //   `After scoring for [${markMap[nextMark]}] ` +
        //   `[max:${isMaximizing}>${nextIsMaximizing}] ` +
        //   `move: [${move}], s:${score}/${bestScore}>${newBestScore}, ` +
        //   `d:${depth}/${maxDepth}`
        // )
        console.log(
          `${isMaximizing?'MAX':'MIN'}::d[${depth}], ` +
          `m[${move}]::${score}>>${newBestScore}`
        )
      }

      return newBestScore
    }, terminalScore)
  }
}

const printGrid = (
  grid,
  label = `[${grid.length}x${grid[0].length}]`
) => {
  console.info(`Grid: ${label}`)
  grid.forEach(
    row => console.info(`${row.map(v => markMap[v]).join('|')}\n${Array(row.length).fill('-').join('-')}`)
  )
}

const getMove = ({
  grid,
  mark,
  winningLength,
}) => {
  moveIter = 0
  const start = Date.now()
  // let's get empties
  // now let's get the terminal score for each of the empty positions
  const [ width, height ] = getGridSize(grid)
  const emptyPositions = getEmptyPositions(grid)
  console.log('emptyPositions', emptyPositions.length)
  const scoredMoves = emptyPositions.map(move => {
    const score = minimax({
      depth: 1,
      grid: makeMove({
        grid,
        move,
        mark,
      }),
      isMaximizing: false,
      mark: getOponentMark(mark),
      maxDepth: ((width * height) - 1),
      winningLength,
    })
    console.log(`Scoring [i:${moveIter}] [${move}]>${score}`)

    return {
      move,
      score,
    }
  })

  const bestMove = scoredMoves.reduce((best, scoredMove) => {
    if (!best.move || (scoredMove.score > best.score)) {
      return scoredMove
    } else return best
  }, { move: null, score: 0 })
  printGrid(grid, `gridBeforeMove of ${markMap[mark]}`)
  console.log('scored moves', scoredMoves)
  console.log(`chosen [${markMap[mark]}] bestMove [i:${moveIter}]`, bestMove)
  console.log(`took ${((Date.now() - start) / 1000).toFixed(3)}s`)

  return bestMove.move
}

module.exports = async function(grid, { mark, winningLength }) {
  return getMove({
    grid,
    mark,
    winningLength,
  })
}
