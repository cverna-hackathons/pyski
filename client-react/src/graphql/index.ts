import { authentication } from './authentication';
import {
  ApolloClient,
  ApolloLink,
  concat,
  DocumentNode,
  gql,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from '@apollo/client/utilities';

export const API_HOST = 'localhost:4141';
export const API_URI = `http://${API_HOST}`;
export const auth = authentication();

const authMiddleware = new ApolloLink((operation, forward) => {
  if (auth.token.get()) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${auth.token.get()}`,
      },
    });
  }
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: `${API_URI}/graphql`,
});
const wsLink = new WebSocketLink({
  uri: `ws://${API_HOST}/subscriptions`,
  options: {
    reconnect: true,
  },
});
export const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  concat(authMiddleware, wsLink),
  concat(authMiddleware, httpLink),
);
export const graphql = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const query = async <T>(
  q: DocumentNode,
  variables: Record<string, object>,
): Promise<T> => {
  const { data } = await graphql.query({
    query: q,
    variables: { ...variables },
  });
  return data;
};

export const mutate = async <T>(
  mutation: DocumentNode,
  variables: Record<string, object>,
): Promise<T> => {
  const { data } = await graphql.mutate({
    mutation,
    variables,
  });
  return data;
};

type LoginResponseData = {
  loginUser: string;
};

export const authenticate = async (
  email: string,
  password: string,
): Promise<boolean> => {
  const { loginUser: token } = await mutate<LoginResponseData>(
    gql`
      mutation($input: UserLoginInput!) {
        loginUser(input: $input)
      }
    `,
    {
      input: {
        email,
        password,
      },
    },
  );
  if (token && token.length) {
    auth.token.set(token);
    return true;
  } else return false;
};
