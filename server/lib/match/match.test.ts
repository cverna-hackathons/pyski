import { connect } from '../database';
import * as Assert from 'assert';
import * as Debugger from 'debug';
import { Match } from '../database/entities/Match';
import { Player } from '../database/entities/Player';

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
  it(`Should remove a match`, async () => {
    await Match.delete(testMatch.id);
    const found = await Match.findOne(testMatch.id);
    debug('remove', found);
    Assert.strictEqual(found, undefined);
  });
});
