import { gql } from '@apollo/client';

export interface Player {
  id: string;
  name: string;
  path: string;
  type: string;
}

export const getPlayers = gql`
  query {
    players {
      id
      name
      path
      type
    }
  }
`;
