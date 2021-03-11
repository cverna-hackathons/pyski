import { ApolloServer, PubSub } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { GameResolver } from '../game/GameResolver';
import { MatchResolver } from '../match/MatchResolver';
import { PlayerResolver } from '../players/PlayerResolver';

export const pubsub = new PubSub();
export const initialize = async () => new ApolloServer({
  schema: await buildSchema({
    resolvers: [
      MatchResolver,
      PlayerResolver,
      GameResolver,
    ],
  }),
  subscriptions: {
    path: '/subscriptions'
  },
})