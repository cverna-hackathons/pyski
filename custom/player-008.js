'use strict'

console.log('Loading Bond 008')

var gameState = resetState()

function resetState() {
  return {
    round: 0
  }
}

function getFreeFields(grid) {
  let res = []

  grid.forEach((row, rowIdx) => {
    row.forEach((val, colIdx) => {
      if (val === 0) res.push([ colIdx, rowIdx ])
    }) 
  })

  return res
}


module.exports = function(grid, options, next) {
  gameState.round++

  var freeFields = getFreeFields(grid)

  return next(freeFields[freeFields.length - 1])
}

