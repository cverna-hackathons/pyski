import { GameOptions, getDefaultGameOptions } from "../game/options"
import { Player } from "../players/Player"
import { PlayResults } from "."
import * as _ from 'underscore'
import { GameResult } from "../game"
import { play } from "../game/play"

export async function run(
  players: Player[],
  options: GameOptions
): Promise<PlayResults> {
  options = _.defaults(options, getDefaultGameOptions())

  const numOfPlayers = players.length
  const playResults: PlayResults = {
    playersResults: Array(numOfPlayers).fill(0),
    playersFaults: Array(numOfPlayers).fill(0),
    ties: 0,
    maximumRoundsExceeds: 0,
    resultSets: [],
  }

  let actualGame = 0
  while (actualGame < options.NUM_OF_GAMES) {
    const result: GameResult = await play(players, actualGame, options)
    if (result.invalidMoveOfPlayer !== null) {
      playResults.playersFaults[result.invalidMoveOfPlayer]++
    }
    if (result.winner !== null) {
      playResults.playersResults[result.winner]++
    }
    if (result.tie) {
      playResults.ties++
    }
    if (result.maxRoundsExceeded) {
      playResults.maximumRoundsExceeds++
    }

    actualGame++
    playResults.resultSets.push(result)
  }

  return playResults
}
