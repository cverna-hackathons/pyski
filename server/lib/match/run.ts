import { GameOptions, getDefaultGameOptions } from "../game/options"
import { Player } from "../players"
import { MatchResults } from "."
import * as _ from 'underscore'
import { GameResult } from "../game"
import { play } from "../game/play"

export async function run(
  players: Player[],
  options: GameOptions
): Promise<MatchResults> {
  options = _.defaults(options, getDefaultGameOptions())

  const numOfPlayers = players.length
  const matchResults: MatchResults = {
    playersResults: Array(numOfPlayers).fill(0),
    playersFaults: Array(numOfPlayers).fill(0),
    ties: 0,
    maximumRoundsExceeds: 0,
    resultSets: [],
  }

  let gameIdx = 0
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

  return matchResults
}
