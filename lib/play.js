'use strict';

let Grid = require('./grid');
let async = require('async');
let _ = require('underscore');
let GameLogger = require('./game-logger');

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

  options = _.defaults(options, defaultGridOptions());

  let numOfPlayers = players.length
  let playResults = _.defaults({}, {
    playersResults: createCountArrayForPlayers(),
    playersFaults: createCountArrayForPlayers(),
    ties: 0,
    maximumRoundsExceeds: 0
  });

  function createCountArrayForPlayers() {
    let finalArr = [];
    for (let i=0, len=numOfPlayers; i<len; i++) {
      finalArr.push(0);
    }
    return finalArr;
  }

  let actualGame = 0;
  async.whilst(function() {
    return actualGame < options.NUM_OF_GAMES;
  }, function(next) {
    game(players, actualGame, options, function(err, result) {
      if (result.invalidMoveOfPlayer !== null) {
        playResults.playersFaults[result.invalidMoveOfPlayer]++;
      }
      if (result.winner !== null) {
        playResults.playersResults[result.winner]++;
      }
      if (result.tie) {
        playResults.ties++;
      }
      if (result.maximumRoundsExceeds) {
        playResults.maximumRoundsExceeds++;
      }

      actualGame++;

      return next();
    });
  }, function(err) {
    if (err) return done(err);
    else return done(null, playResults);
  });
}

function defaultGridOptions() {
  return {
    GRID_SIZE: [10,20],
    NUM_OF_GAMES: 5,
    WINNING_LEN: 5,
    TIMEOUT: 5000,
    MAX_ROUNDS: 750
  };
}

function game(players, indexOfFirstPlayer, options, done) {
  let actualPlayer = indexOfFirstPlayer;
  let grid = Grid.createGrid(options.GRID_SIZE[0], options.GRID_SIZE[1]);
  let actualRound = 0;
  let invalidMoveOfPlayer = null;
  let winner = null;
  let tie = false;
  let maxRoundsExceeded = false;
  let moveStack = [];
  let finished = false;
  let lastGrid

  async.whilst(function(){
    let isMovingOn = (
      invalidMoveOfPlayer === null && 
      winner === null && !tie && !maxRoundsExceeded
    );

    finished = !isMovingOn;
    
    return isMovingOn;
  }, function(callback) {
    players[actualPlayer % players.length](grid, {
      mark: actualPlayer % players.length
    }, function(move) {

      let playerIndex = actualPlayer % players.length;

      moveStack.push({
        player: playerIndex,
        X: move[0],
        Y: move[1]
      });
      grid = Grid.makeMove(grid, move[0], move[1], playerIndex + 1);
      if (grid) {
        lastGrid = grid
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
      actualPlayer++;
      if (!finished) {
        callback(null);
      }
    });
  }, function(err){
    let result = { 
      invalidMoveOfPlayer, winner, tie, maxRoundsExceeded, moveStack, lastGrid
    };

    GameLogger(result, false);
    return done(null, result);
  });
}

module.exports = { play, game, defaultGridOptions };
