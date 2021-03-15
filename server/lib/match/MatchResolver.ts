import { Arg, Field, InputType, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";
import { Match } from "./Match.entity";
import { Player } from "../players/Player.entity";
import { TOPIC } from "../topics";
import { createNextGame } from "./createNextGame";

@InputType()
export class CreateMatchInput {
  @Field()
  playerA!: string;

  @Field()
  playerB!: string;

  @Field()
  gridWidth!: number;

  @Field()
  gridHeight!: number;

  @Field()
  maxRounds!: number;

  @Field()
  numOfGames!: number;

  @Field()
  timeout!: number;

  @Field()
  winningLength!: number;
}

@Resolver()
export class MatchResolver {
  @Query(() => [ Match ])
  matches() {
    return Match.find()
  }
  @Query(() => Match)
  async match(@Arg("id") id: string) {
    return Match.findOne({
      where: { id },
      relations: [ 'playerA', 'playerB', 'games' ],
    });
  }

  @Mutation(() => Match)
  async createMatch(
    @Arg('input') input: CreateMatchInput,
    @PubSub() pubsub: PubSubEngine,
  ): Promise<Match> {
    const match = Match.create({
      ...input,
      playerA: (await Player.findOne(input.playerA)),
      playerB: (await Player.findOne(input.playerB)),
    });

    await match.save();
    await pubsub.publish(TOPIC.MATCH_CREATED, match);
    await createNextGame(match.id, pubsub);
    return match;
  }

  @Subscription({ topics: TOPIC.MATCH_CREATED })
  matchCreated(
    @Root() match: Match
  ): string {
    if (match) {
      return match.id;
    } else return '';
  }

  @Subscription({ topics: TOPIC.GAME_FINISHED })
  gameFinished(
    @Root() matchId: string,
  ): string {
    console.log(`+++++++++ Finished game ${TOPIC.GAME_FINISHED}`, matchId);
    return matchId;
  }
}
