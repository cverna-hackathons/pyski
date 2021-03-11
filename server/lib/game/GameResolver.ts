import { Query, Resolver, Root, Subscription } from "type-graphql";
import { Game } from "../database/entities/Game";
import { Match } from "../database/entities/Match";

@Resolver()
export class GameResolver {
  @Query(() => [ Game ])
  games() {
    return Game.find()
  }

  @Subscription({ topics: 'MATCH_CREATED' })
  matchCreated(
    @Root() match: Match
  ): boolean {
    console.log('MATCH CREATED !********* match, args', { match });
    // let's set a game up!
    // const game = getRepository(Game).create({
    //   gameIndex: 0,
    //   playerIndex: 0,
    //   match,
    // })
    // await game.save();
    // return game;
    return true;
  }
}
