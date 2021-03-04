import {
  getDefaultMatchOptions,
  MatchOptions,
  MatchResults
} from "."
import * as _ from 'underscore'
import { GamePlayer, GameResult } from "../game"
import { play } from "../game/play"
import { arbiter, MATCH_END, MATCH_START } from "../game/arbiter"

export async function run(
  players: GamePlayer[],
  options: MatchOptions
): Promise<MatchResults> {
  options = _.defaults(options, getDefaultMatchOptions())

  const numOfPlayers = players.length
  const matchResults: MatchResults = {
    playersResults: Array(numOfPlayers).fill(0),
    playersFaults: Array(numOfPlayers).fill(0),
    ties: 0,
    maximumRoundsExceeds: 0,
    resultSets: [],
  }

  let gameIdx = 0
  arbiter.emit(MATCH_START, options)
  while (gameIdx < options.NUM_OF_GAMES) {
    const result: GameResult = await play(players, gameIdx, options)
    if (result.invalidMoveOfPlayer !== null) {
      matchResults.playersFaults[result.invalidMoveOfPlayer]++
    }
    if (result.winner !== null) {
      matchResults.playersResults[result.winner]++
    }
    if (result.tie) {
      matchResults.ties++
    }
    if (result.maxRoundsExceeded) {
      matchResults.maximumRoundsExceeds++
    }
    gameIdx++
    matchResults.resultSets.push(result)
  }
  arbiter.emit(MATCH_END, matchResults)
  return matchResults
}
