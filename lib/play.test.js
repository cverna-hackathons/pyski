'use strict';

let assert = require('chai').assert;
let Play = require('./play');
let player = require('./players');
let _ = require('underscore');

describe('Play', function(){

  let options = _.defaults({}, {
    GRID_SIZE: [30,50],
    NUM_OF_GAMES: 5,
    WINNING_LEN: 5,
    TIMEOUT: 5000,
    MAX_ROUNDS: 750
  });

  describe('#game', function(){
    it('should end with tie', function(done){
      options.GRID_SIZE = [3,3];
      Play.game([player, player], 0, options, function(err, result) {
        assert.equal(result.tie, true);
        done(null);
      });
    });

    it('should end with max rounds exceed', function(done) {
      options.MAX_ROUNDS = 4;
      Play.game([player, player], 0, options, function(err, result) {
        assert.equal(result.maxRoundsExceeded, true);
        done(null);
      });
    });

    it('should end with win of first player in 5x5 grid', function(done) {
      options.GRID_SIZE = [5,5];
      options.MAX_ROUNDS = 25;
      Play.game([player, player], 0, options, function(err, result) {
        assert.equal(result.winner, 0);
        done(null);
      });
    });

    it('should end with win of seconds player in 5x5 grid and second player starts', function(done) {
      options.GRID_SIZE = [5,5];
      options.MAX_ROUNDS = 25;

      Play.game([player, player], 1, options, function(err, result) {
        assert.equal(result.winner, 1);
        done(null);
      });
    });
  });

  describe('#play', function(){
    options.GRID_SIZE = [5, 5];
    options.NUM_OF_GAMES = 4;

    it ('should be tied with 2 wins for both players', function(done) {
      Play.play([player, player], options, function(err, result) {
        assert.equal(result.playersResults[0], 2);
        assert.equal(result.playersResults[1], 2);
        done(err);
      });
    });

    it ('all games should be tied when grid is small', function(done) {
      options.GRID_SIZE = [3, 3];
      Play.play([player, player], options, function(err, result) {
        assert.equal(result.ties, 4);
        done(err);
      });
    });
  });
});
