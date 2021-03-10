import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
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
  q: string,
  variables: Object
): Promise<T> => {
  const { data } = await graphql.query({
    query: gql`${q}`,
    variables
  });

  return data;
};
