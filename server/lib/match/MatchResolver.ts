import { Arg, Authorized, Ctx, Field, InputType, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";
import { Match } from "./Match.entity";
import { Player } from "../player/Player.entity";
import { TOPIC } from "../topics";
import { createNextGame } from "./createNextGame";
import { AuthenticatedReqContext } from "../../authentication";

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
  @Authorized()
  @Query(() => [ Match ])
  matches(
    @Ctx() context: AuthenticatedReqContext
  ) {
    return Match.find({
      relations: [
        'playerA',
        'playerB',
        'author',
        'games',
        'games.result'
      ],
      where: {
        author: context.user,
      },
    });
  }

  @Authorized()
  @Query(() => Match)
  async match(@Arg("id") id: string) {
    return Match.findOne({
      where: { id },
      relations: [
        'playerA',
        'playerB',
        'games',
        'games.moves',
        'games.result',
      ],
    });
  }

  @Authorized()
  @Mutation(() => Match)
  async createMatch(
    @Arg('input') input: CreateMatchInput,
    @PubSub() pubsub: PubSubEngine,
    @Ctx() context: AuthenticatedReqContext,
  ): Promise<Match> {
    const match = Match.create({
      ...input,
      author: context.user,
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
    return matchId;
  }

  @Subscription({ topics: TOPIC.MATCH_FINISHED })
  matchFinished(
    @Root() matchId: string,
  ): string {
    return matchId;
  }
}
