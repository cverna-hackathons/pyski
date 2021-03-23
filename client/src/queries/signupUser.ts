import gql from 'graphql-tag';

export const signupUser = gql`
  mutation($input: UserSignupInput!) {
    signupUser(input: $input)
  }
`;
