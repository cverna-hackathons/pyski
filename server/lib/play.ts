const Grid = require('./grid')
const _ = require('underscore')
const GameLogger = require('./gameLogger')

interface GridOptions {
  GRID_SIZE: [number, number];
  NUM_OF_GAMES: number;
  WINNING_LEN: number;
  TIMEOUT: number;
  MAX_ROUNDS: number;
}

export function defaultGridOptions(): GridOptions {
  return {
    GRID_SIZE: [20, 20],
    NUM_OF_GAMES: 5,
    WINNING_LEN: 5,
    TIMEOUT: 5000,
    MAX_ROUNDS: 750,
  }
}

export async function play(players: Function[], options: GridOptions) {
  options = _.defaults(options, defaultGridOptions())

  let numOfPlayers = players.length
  let playResults = {
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
    const result = await game(players, actualGame, options)
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

export async function game(players: Function[], indexOfFirstPlayer: number, options: GridOptions) {
  let actualPlayer = indexOfFirstPlayer
  let grid = Grid.createGrid(options.GRID_SIZE[0], options.GRID_SIZE[1])
  let currentRound = 0
  let currentMove = 0
  let invalidMoveOfPlayer = null
  let winner = null
  let tie = false
  let maxRoundsExceeded = false
  let moveStack = []
  let finished = false
  let lastGrid

  const shouldProceed = () => {
    let isMovingOn = (
      invalidMoveOfPlayer === null &&
      winner === null &&
      !tie &&
      !maxRoundsExceeded
    )

    finished = !isMovingOn
    return isMovingOn
  }
  while (shouldProceed()) {
    let playerIndex = actualPlayer % players.length
    let playerMark = playerIndex + 1
    const curPlayer = players[playerIndex]

    if (playerIndex === 0) currentRound++
    currentMove++
    const move = await curPlayer(grid, {
      mark: playerMark,
      winningLength: options.WINNING_LEN,
      currentRound,
      currentMove,
    })
    moveStack.push({
      player: playerIndex,
      X: move[0],
      Y: move[1],
    })
    grid = Grid.makeMove(grid, move[0], move[1], playerMark)
    if (grid) {
      lastGrid = grid
      if (Grid.checkWin(grid, playerMark, options.WINNING_LEN)) {
        winner = playerIndex
      }
      if (Grid.isFull(grid)) {
        tie = true
      }
      if (actualPlayer + 1 > options.MAX_ROUNDS * players.length) {
        maxRoundsExceeded = true
      }
    } else {
      invalidMoveOfPlayer = actualPlayer % players.length
    }
    actualPlayer++
  }

  let playerMarks = [
    (indexOfFirstPlayer % players.length) + 1,
    ((indexOfFirstPlayer + 1) % players.length) + 1,
  ]
  let result = {
    invalidMoveOfPlayer,
    winner,
    tie,
    maxRoundsExceeded,
    moveStack,
    lastGrid,
    playerMarks,
  }

  GameLogger(result, false)

  return result
}