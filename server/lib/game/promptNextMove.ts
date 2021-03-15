import { PubSubEngine } from 'graphql-subscriptions';
import { Game } from './Game.entity';
import { Match } from '../match/Match.entity';
import { createNextGame } from '../match/createNextGame';
import { TOPIC } from '../topics';
import { makePlayerMove } from '../player/makePlayerMove';

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
