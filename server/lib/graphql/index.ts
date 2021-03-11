import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { MatchResolver } from '../match/MatchResolver';
import { PlayerResolver } from '../players/PlayerResolver';


export const initialize = async () => new ApolloServer({
  schema: await buildSchema({
    resolvers: [
      MatchResolver,
      PlayerResolver,
    ],
  }),
  subscriptions: '/subscriptions',
})