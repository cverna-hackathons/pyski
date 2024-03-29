import * as Assert from 'assert';
import * as Debugger from 'debug';
import { Match } from './Match.entity';
import { Player } from '../player/Player.entity';
import { PubSub } from 'graphql-subscriptions';
import { createNextGame } from './createNextGame';
import { wait } from '../utils/wait';
import { User } from '../user/User.entity';

const debug = Debugger('pyski:test:match');

let testMatch: Match;
let player: Player;
let user: User;

before(async function() {
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

describe('Match', () => {
  it(`Should create a match`, async () => {
    testMatch = Match.create({
      numOfGames: 2,
      winningLength: 3,
      timeout: 1000,
      maxRounds: 10,
      gridWidth: 3,
      gridHeight: 3,
      playerA: player,
      playerB: player,
      author: user,
    });

    await testMatch.save();
    debug('testMatch', testMatch);
    Assert.strictEqual(parseInt(testMatch.id) > 0, true)
  });
  it(`Should create games and run them`, async () => {
    const created = await createNextGame(testMatch.id, pubsub);
    await wait(3000);
    const updatedMatch = await Match.findOne({
      where: { id: testMatch.id },
      relations: [ 'games', 'games.result' ],
    });
    debug('run', { created }, updatedMatch);
    Assert.strictEqual(created, true);
    Assert.strictEqual(updatedMatch?.isFinished, true);
  })
  it(`Should remove a match`, async () => {
    await Match.delete(testMatch.id);
    const found = await Match.findOne(testMatch.id);
    debug('remove', found);
    Assert.strictEqual(found, undefined);
  });
});
