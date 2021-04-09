import { gql } from '@apollo/client';

export interface PlayerRanking {
  id: string;
  name: string;
  rank: number;
  score: number;
}

export interface GetPlayerRankingsPayload {
  playerRankings: PlayerRanking[];
}

export const getPlayerRankings = gql`
  query {
    playerRankings {
      id
      name
      rank
      score
    }
  }
`;
