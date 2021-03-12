import { Arg, Field, InputType, Mutation, PubSub, PubSubEngine, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { Match } from "../database/entities/Match";
import { Player } from "../database/entities/Player";

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
    return Match.findOne(id);
  }

  @Mutation(() => Match)
  async createMatch(
    @Arg('input') input: CreateMatchInput,
    @PubSub() pubsub: PubSubEngine,
  ): Promise<Match> {
    console.log('options', input);
    const match = getRepository(Match).create({
      ...input,
      playerA: (await Player.findOne(input.playerA)),
      playerB: (await Player.findOne(input.playerB)),
    });

    await match.save();
    await match.createFirstGame();
    console.log('Publishing MATCH_CREATED');
    await pubsub.publish('MATCH_CREATED', match);
    return match;
  }
}
