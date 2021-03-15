import { Query, Resolver } from "type-graphql";
import { Player } from "./Player.entity";

@Resolver(Player)
export class PlayerResolver {
  @Query(() => [ Player ])
  players() {
    return Player.find()
  }
}
