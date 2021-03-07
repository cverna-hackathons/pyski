import { Event } from 'ts-typed-events';
import { GameOptions, GameState, Move } from '.';
import { createGrid, isFull, makeMove } from '../grid/grid';
import { MatchState } from '../match';
import { MatchStorage } from '../match/storage';
import { checkWin } from './checkWin';
import { GameStorage } from './storage';

export interface MoveEventData {
  game: GameState;
  move: Move;
}
export const MoveEvent = new Event<MoveEventData>();
export const GameEndEvent = new Event<GameState>();
export const GameStartEvent = new Event<GameOptions>();
export const GameProgressEvent = new Event<GameState>();
export const MatchEndEvent = new Event<MatchState>();

GameEndEvent.on(async game => {
  const match = await MatchStorage.get(game.matchId)

  match.result.gameResults.push(game.result)
  if (match.result.gameResults.length === match.options.NUM_OF_GAMES) {
    MatchEndEvent.emit(match)
  } else {
    const gameIndex = (game.gameIndex + 1)
    const playerIndex = (gameIndex % game.players.length)
    const newGameState: GameState = {
      ...game,
      gameIndex: (game.gameIndex + 1),
      playerIndex,
      result: {
        finished: false,
        firstMovingPlayerIndex: playerIndex,
        invalidMoveOfPlayer: null,
        lastGrid: createGrid(
          game.options.GRID_SIZE[0],
          game.options.GRID_SIZE[1]
        ),
        maxRoundsExceeded: false,
        moveStack: [],
        playerMarks: Array(game.players.length).fill(1).map(
          (v, idx) => v + idx
        ),
        tie: false,
        winner: null,
      },
    }

    await GameStorage.add(newGameState)
  }
})

MoveEvent.on(({ move, game }) => {
  try {
    const grid = game.result.lastGrid = makeMove(
      game.result.lastGrid,
      move.X,
      move.Y,
      move.player
    )
    game.result.moveStack.push(move)
    if (checkWin(grid, move.player, game.options.WINNING_LEN)) {
      game.result.winner = game.playerIndex
    } else if (isFull(grid)) {
      game.result.tie = true
    }
    if (
      (
        game.result.moveStack.length / game.players.length
      ) > game.options.MAX_ROUNDS
    ) {
      game.result.maxRoundsExceeded = true
    }
  } catch (error) {
    game.result.invalidMoveOfPlayer = game.playerIndex
  }
  game.playerIndex = (game.playerIndex + 1) % game.players.length
  game.result.finished = !(
    game.result.invalidMoveOfPlayer === null &&
    game.result.winner === null &&
    !game.result.tie &&
    !game.result.maxRoundsExceeded
  )

  if (game.result.finished) {
    GameEndEvent.emit(game)
  } else {
    GameProgressEvent.emit(game)
  }
})