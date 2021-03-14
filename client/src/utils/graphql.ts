import { ApolloClient } from 'apollo-client';
import { DocumentNode, HttpLink, InMemoryCache, split } from 'apollo-boost';
import { API_HOST, API_URI } from '../actions/request';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: `${API_URI}/graphql`,
});
const wsLink = new WebSocketLink({
  uri: `ws://${API_HOST}/subscriptions`,
  options: {
    reconnect: true,
  },
});
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
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
