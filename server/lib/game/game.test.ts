import * as _ from 'underscore';
import * as Assert from 'assert';
import * as Debugger from 'debug';
import { play } from './play';

const debug = Debugger('pyski:test:play');
const player = {
  name: 'dummy',
  isInteractive: false,
  play: require('../players/dummy'),
};

describe('Game', function () {
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

  describe('#play', function () {
    it('should end with tie', async () => {
      options.GRID_SIZE = [3, 3]
      const result = await play([player, player], 0, options)
      debug(`tie`, result)
      Assert.strictEqual(result.tie, true)
      Assert.deepStrictEqual(result.playerMarks, [1, 2])
    })

    it('should end with max rounds exceed', async () => {
      options.MAX_ROUNDS = 4;
      const result = await play([player, player], 0, options);
      Assert.strictEqual(result.maxRoundsExceeded, true);
    });

    it('should end with win of first player in 5x5 grid', async () => {
      options.GRID_SIZE = [5, 5];
      options.MAX_ROUNDS = 25;
      const result = await play([player, player], 0, options);
      Assert.strictEqual(result.winner, 0);
    });

    it('should end with win of seconds player in 5x5 grid and second player starts', async () => {
      options.GRID_SIZE = [5, 5];
      options.MAX_ROUNDS = 25;

      const result = await play([player, player], 1, options);
      Assert.strictEqual(result.winner, 1);
    });
  });
});
