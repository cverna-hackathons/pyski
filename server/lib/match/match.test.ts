import * as _ from 'underscore';
import * as Assert from 'assert';
import * as Debugger from 'debug';
import { run } from './run';

const debug = Debugger('pyski:test:play');
const player = {
  name: 'dummy',
  isInteractive: false,
  play: require('../players/dummy'),
};

describe('Match', function () {
  let options = _.defaults(
    {},
    {
      GRID_SIZE: [30, 50],
      NUM_OF_GAMES: 5,
      WINNING_LEN: 5,
      TIMEOUT: 5000,
      MAX_ROUNDS: 750,
    },
  );

  describe('#run', function () {
    options.GRID_SIZE = [5, 5];
    options.NUM_OF_GAMES = 4;

    it('should be tied with 2 wins for both players', async () => {
      const result = await run([player, player], options);
      debug('result', result);
      Assert.strictEqual(result.playersResults[0], 2);
      Assert.strictEqual(result.playersResults[1], 2);
    });

    it('all games should be tied when grid is small', async () => {
      options.GRID_SIZE = [3, 3];
      const result = await run([player, player], options);
      Assert.strictEqual(result.ties, 4);
    });
  });
});
