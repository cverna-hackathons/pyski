import { gql } from '@apollo/client';

export interface OnGameFinishedPayload {
  gameFinished: string;
}

export const onGameFinished = gql`
  subscription {
    gameFinished
  }
`;
