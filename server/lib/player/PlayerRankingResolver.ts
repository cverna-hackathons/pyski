import { Field, ObjectType, Query, Resolver } from "type-graphql";
import { Player } from "./Player.entity";

@ObjectType()
export class PlayerRanking extends Player {
  @Field(() => Number)
  rank!: number;

  @Field(() => Number)
  score!: number;
}

@Resolver(PlayerRanking)
export class PlayerRankingResolver {
  @Query(() => [ PlayerRanking ])
  async playerRankings() {
    const players = await Player.find({
      relations: [
        'matchesAsPlayerA',
        'matchesAsPlayerA.games',
        'matchesAsPlayerA.games.result',
        'matchesAsPlayerB',
        'matchesAsPlayerB.games',
        'matchesAsPlayerB.games.result',
      ],
    });
    const rankings = players.map(player => {
      const scoreAsPlayerA = player.matchesAsPlayerA.filter(({
        isFinished
      }) => isFinished).reduce(
        (score, { playerAScore, playerBScore }) => (
          score + (playerAScore - playerBScore)
        )
      , 0)
      const scoreAsPlayerB = player.matchesAsPlayerB.filter(({
        isFinished
      }) => isFinished).reduce(
        (score, { playerAScore, playerBScore }) => (
          score + (playerBScore - playerAScore)
        )
      , 0)

      return {
        ...player,
        score: (scoreAsPlayerA + scoreAsPlayerB),
      }
    }).sort((a, b) => b.score - a.score).map((ranking, idx) => ({
      ...ranking,
      rank: (idx + 1),
    }))

    return rankings;
  }
}
