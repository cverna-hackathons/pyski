import { gql } from '@apollo/client';

export interface Player {
  id: string;
  name: string;
}

export interface Game {
  id: string;
  gameIndex: string;
  faultOfPlayer: string;
  winner: string;
}

export interface Match {
  id: string;
  gridHeight: number;
  gridWidth: number;
  isFinished: boolean;
  maxRounds: number;
  numOfGames: number;
  playerAScore: number;
  playerBScore: number;
  timeout: number;
  winningLength: number;
  games: Game[];
  playerA: Player;
  playerB: Player;
}

export interface GetMatchPayload {
  match: Match;
}

export const getMatch = gql`
  query($id: String!) {
    match(id: $id) {
      id
      gridHeight
      gridWidth
      isFinished
      maxRounds
      numOfGames
      playerAScore
      playerBScore
      timeout
      winningLength
      games {
        id
        gameIndex
        faultOfPlayer
        winner
      }
      playerA {
        id
        name
      }
      playerB {
        id
        name
      }
    }
  }
`;
