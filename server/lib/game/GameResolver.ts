import { Arg, Field, InputType, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";
import { Game } from "./Game.entity";
import { TOPIC } from "../topics";
import { PLAYER_TYPES } from "../player/playerLoader";
import { promptNextMove } from "./promptNextMove";
import { makePlayerMove } from "../player/makePlayerMove";

@InputType()
export class GameMoveInput {
  @Field()
  gameId!: string;
  @Field()
  x!: number;
  @Field()
  y!: number;
}

@Resolver()
export class GameResolver {
  @Query(() => [ Game ])
  games() {
    return Game.find()
  }

  @Query(() => Game)
  async game(@Arg("id") id: string) {
    const game = await Game.findOne({
      where: { id },
      relations: [
        'moves',
        'match',
        'match.playerA',
        'match.playerB',
        'result'
      ],
    });
    return game;
  }
  @Mutation(() => Boolean)
  async makeInteractiveMove(
    @Arg('input') input: GameMoveInput,
    @PubSub() pubsub: PubSubEngine,
  ): Promise<boolean> {
    const game = await Game.findOneOrFail({
      where: { id: input.gameId },
      relations: [
        'match',
        'moves',
        'match.playerA',
        'match.playerB',
        'result'
      ],
    });
    const {
      nextPlayer,
    } = game;

    if (nextPlayer.type !== PLAYER_TYPES.INTERACTIVE) {
      throw new Error('Invalid player move!');
    }

    nextPlayer.assignNextInteractiveMove(input.x, input.y);
    const moved = await makePlayerMove(nextPlayer, input.gameId);

    if (moved) {
      await pubsub.publish(TOPIC.MOVE_CREATED, game);
      setTimeout(() => promptNextMove(input.gameId, pubsub), 2000);
    }
    return moved;
  }

  @Subscription({ topics: TOPIC.MOVE_CREATED })
  moveCreated(
    @Root() game: Game
  ): string {
    if (game) {
      return game.id;
    } else return '';
  }
}
