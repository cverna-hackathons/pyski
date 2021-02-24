/**
 * A player according to minimax algo
 */
const EMPTY_MARK = 0
const isOtherPlayerMark = (mark, myMark) => (
  mark !== EMPTY_MARK && myMark !== mark
)

const minimax = (grid, mark, depth, isMaximing = true) => {
  let score = 0
  grid.forEach((row, y) => row.forEach((value, x) => {

  }))

  return score
}


module.exports = async function(grid, { mark: myMark, winningLength }) {
  return getMove(grid, myMark, winningLength)
}
