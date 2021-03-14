import { PubSubEngine } from 'graphql-subscriptions';
import { GamePlayer, GameResult } from '.';
import { Game } from '../database/entities/Game';
import { Match } from '../database/entities/Match';
import { Move } from '../database/entities/Move';
import { Player } from '../database/entities/Player';
import { createGrid, copy, isFull, makeMove } from '../grid/grid';
import { createNextGame } from '../match/createNextGame';
import { playerLoader } from '../players/playerLoader';
import { TOPIC } from '../topics';
import { checkWin } from './checkWin';
import { GameOptions } from './options';

export async function promptNextMove(
  gameId: string,
  pubsub: PubSubEngine,
): Promise<boolean> {
  const loadGame = async () => Game.findOneOrFail({
    where: {
      id: gameId,
    },
    relations: [ 'match', 'moves' ],
  })
  let game = await loadGame();
  const match = await Match.findOneOrFail({
    where: { id: game.match.id },
    relations: [ 'playerA', 'playerB' ],
  })
  let playNextMove = true;
  let matchContinues = false;

  while (playNextMove) {
    const player = (
      game.nextPlayerIndex === 0
        ? match.playerA
        : match.playerB
    );
    const moved = await makePlayerMove(player, gameId);
    game = await loadGame();
    playNextMove = (moved && !game.isFinished);
    if (moved) {
      await pubsub.publish(TOPIC.MOVE_CREATED, game);
    }
  }

  if (game.isFinished) {
    await pubsub.publish(TOPIC.GAME_FINISHED, match.id);
    matchContinues = await createNextGame(match.id, pubsub);
  }

  return matchContinues;
}

export async function makePlayerMove(
  player: Player,
  gameId: string,
): Promise<boolean> {
  const game = await Game.findOneOrFail({
    where: { id: gameId },
    relations: [ 'moves', 'match' ],
  });
  const gamePlayer = await playerLoader(player.path);
  if (!gamePlayer.isInteractive) {
    const {
      maxRounds,
      winningLength,
    } = game.match
    const playerValue = game.nextPlayerValue;
    const opponentValue = game.nextOpponentValue;
    const originalGrid = copy(game.grid);
    try {
      const [ x, y ] = await gamePlayer.play(
        originalGrid, {
          mark: playerValue,
          winningLength: winningLength,
          currentRound: game.currentRound,
          currentMove: (game.moves.length + 1),
        },
      );
      console.info(`Player ${playerValue} move:`, [ x, y ]);
      const grid = makeMove(originalGrid, x, y, playerValue);
      const playerWon = checkWin(grid, playerValue, winningLength);
      const move = Move.create({
        x,
        y,
        game,
        player,
        moveIndex: game.moves.length,
      });
      game.moves.push(move);
      await move.save();
      if (playerWon) {
        game.winner = playerValue;
      } else if (isFull(grid) || game.currentRound >= maxRounds) {
        game.winner = 0;
      }
    } catch (error) {
      console.error('Caught move error!', error);
      game.faultOfPlayer = playerValue;
      game.winner = opponentValue;
    }
    await game.save();
    return true;
  }
  return false;
}

export async function play(
  players: GamePlayer[],
  gameIdx: number,
  options: GameOptions
): Promise<GameResult> {
  let grid = createGrid(options.GRID_SIZE[0], options.GRID_SIZE[1])
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
      });
      grid = makeMove(grid, move[0], move[1], playerMark);
      if (checkWin(grid, playerMark, options.WINNING_LEN)) {
        result.winner = currentPlayerIndex
      }
      if (isFull(grid)) {
        result.tie = true
      }
      if (currentRound > options.MAX_ROUNDS) {
        result.maxRoundsExceeded = true
      }
    } catch (error) {
      console.error(`error when player${currentPlayerIndex} moving`, error)
      result.invalidMoveOfPlayer = currentPlayerIndex
    }
    currentPlayerIndex = ((currentPlayerIndex + 1) % players.length)
  }

  result.lastGrid = grid
  return result
}
