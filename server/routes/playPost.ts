import type { OptionsJson } from 'body-parser'
import type { Request, Response } from 'express'
import * as _ from 'underscore';
import { GameOptions, getDefaultGameOptions } from '../lib/gameOptions'
import { play } from '../lib/play'
import { playerLoader } from '../lib/playerLoader'

const playerOptionNames = ['repo_A', 'repo_B']

import { CONVERSION, convert } from '../lib/utils/convert'

const translate = (body: OptionsJson): GameOptions => {
  const options = getDefaultGameOptions()
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
  ]

  _.each(body, (val: string, key: string) => {
    let translation = _.find(translations, (trans: any) => key === trans.name)

    if (translation) {
      translation.trFn(convert(val, translation.type) as number)
    }
  })

  return options
}

export const playPost = async (req: Request, res: Response) => {
  const options = translate(req.body)
  const players = await Promise.all(
    playerOptionNames.map(
      optionName => playerLoader(req.body[optionName])
    )
  )
  const results = await play(players, options)

  res.render('play/status', {
    options,
    results
  })
}
