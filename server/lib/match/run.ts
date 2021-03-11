import { GameOptions, getDefaultGameOptions } from '../game/options';
import { MatchResult } from '.';
import * as _ from 'underscore';
import { GamePlayer, GameResult } from '../game';
import { play } from '../game/play';

export async function run(
  players: GamePlayer[],
  options: GameOptions,
): Promise<MatchResult> {
  options = _.defaults(options, getDefaultGameOptions());

  const numOfPlayers = players.length;
  const matchResult: MatchResult = {
    playersResults: Array(numOfPlayers).fill(0),
    playersFaults: Array(numOfPlayers).fill(0),
    ties: 0,
    maximumRoundsExceeds: 0,
    gameResults: [],
  };

  let gameIdx = 0
  while (gameIdx < options.NUM_OF_GAMES) {
    const result: GameResult = await play(players, gameIdx, options)
    if (result.invalidMoveOfPlayer !== null) {
      matchResult.playersFaults[result.invalidMoveOfPlayer]++;
    }
    if (result.winner !== null) {
      matchResult.playersResults[result.winner]++;
    }
    if (result.tie) {
      matchResult.ties++;
    }
    if (result.maxRoundsExceeded) {
      matchResult.maximumRoundsExceeds++;
    }

    gameIdx++
    matchResult.gameResults.push(result)
  }

  return matchResult;
}
