import { gql } from '@apollo/client';

interface Player {
  name: string;
}

export interface MatchScore {
  id: string;
  playerA: Player;
  playerB: Player;
  playerAScore: string;
  playerBScore: string;
}

export interface GetMatchesPayload {
  matches: MatchScore[];
}

export const getMatches = gql`
  query {
    matches {
      id
      playerA {
        name
      }
      playerB {
        name
      }
      playerAScore
      playerBScore
    }
  }
`;
