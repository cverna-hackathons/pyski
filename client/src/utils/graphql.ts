import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  DocumentNode,
} from '@apollo/client/core';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4141/graphql',
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const graphql = new ApolloClient({
  link: httpLink,
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
