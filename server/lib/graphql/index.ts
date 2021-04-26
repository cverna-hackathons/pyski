import { ApolloServer, PubSub } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { GameResolver } from '../game/GameResolver';
import { MatchResolver } from '../match/MatchResolver';
import { PlayerRankingResolver } from '../player/PlayerRankingResolver';
import { PlayerResolver } from '../player/PlayerResolver';
import { UserResolver } from '../user/UserResolver';

export const pubsub = new PubSub();
export const initialize = async () => new ApolloServer({
  context: ({ req }) => ({
    user: req.user,
  }),
  schema: await buildSchema({
    authChecker: ({ context }): boolean => {
      const isAuthorized = !!context.user;
      return isAuthorized;
    },
    resolvers: [
      MatchResolver,
      PlayerResolver,
      GameResolver,
      UserResolver,
      PlayerRankingResolver,
    ],
  }),
  subscriptions: {
    path: '/subscriptions'
  },
})