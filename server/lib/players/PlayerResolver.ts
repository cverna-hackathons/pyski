import { Query, Resolver } from "type-graphql";
import { Player } from "../database/entities/Player";

@Resolver(Player)
export class PlayerResolver {
  @Query(() => [ Player ])
  players() {
    return Player.find()
  }
}
