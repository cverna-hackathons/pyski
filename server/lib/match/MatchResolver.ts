import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
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

  @Mutation(() => Match)
  async createMatch(@Arg('data') data: CreateMatchInput) {
    console.log('options', data);
    const playerA = await Player.findOne(data.playerA);
    const playerB = await Player.findOne(data.playerB);
    const match = getRepository(Match).create({
      ...data,
      playerA,
      playerB,
    });

    await match.save();
    return match;
  }
}
