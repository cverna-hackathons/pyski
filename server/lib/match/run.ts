import {
  getDefaultMatchOptions,
  MatchOptions,
  MatchResult
} from "."
import * as _ from 'underscore'
import { GamePlayer, GameResult } from "../game"
import { play } from "../game/play"
import { arbiter, MATCH_END, MATCH_START } from "../game/arbiter"

export async function run(
  players: GamePlayer[],
  options: MatchOptions
): Promise<MatchResult> {
  options = _.defaults(options, getDefaultMatchOptions())

  const numOfPlayers = players.length;
  const matchResult: MatchResult = {
    playersResults: Array(numOfPlayers).fill(0),
    playersFaults: Array(numOfPlayers).fill(0),
    ties: 0,
    maximumRoundsExceeds: 0,
    gameResults: [],
  };

  let gameIdx = 0
  arbiter.emit(MATCH_START, options)
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
  arbiter.emit(MATCH_END, matchResult)
  return matchResult
}
