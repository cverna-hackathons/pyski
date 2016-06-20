/**
 * [function description]
 * @param  {{}} game
 *         			{String}
 * @return {[type]}      [description]
 */
module.exports = function(game, stdout) {
  if (stdout) {
    console.log('game invalidMoveOfPlayer:', game.invalidMoveOfPlayer)
    console.log('game lastGrid:')
    console.log(game.lastGrid)
  }
}
