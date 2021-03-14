import { PubSubEngine } from "graphql-subscriptions";
import { Game } from "../database/entities/Game";
import { Match } from "../database/entities/Match";
import { promptNextMove } from "../game/play";
import { TOPIC } from "../topics";

export async function createNextGame(
  matchId: string,
  pubsub: PubSubEngine,
): Promise<boolean> {
  const match = await Match.findOneOrFail({
    where: { id: matchId },
    relations: [ 'games' ],
  })

  if (match.isFinished) {
    console.log('createNextGame match has finished');
    await pubsub.publish(TOPIC.MATCH_FINISHED, matchId);
    return false;
  } else {
    console.log('createNextGame match not finished', match);
    const game = Game.create({
      gameIndex: match.games.length,
      match,
    });
    await game.save();
    // Let's not wait for this....
    promptNextMove(game.id, pubsub);

    return true;
  }
}