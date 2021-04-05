import { gql } from '@apollo/client';

export interface MakeInteractiveMoveInput {
  gameId: string;
  x: number;
  y: number;
}

export const makeInteractiveMove = gql`
  mutation($input: GameMoveInput!) {
    makeInteractiveMove(input: $input)
  }
`;
