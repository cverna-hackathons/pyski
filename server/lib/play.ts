import { checkWin } from "./checkWin"
import { GameOptions, getDefaultGameOptions } from "./gameOptions"
import { createGrid, Grid, isFull, makeMove } from "./grid"
import { logGame } from "./logGame"
import { PlayResults, PlayResultSet } from "./playResults"

const _ = require('underscore')

export async function play(
  players: Function[],
  options: GameOptions
): Promise<PlayResults> {
  options = _.defaults(options, getDefaultGameOptions())

  const numOfPlayers = players.length
  const playResults: PlayResults = {
    playersResults: createCountArrayForPlayers(),
    playersFaults: createCountArrayForPlayers(),
    ties: 0,
    maximumRoundsExceeds: 0,
    resultSets: [],
  }

  function createCountArrayForPlayers() {
    let finalArr = []
    for (let i = 0, len = numOfPlayers; i < len; i++) {
      finalArr.push(0)
    }
    return finalArr
  }

  let actualGame = 0
  while (actualGame < options.NUM_OF_GAMES) {
    const result: PlayResultSet = await game(players, actualGame, options)
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

export async function game(
  players: Function[],
  indexOfFirstPlayer: number,
  options: GameOptions
): Promise<PlayResultSet> {
  const grid: Grid = createGrid(options.GRID_SIZE[0], options.GRID_SIZE[1])
  let actualPlayer = indexOfFirstPlayer
  let currentRound = 0
  let currentMove = 0
  let result: PlayResultSet = {
    finished: false,
    invalidMoveOfPlayer: null,
    lastGrid: grid,
    maxRoundsExceeded: false,
    moveStack: [],
    playerMarks: [
      (indexOfFirstPlayer % players.length) + 1,
      ((indexOfFirstPlayer + 1) % players.length) + 1,
    ],
    tie: false,
    winner: null,
  }

  const shouldProceed = () => {
    result.finished = !(
      result.invalidMoveOfPlayer === null &&
      result.winner === null &&
      !result.tie &&
      !result.maxRoundsExceeded
    )

    return !result.finished
  }
  while (shouldProceed()) {
    let playerIndex = actualPlayer % players.length
    let playerMark = playerIndex + 1
    const curPlayer = players[playerIndex]

    if (playerIndex === 0) currentRound++
    currentMove++
    let moved

    try {
      const move = await curPlayer(grid, {
        mark: playerMark,
        winningLength: options.WINNING_LEN,
        currentRound,
        currentMove,
      })
      result.moveStack.push({
        player: playerIndex,
        X: move[0],
        Y: move[1],
      })
      moved = makeMove(grid, move[0], move[1], playerMark)
    } catch (error) {
      console.error('error player moving', error)
    }

    if (moved) {
      if (checkWin(grid, playerMark, options.WINNING_LEN)) {
        result.winner = playerIndex
      }
      if (isFull(grid)) {
        result.tie = true
      }
      if (actualPlayer + 1 > options.MAX_ROUNDS * players.length) {
        result.maxRoundsExceeded = true
      }
    } else {
      result.invalidMoveOfPlayer = actualPlayer % players.length
    }
    actualPlayer++
  }

  logGame(result, false)

  return result
}