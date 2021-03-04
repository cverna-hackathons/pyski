/**
 * A player according to minimax algo
 */
const EMPTY_MARK = 0
const markMap = {
  '1': 'o',
  '2': 'x',
  '0': ' ',
}

function checkWin(
  grid,
  value,
  WINNING_LEN
) {
  function isCorrectPosition(x, y) {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length
  }
  // Let's not iterate if there aren't enough marks
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === value) {
        //go to right
        let rightFound = true
        for (let i = 1; i < WINNING_LEN; i++) {
          if (!isCorrectPosition(x + i, y) || grid[y][x + i] !== value)
            rightFound = false
        }

        //go to right-down
        let rightDownFound = true
        for (let i = 1; i < WINNING_LEN; i++) {
          if (!isCorrectPosition(x + i, y + i) || grid[y + i][x + i] !== value)
            rightDownFound = false
        }

        //go down
        let downFound = true
        for (let i = 1; i < WINNING_LEN; i++) {
          if (!isCorrectPosition(x, y + i) || grid[y + i][x] !== value)
            downFound = false
        }

        //go left-down
        let leftDownFound = true
        for (let i = 1; i < WINNING_LEN; i++) {
          if (!isCorrectPosition(x - i, y + i) || grid[y + i][x - i] !== value)
            leftDownFound = false
        }

        if (rightFound || rightDownFound || downFound || leftDownFound) {
          return true
        }
      }
    }
  }
  return false
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

// const getEmptyPositions = grid => grid.reduce((empties, row, rowIdx) => {
//   row.forEach((value, colIdx) => {
//     if (value === EMPTY_MARK) {
//       empties.push([ colIdx, rowIdx ])
//     }
//   })
//   return empties
// }, [])

const getEmptyPositions = grid => {
  const result = []

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === EMPTY_MARK) {
        result.push([ x, y ])
      }
    }
  }

  return result
}

const getGridSize = grid => [grid[0].length, grid.length]
const copyGrid = src => src.map(row => row.slice(0))
const getOpponentMark = mark => (mark === 1 ? 2 : 1)
const makeMove = ({ grid, mark, move: [ colIdx, rowIdx ] }) => {
  const nextGrid = copyGrid(grid)
  nextGrid[rowIdx][colIdx] = mark

  return nextGrid
}
const minimax = ({
  alpha = -Infinity,
  beta = Infinity,
  depth,
  grid,
  mark,
  maxDepth,
  winningLength,
}) => {
  moveIter++
  const isMaximizing = (depth % 2 === 0)
  const [ cols, rows ] = getGridSize(grid)
  const positionCount = (cols * rows)
  const MAX_ABS_SCORE = positionCount
  const worstScore = (isMaximizing ? -1 : 1) * (MAX_ABS_SCORE - depth)
  // const gridIsTooEmpty = (
  //   (emptyPositions.length - 1) > (positionCount - (winningLength * 2))
  // )

  if (checkWin(grid, getOpponentMark(mark), winningLength)) {
    // if we have a result, return (0 for tie, terminal score for winner)
    // printGrid(
    //   grid,
    //   `[${depth}] WinStatus: ${winStatus} / max:${isMaximizing} > ${terminalScore}`
    // )
    // console.log(`WIN:${winStatus}:${mark}>>${terminalScore}`)
    return worstScore
  }

  const emptyPositions = getEmptyPositions(grid)

  if (emptyPositions.length === 0) {
    // This is a tie
    return 0
  } else if (depth <= maxDepth) {
    // go through empty positions, and reduce them to a score
    let pruneNextBranches = false
    return emptyPositions.reduce((bestScore, move) => {
      if (pruneNextBranches) {
        return bestScore
      }

      const nextMark = getOpponentMark(mark)
      const nextGrid = makeMove({
        grid,
        move,
        mark,
      })
      const score = minimax({
        alpha,
        beta,
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

      if (isMaximizing) {
        alpha = Math.max(alpha, score)
      } else {
        beta = Math.min(beta, score)
      }

      pruneNextBranches = (beta <= alpha)
      if (pruneNextBranches) {
        // printGrid(
        //   nextGrid,
        //   `After scoring for [${markMap[nextMark]}] ` +
        //   `[max:${isMaximizing}>${nextIsMaximizing}] ` +
        //   `move: [${move}], s:${score}/${bestScore}>${newBestScore}, ` +
        //   `d:${depth}/${maxDepth}`
        // )
        // console.log(
        //   `${isMaximizing?'MAX':'MIN'}::d[${depth}], ` +
        //   `m[${move}]::${score}>>${newBestScore}, : ${pruneNextBranches} ` +
        //   `α[${alpha}],β[${beta}]`
        // )
      }

      return newBestScore
    }, worstScore)
  } else return worstScore
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
  const scoredMoves = getEmptyPositions(grid).map(move => {
    const score = minimax({
      depth: 1,
      grid: makeMove({
        grid,
        move,
        mark,
      }),
      isMaximizing: false,
      mark: getOpponentMark(mark),
      maxDepth: winningLength + 1,
      winningLength,
    })
    // console.log(`Scoring [i:${moveIter}] [${move}]>${score}`)

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
  console.log(`velocity ${parseInt(moveIter / ((Date.now() - start) / 1000))}/s`)

  return bestMove.move
}

module.exports = async function(grid, { mark, winningLength }) {
  return getMove({
    grid,
    mark,
    winningLength,
  })
}
