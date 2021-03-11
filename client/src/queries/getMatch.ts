import { gql } from '@apollo/client/core';
export const getMatch = gql`
  query($id: String!) {
    match(id: $id) {
      id
      winningLength
    }
  }
`;
