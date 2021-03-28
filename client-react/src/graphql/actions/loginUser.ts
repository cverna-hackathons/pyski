import { gql } from '@apollo/client';

export const loginUser = gql`
  mutation($input: UserLoginInput!) {
    loginUser(input: $input)
  }
`;
