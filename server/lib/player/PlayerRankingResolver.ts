import { Field, ObjectType, Query, Resolver } from "type-graphql";
import { Player } from "./Player.entity";
import EloRank = require("elo-rank");
import { Match } from "../match/Match.entity";

const Elo = new EloRank(16);
const BASE_ELO = 1000;

@ObjectType()
export class PlayerRanking extends Player {
  @Field(() => Number)
  rank!: number;

  @Field(() => Number)
  score!: number;
}

type EloMap = {
  [index: string]: number
};

function summarizeRanking(
  matches: Match[],
  players: Player[],
): EloMap {
  const elos: EloMap = {};

  players.forEach(p => { elos[p.id] = BASE_ELO });
  matches.filter(m => m.isFinished).sort(
    (a, b) => a.finishedAtInt - b.finishedAtInt
  ).forEach(({
    playerA,
    playerAScore,
    playerB,
    playerBScore,
    isTied,
  }) => {
    if (!isTied) {
      const playerAElo = elos[playerA.id];
      const playerBElo = elos[playerB.id];
      const playerAWins = playerAScore > playerBScore;
      elos[playerA.id] = Elo.updateRating(
        Elo.getExpected(playerAElo, playerBElo),
        playerAWins ? 1 : 0,
        playerAElo,
      );
      elos[playerB.id] = Elo.updateRating(
        Elo.getExpected(playerBElo, playerAElo),
        playerAWins ? 0 : 1,
        playerBElo,
      );
    }
  });
  return elos;
}

@Resolver(PlayerRanking)
export class PlayerRankingResolver {
  @Query(() => [ PlayerRanking ])
  async playerRankings() {
    const players = await Player.find();
    const matches = await Match.find({
      relations: [
        'games',
        'games.result',
        'playerA',
        'playerB',
      ],
    });
    const elos = summarizeRanking(matches, players)
    const rankings = players.map(player => {
      return {
        ...player,
        score: elos[player.id],
      }
    }).sort((a, b) => b.score - a.score).map((ranking, idx) => ({
      ...ranking,
      rank: (idx + 1),
    }))

    return rankings;
  }
}
