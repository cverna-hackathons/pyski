import { API_HOST } from '@/actions/request';
import {
  ApolloClient,
  InMemoryCache,
  DocumentNode,
} from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';

// HTTP connection to the API
// const httpLink = createHttpLink({
//   // You should use an absolute URL here
//   uri: `${API_URI}/graphql`,
// });

const wsLink = new WebSocketLink({
  uri: `ws://${API_HOST}/graphql`,
  options: {
    reconnect: true,
  },
})

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const graphql = new ApolloClient({
  link: wsLink,
  cache,
});

export const query = async <T>(
  q: DocumentNode,
  variables: Object,
): Promise<T> => {
  const { data } = await graphql.query({
    query: q,
    variables: { ...variables },
  });

  return data;
};
export const mutate = async <T>(
  mutation: DocumentNode,
  variables: Object,
): Promise<T> => {
  const { data } = await graphql.mutate({
    mutation,
    variables,
  });
  console.log('mutate', variables, data);
  return data;
};
