import { PubSubEngine } from 'graphql-subscriptions';
import { Game } from '../database/entities/Game';
import { Match } from '../database/entities/Match';
import { Move } from '../database/entities/Move';
import { Player } from '../database/entities/Player';
import { copy, isFull, makeMove } from '../grid/grid';
import { createNextGame } from '../match/createNextGame';
import { playerLoader } from '../players/playerLoader';
import { TOPIC } from '../topics';
import { checkWin } from './checkWin';

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
