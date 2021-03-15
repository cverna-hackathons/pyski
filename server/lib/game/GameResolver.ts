import { Arg, Query, Resolver, Root, Subscription } from "type-graphql";
import { Game } from "./Game.entity";
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
      relations: [
        'moves',
        'match',
        'match.playerA',
        'match.playerB'
      ],
    });
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
