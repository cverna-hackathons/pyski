import { gql } from '@apollo/client';

export const signupUser = gql`
  mutation($input: UserSignupInput!) {
    signupUser(input: $input)
  }
`;
