import * as _ from 'underscore';
import * as Assert from 'assert';
import * as Debugger from 'debug';
import { Match } from '../match/Match.entity';
import { Player } from '../player/Player.entity';
import { wait } from '../utils/wait';
import { createNextGame } from '../match/createNextGame';
import { PubSub } from 'graphql-subscriptions';

const debug = Debugger('pyski:test:play');

let testMatch: Match;
let player: Player;
before(async function() {
  debug('connecting to db');
  player = await Player.findOneOrFail({
    where: {
      name: 'Dummy',
    },
  });
  return true;
});

const pubsub = new PubSub();
const getOptions = () => ({
  numOfGames: 1,
  winningLength: 3,
  timeout: 1000,
  maxRounds: 2,
  gridWidth: 3,
  gridHeight: 3,
  playerA: player,
  playerB: player,
});
const createMatch = async () => {
  const match: Match = Match.create(getOptions());

  await match.save();
  return match;
}

const reloadMatch = async () => {
  testMatch = await Match.findOneOrFail({
    where: { id: testMatch.id },
    relations: [ 'games' ],
  });
}

describe('Game', function () {
  describe('#play', function () {
    it('should create a match with one game', async () => {
      testMatch = await createMatch();
      await createNextGame(testMatch.id, pubsub);
      await wait(2000);
      await reloadMatch();
      debug(`tie`, testMatch);
      Assert.strictEqual(testMatch.isFinished, true);
    });
    it('should end with tie and rounds exceeded', async () => {
      const [ game ] = testMatch.games;
      Assert.strictEqual(testMatch.games.length, 1);
      Assert.strictEqual(game.isFinished, true);
      Assert.strictEqual(game.roundsExceeded, true);
      Assert.strictEqual(game.isTied, true);
      Assert.strictEqual(game.winner, 0);
    });
    it('should delete test record', async () => {
      await Match.delete(testMatch.id);
      Assert.deepStrictEqual(testMatch.games.length, 1);
    });
  });
});
