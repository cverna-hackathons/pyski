import { gql } from '@apollo/client/core';
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
