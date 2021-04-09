import { gql } from '@apollo/client';

export interface OnMatchFinishedPayload {
  matchFinished: string;
}

export const onMatchFinished = gql`
  subscription {
    matchFinished
  }
`;
