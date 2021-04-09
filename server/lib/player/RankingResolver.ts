import { Field, ObjectType, Query, Resolver } from "type-graphql";
import { Player } from "./Player.entity";

@ObjectType()
export class PlayerRanking extends Player {
  @Field(() => Number)
  benchmarkWithPlayers(players: [ Player ]) {
    return players.length;
  }
}

@Resolver(PlayerRanking)
export class PlayerRankingResolver {
  @Query(() => [ PlayerRanking ])
  ranking() {
    return PlayerRanking.find({
      relations: [
        'matches',
      ],
    });
  }
}
