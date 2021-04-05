import { gql } from '@apollo/client';

export interface CreateMatchInput {
  gridWidth: number;
  gridHeight: number;
  numOfGames: number;
  maxRounds: number;
  playerA?: string;
  playerB?: string;
  winningLength: number;
  timeout: number;
}

export interface CreateMatchResponse {
  createMatch: {
    id: string;
  };
}

export const DEFAULT_MATCH_INPUT: CreateMatchInput = {
  gridWidth: 10,
  gridHeight: 10,
  numOfGames: 3,
  maxRounds: 100,
  playerA: undefined,
  playerB: undefined,
  winningLength: 5,
  timeout: 20000,
};

export const createMatch = gql`
  mutation($input: CreateMatchInput!) {
    createMatch(input: $input) {
      id
    }
  }
`;
