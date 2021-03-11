import { Arg, Field, InputType, Mutation, PubSub, PubSubEngine, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { Game } from "../database/entities/Game";
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
  async createMatch(
    @Arg('input') input: CreateMatchInput,
    @PubSub() pubsub: PubSubEngine,
  ): Promise<Match> {
    console.log('options', input);
    const playerA = await Player.findOne(input.playerA);
    const playerB = await Player.findOne(input.playerB);
    const match = getRepository(Match).create({
      ...input,
      playerA,
      playerB,
    });

    await match.save();
    console.log('Publishing MATCH_CREATED');
    await pubsub.publish('MATCH_CREATED', match);
    const game = await createFirstGameOfMatch(match);
    console.log('Publishing GAME_CREATED');
    await pubsub.publish('GAME_CREATED', game);
    return match;
  }
}

async function createFirstGameOfMatch(match: Match): Promise<Game> {
  const game = getRepository(Game).create({
    gameIndex: 0,
    playerIndex: 0,
    match,
  })
  await game.save()
  return game;
}
