import { gql } from '@apollo/client';

export interface OnMoveCreatedPayload {
  moveCreated: string;
}

export const onMoveCreated = gql`
  subscription {
    moveCreated
  }
`;
