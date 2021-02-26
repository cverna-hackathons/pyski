import { GameResult } from "."
import { createGrid, isFull, makeMove } from "../grid/grid"
import { Player } from "../players"
import { checkWin } from "./checkWin"
import { GameOptions } from "./options"

export async function play(
  players: Player[],
  gameIdx: number,
  options: GameOptions
): Promise<GameResult> {
  const grid = createGrid(options.GRID_SIZE[0], options.GRID_SIZE[1])
  let actualPlayer = (gameIdx % players.length)
  let currentRound = 0
  let currentMove = 0
  let result: GameResult = {
    finished: false,
    invalidMoveOfPlayer: null,
    lastGrid: grid,
    maxRoundsExceeded: false,
    moveStack: [],
    playerMarks: Array(players.length).fill(1).map((v, idx) => v + idx),
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
    let move

    try {
      move = await curPlayer.play(grid, {
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
      console.error('error player moving', error, move)
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
      result.invalidMoveOfPlayer = playerIndex
    }
    actualPlayer++
  }

  return result
}