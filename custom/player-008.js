'use strict'

console.log('Loading Bond 008')

var gameState = resetState()

function resetState() {
  return {
    round: 0
  }
}


module.exports = function(grid, options, next) {
  gameState.round++

  return next([0,0])
}