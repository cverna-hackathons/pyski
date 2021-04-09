import { gql } from '@apollo/client';

export interface Match {
  id: string;
  winningLength: number;
}

export interface Move {
  id: string;
  moveIndex: number;
  x: number;
  y: number;
}

export interface Game {
  gameIndex: number;
  grid: number[][];
  isFinished: boolean;
  faultOfPlayer: number;
  nextPlayerIndex: number;
  nextPlayerIsInteractive: boolean;
  nextPlayerValue: number;
  statusLabel: string;
  winner: number;
  match: Match;
  moves: Move[];
}

export interface GetGamePayload {
  game: Game;
}

export const getGame = gql`
  query($id: String!) {
    game(id: $id) {
      gameIndex
      grid
      isFinished
      faultOfPlayer
      nextPlayerIndex
      nextPlayerIsInteractive
      nextPlayerValue
      statusLabel
      winner
      match {
        id
        winningLength
      }
      moves {
        id
        moveIndex
        x
        y
      }
    }
  }
`;
