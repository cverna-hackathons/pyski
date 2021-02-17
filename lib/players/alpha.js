/**
* A common dummy player choosing random empty spot on grid
*/
const EMPTY_MARK = 0
const Validators = {
  empty: ({ value }) => (value === EMPTY_MARK),
  enemy: ({ value, myMark }) => (value !== EMPTY_MARK && value !== myMark),
  own: ({ value, myMark }) => value === myMark,
}
const POSITION_STATE_LABELS = Object.keys(Validators)
const getGroupedPositions = (grid, myMark) => grid.reduce((accum, row, rowIdx) => {
  row.forEach((value, colIdx) => {
    POSITION_STATE_LABELS.forEach(state => {
      if (Validators[state]({ value, myMark })) {
        accum[state].push([ colIdx, rowIdx ])
      }
    })
  })
  return accum
}, { empty: [], enemy: [], own: [] })

/* [ X, Y ] - Direction vectors
 */
const DIRECTION_VECTORS = [
  [-1,-1], [ 0,-1], [ 1,-1],
  [-1, 0], /* [ 0, 0], */ [ 1, 0],
  [-1, 1], [ 0, 1], [ 1, 1],
]

const getGridSize = grid => ([ grid[0].length, grid.length ])
const getDirectionData = ([
  colShift,
  rowShift,
]) => POSITION_STATE_LABELS.reduce((accum, state) => {
  accum[state] = { count: 0, continuous: 0 }
  return accum
}, {
  len: 0,
  positions: [],
  vector: [ colShift, rowShift ],
})

const assess = ({
  directions = [ ...DIRECTION_VECTORS ], // direction vectors
  grid,
  myMark,
  position: [ colIdx, rowIdx ],
  winningLength,
}) => directions.map(([
  colShift,
  rowShift,
]) => {
  const data = getDirectionData([ colShift, rowShift ])
  const [ cols, rows ] = getGridSize(grid)
  let col = (colShift + colIdx)
  let row = (rowShift + rowIdx)

  while (
    (row >= 0 && row < rows) && (col >= 0 && col < cols) &&
    data.len < (winningLength - 1)
  ) {
    POSITION_STATE_LABELS.forEach(state => {
      if (Validators[state]({ value: grid[row][col], myMark })) {
        data[state].count += 1
        data[state].continuous += (
          data.len === data[state].continuous ? 1 : 0
        )
      }
    })
    data.len++
    data.positions.push([ col, row ])
    row += rowShift
    col += colShift
  }
  return data
})

const getWinningPosition = ({
  empty,
  ...options
}) => empty.find(position => assess({
  position,
  ...options,
}).find(({
  own: { continuous },
}) => (
  continuous === (options.winningLength - 1)
)))

const getDefensePosition = ({
  empty,
  ...options
}) => empty.find(position => assess({
  position,
  ...options,
}).find(({
  empty: { count: emptyPositions },
  enemy: { count: enemyPositions },
}) => (
  enemyPositions >= (options.winningLength - 2) &&
  (emptyPositions + enemyPositions) >= (options.winningLength - 1)
)))

const getOpeningPosition = ({
  empty,
  ...options
}) => empty.reduce((accum, position) => {
  const directions = assess({
    position,
    ...options,
  })
  const score = directions.reduce(
    (sum, { empty: { continuous } }) => (sum + continuous), 0
  )
  if (score > accum.score) {
    return {
      score,
      position,
    }
  } else return accum
}, { score: 0 }).position

const getAdjacentPosition = ({
  empty,
  ...options
}) => empty.reduce((accum, position) => {
  const directions = assess({
    position,
    ...options,
  })
  const score = directions.reduce(
    (sum, {
      enemy: { count: enemyPositions },
      own: { continuous }
    }) => (enemyPositions > 0 ? 0 : (sum + continuous)), 0
  )
  if (score > accum.score) {
    return {
      score,
      position,
    }
  } else return accum
}, { score: 0 }).position

module.exports = function(
  grid,
  { mark: myMark, winningLength },
  done
) {
  const {
    empty,
    // enemy,
    // own,
  } = getGroupedPositions(grid, myMark)

  let result = (
    // First check position we could win with this move
    getWinningPosition({ grid, myMark, empty, winningLength }) ||
    // Next check position which threatens us
    getDefensePosition({ grid, myMark, empty, winningLength }) ||
    // Next find position that is adjacent to my previous
    getAdjacentPosition({ grid, myMark, empty, winningLength }) ||
    // If none of above found, get an opening position
    getOpeningPosition({ grid, myMark, empty, winningLength })
  )

  return done(result)
}
