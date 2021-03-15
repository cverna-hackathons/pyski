import { gql } from '@apollo/client/core';
export const createMatch = gql`
  mutation($input: CreateMatchInput!) {
    createMatch(input: $input) {
      id
    }
  }
`;
