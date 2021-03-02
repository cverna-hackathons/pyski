import { GamePlayer, GameResult } from '.';
import { createGrid, isFull, makeMove } from '../grid/grid';
import { checkWin } from './checkWin';
import { GameOptions } from './options';

export async function play(
  players: GamePlayer[],
  indexOfFirstPlayer: number,
  options: GameOptions,
): Promise<GameResult> {
  let grid = createGrid(options.GRID_SIZE[0], options.GRID_SIZE[1]);
  let actualPlayer = indexOfFirstPlayer;
  let currentRound = 0;
  let currentMove = 0;
  let finished = false;
  let invalidMoveOfPlayer: number | null = null;
  let maxRoundsExceeded = false;
  let tie = false;
  let winner: number | null = null;
  const moveStack = [];
  const playerMarks = [
    (indexOfFirstPlayer % players.length) + 1,
    ((indexOfFirstPlayer + 1) % players.length) + 1,
  ];

  const shouldProceed = () => {
    finished = !(
      invalidMoveOfPlayer === null &&
      winner === null &&
      !tie &&
      !maxRoundsExceeded
    );

    return !finished;
  };
  while (shouldProceed()) {
    let playerIndex = actualPlayer % players.length;
    let playerMark = playerIndex + 1;
    const curPlayer = players[playerIndex];

    if (playerIndex === 0) currentRound++;
    currentMove++;
    let move;

    try {
      move = await curPlayer.play(grid, {
        mark: playerMark,
        winningLength: options.WINNING_LEN,
        currentRound,
        currentMove,
      });
      moveStack.push({
        player: playerIndex,
        X: move[0],
        Y: move[1],
      });
      grid = makeMove(grid, move[0], move[1], playerMark);
      if (checkWin(grid, playerMark, options.WINNING_LEN)) {
        winner = playerIndex;
      }
      if (isFull(grid)) {
        tie = true;
      }
      if (actualPlayer + 1 > options.MAX_ROUNDS * players.length) {
        maxRoundsExceeded = true;
      }
    } catch (error) {
      invalidMoveOfPlayer = actualPlayer % players.length;
      console.error('error player moving', error, move);
    }
    actualPlayer++;
  }

  return {
    finished,
    invalidMoveOfPlayer,
    maxRoundsExceeded,
    moveStack,
    lastGrid: grid,
    playerMarks,
    tie,
    winner,
  };
}
