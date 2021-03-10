import { ApolloServer, gql } from 'apollo-server-express';
import { getRepository } from 'typeorm';
import { Match } from '../database/entities/Match';
import { Player } from '../database/entities/Player';
import { PubSub } from 'apollo-server'

export const definitions = gql`
  type Game {
    id: String
    gameIndex: Int!
    playerIndex: Int!
  }
  type Match {
    id: String
    numOfGames: Int!
  }
  type Player {
    id: String
    name: String
    path: String
    type: String
  }
  type Query {
    matches: [Match]
    players: [Player]
  }
  type Subscription {
    gameCreated: Game
  }
`

export const Events = new PubSub()
export const resolvers = {
  Query: {
    async matches() {
      return getRepository(Match).find()
    },
    async players() {
      return getRepository(Player).find()
    },
  },
  Subscription: {
    gameCreated: {
      // More on pubsub below
      subscribe: () => Events.asyncIterator(['GAME_CREATED']),
    },
  },
  // Mutation: {

  // },
}

export const graphql = new ApolloServer({
  resolvers,
  typeDefs: definitions,
  subscriptions: '/subscriptions',
})