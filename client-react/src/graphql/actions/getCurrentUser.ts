import { gql } from '@apollo/client';

export const getCurrentUser = gql`
  query {
    currentUser {
      id
      name
      email
    }
  }
`;
