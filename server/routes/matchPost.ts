import type { OptionsJson } from 'body-parser';
import type { Request, Response } from 'express';
import * as _ from 'underscore';
import { run } from '../lib/match/run'
import { playerLoader } from '../lib/players/playerLoader'
import { setupInteractiveGame } from '../lib/game/setupInteractiveGame';

const playerOptionNames = ['repo_A', 'repo_B'];

import { CONVERSION, convert } from '../lib/utils/convert'
import { getDefaultMatchOptions, MatchOptions } from '../lib/match';

const translate = (body: OptionsJson): MatchOptions => {
  const options = getDefaultMatchOptions()
  let translations = [
    {
      name: 'grid_width',
      type: CONVERSION.INT,
      trFn: (val: number) => (options.GRID_SIZE[0] = val),
    },
    {
      name: 'grid_height',
      type: CONVERSION.INT,
      trFn: (val: number) => (options.GRID_SIZE[1] = val),
    },
    {
      name: 'max_rounds',
      type: CONVERSION.INT,
      trFn: (val: number) => (options.MAX_ROUNDS = val),
    },
    {
      name: 'winning_length',
      type: CONVERSION.INT,
      trFn: (val: number) => (options.WINNING_LEN = val),
    },
    {
      name: 'num_of_games',
      type: CONVERSION.INT,
      trFn: (val: number) => (options.NUM_OF_GAMES = val),
    },
  ];

  _.each(body, (val: string, key: string) => {
    let translation = _.find(translations, (trans: any) => key === trans.name);

    if (translation) {
      translation.trFn(convert(val, translation.type) as number);
    }
  });

  return options;
};

export const matchPost = async (req: Request, res: Response) => {
  const options = translate(req.body);
  const players = await Promise.all(
    playerOptionNames.map((optionName) => playerLoader(req.body[optionName])),
  );
  const allAlgoPlayers = players.every((player) => {
    console.log(player);
    return !player.isInteractive;
  });
  if (allAlgoPlayers) {
    const results = await run(players, options);
    res.send({
      options,
      results,
    });
  } else {
    const game = await setupInteractiveGame({
      options,
      players,
    });
    res.send({
      game,
      options,
    });
  }
};
