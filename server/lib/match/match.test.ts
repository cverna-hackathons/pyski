import { connect } from '../database';
import * as Assert from 'assert';
import * as Debugger from 'debug';
import { Match } from './Match.entity';
import { Player } from '../players/Player.entity';
import { PubSub } from 'graphql-subscriptions';
import { createNextGame } from './createNextGame';
import { wait } from '../utils/wait';

const debug = Debugger('pyski:test:match');

let testMatch: Match;
let player: Player;

before(async function() {
  debug('connecting to db');
  await connect();
  player = await Player.findOneOrFail({
    where: {
      name: 'Dummy',
    },
  });
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
    });

    await testMatch.save();
    debug('testMatch', testMatch);
    Assert.strictEqual(parseInt(testMatch.id) > 0, true)
  });
  it(`Should create games and run them`, async () => {
    const created = await createNextGame(testMatch.id, pubsub);
    await wait(2000);
    const updatedMatch = await Match.findOne({
      where: { id: testMatch.id },
      relations: [ 'games' ],
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
