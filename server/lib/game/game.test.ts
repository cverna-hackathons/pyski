import * as _ from 'underscore';
import * as Assert from 'assert';
import * as Debugger from 'debug';
import { Match } from '../match/Match.entity';
import { Player } from '../player/Player.entity';
import { wait } from '../utils/wait';
import { createNextGame } from '../match/createNextGame';
import { PubSub } from 'graphql-subscriptions';
import { Game } from './Game.entity';
import { User } from '../user/User.entity';

const debug = Debugger('pyski:test:play');

let testMatch: Match;
let player: Player;
let user: User;

before(async function() {
  debug('connecting to db');
  player = await Player.findOneOrFail({
    where: {
      name: 'Dummy',
    },
  });
  const existingUser = await User.findOne({ where: { name: 'test' } });
  if (!existingUser) {
    const newUser = User.create({
      name: 'test',
      email: 'test@test.com'
    });
    await newUser.setEncryptedPassword(`test-${Date.now()}`);
    await newUser.save();
  }
  user = await User.findOneOrFail({ where: { name: 'test' } });

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
  author: user,
});
const createMatch = async () => {
  const match: Match = Match.create(getOptions());

  await match.save();
  return match;
}

const reloadMatch = async () => {
  testMatch = await Match.findOneOrFail({
    where: { id: testMatch.id },
    relations: [
      'games',
      'games.result',
    ],
  });
}

describe('Game', function () {
  describe('#play', function () {
    it('should create a match with one game', async () => {
      testMatch = await createMatch();
      await createNextGame(testMatch.id, pubsub);
      await wait(3000);
      await reloadMatch();
      debug(`tie`, testMatch, testMatch.games);
      Assert.strictEqual(testMatch.isFinished, true);
    });
    it('should end with tie and rounds exceeded', async () => {
      const [ game ] = testMatch.games;
      const gameRecord = await Game.findOneOrFail({
        where: { id: game.id },
        relations: [ 'match', 'moves', 'result' ]
      });
      Assert.strictEqual(testMatch.games.length, 1);
      Assert.strictEqual(gameRecord.isFinished, true);
      Assert.strictEqual(gameRecord.roundsExceeded, true);
      Assert.strictEqual(gameRecord.isTied, true);
      Assert.strictEqual(gameRecord.winner, 0);
    });
    it('should delete test record', async () => {
      await Match.delete(testMatch.id);
      Assert.deepStrictEqual(testMatch.games.length, 1);
    });
  });
});
