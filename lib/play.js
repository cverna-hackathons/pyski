'use strict';

let Grid = require('./grid');
let async = require('async');

/**
 * @param players {function []}
 * @param options {{}}
            GRID_SIZE:[X,Y]
            NUM_OF_GAMES: INT,
            WINNING_LEN: 5,
            TIMEOUT: INT,
            MAX_ROUNDS: INT
   @returns int[] - number of wins for each player
 */

function play(players, options, done) {

  let results = (function(){
    let finalArr = [];
    for (let i=0, len=players.length; i<len; i++) {
      finalArr.push(0);
    }
    return finalArr;
  })();

  let actualGame = 0;
  async.whilst(function(){
    return actualGame < options.NUM_OF_GAMES;
  }, function(callback) {
    game(players, actualGame, options, function(result){

    });
  }, function(err) {
    if (err) { done(err); }
    else {
      done(null, results);
    }
  });
}

function game(players, indexOfFirstPlayer, options, done) {
  let actualPlayer = indexOfFirstPlayer;
  let grid = Grid.createGrid(options.GRID_SIZE[0], options.GRID_SIZE[1]);
  let actualRound = 0;
  let invalidMoveOfPlayer = null;
  let winner = null;
  let tie = false;
  let maxRoundsExceeded = false;

  async.whilst(function(){
    return !invalidMoveOfPlayer && !winner && !tie && !maxRoundsExceeded;
  }, function(callback) {
    players[actualPlayer % players.length](grid, {

    }, function(move) {
      let playerIndex = actualPlayer % players.length;
      grid = Grid.makeMove(grid, move[0], move[1], (playerIndex + 1);
      if (grid) {
        if (Grid.checkWin(grid, playerIndex + 1)) {
          winner = playerIndex;
        }
        if (Grid.isFull(grid)) {
          tie = true;
        }
        if (actualPlayer + 1 > options.MAX_ROUNDS * players.length) {
          maxRoundsExceeded = true;
        }
      } else {
        invalidMoveOfPlayer = actualPlayer % players.length;
      }
      callback();
    })
  }, function(err){
    done(null, {
      invalidMoveOfPlayer: invalidMoveOfPlayer,
      winner: winner,
      tie: tie,
      maxRoundsExceeded: maxRoundsExceeded
    });
  });
}

module.exports = {
  play: play,
  game: game
};
