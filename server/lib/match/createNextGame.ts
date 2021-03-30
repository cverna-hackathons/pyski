import { PubSubEngine } from "graphql-subscriptions";
import { Game } from "../game/Game.entity";
import { Match } from "./Match.entity";
import { promptNextMove } from "../game/promptNextMove";
import { TOPIC } from "../topics";

export async function createNextGame(
  matchId: string,
  pubsub: PubSubEngine,
): Promise<boolean> {
  const match = await Match.findOneOrFail({
    where: { id: matchId },
    relations: [ 'games', 'games.result' ],
  });

  if (match.isFinished) {
    await pubsub.publish(TOPIC.MATCH_FINISHED, matchId);
    return false;
  } else {
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