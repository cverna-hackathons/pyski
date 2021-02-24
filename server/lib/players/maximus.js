/**
 * A player according to minimax algo
 */
const EMPTY_MARK = 0
const isOtherPlayerMark = (mark, myMark) => (
  mark !== EMPTY_MARK && myMark !== mark
)

const copyGrid = src => src.map(row => row.slice(0))
const checkWinning = (grid, mark) => {

}

const minimax = (grid, mark, depth, isMaximing = true) => {
  let score = 0
  let move
  grid.forEach((row, y) => row.forEach((value, x) => {
    if (value === EMPTY_MARK) {
      const newGrid = copyGrid(grid)
      newGrid[y][x] = mark

      if (checkWinning(newGrid, mark)) {
        return { grid: newGrid,  }
      }
    }
  }))

  return score
}


module.exports = async function(grid, { mark: myMark, winningLength }) {
  return getMove(grid, myMark, winningLength)
}
