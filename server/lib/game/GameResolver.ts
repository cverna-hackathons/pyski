import { Arg, Query, Resolver, Root, Subscription } from "type-graphql";
import { Game } from "../database/entities/Game";
import { TOPIC } from "../topics";

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
      relations: [ 'moves', 'match' ],
    });
    // console.log('game', game);
    return game;
  }

  @Subscription({ topics: TOPIC.MOVE_CREATED })
  moveCreated(
    @Root() game: Game
  ): string {
    if (game) {
      console.log('MOVE CREATED', game.id);
      return game.id;
    } else return '';
  }
}
