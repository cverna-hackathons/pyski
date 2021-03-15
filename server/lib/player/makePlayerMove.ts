import { Game } from '../game/Game.entity';
import { Move } from '../game/Move.entity';
import { Player } from './Player.entity';
import { copy, isFull, makeMove } from '../grid/grid';
import { playerLoader } from './playerLoader';
import { checkWin } from '../game/checkWin';

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
