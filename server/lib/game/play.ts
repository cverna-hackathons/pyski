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
  let currentPlayerIndex = (gameIdx % players.length)
  let currentRound = 0
  let currentMove = 0
  let result: GameResult = {
    finished: false,
    firstMovingPlayerIndex: currentPlayerIndex,
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
    let playerMark = result.playerMarks[currentPlayerIndex]
    const curPlayer = players[currentPlayerIndex]

    if (currentPlayerIndex === 0) currentRound++
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
        player: currentPlayerIndex,
        X: move[0],
        Y: move[1],
      })
      moved = makeMove(grid, move[0], move[1], playerMark)
    } catch (error) {
      console.error('error player moving', error, move)
    }

    if (moved) {
      if (checkWin(grid, playerMark, options.WINNING_LEN)) {
        result.winner = currentPlayerIndex
      }
      if (isFull(grid)) {
        result.tie = true
      }
      if (currentRound > options.MAX_ROUNDS) {
        result.maxRoundsExceeded = true
      }
    } else {
      result.invalidMoveOfPlayer = currentPlayerIndex
    }
    currentPlayerIndex = ((currentPlayerIndex + 1) % players.length)
  }

  return result
}