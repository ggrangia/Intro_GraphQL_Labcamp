'use strict';

const {
  ApolloServer,
  AuthenticationError
} = require('apollo-server-express');

const createServer = require('http').createServer;
const compression = require('compression');
const {
  ApolloEngine
} = require('apollo-engine');
const express = require('express');
const app = express();
const PORT = 8000;

const schema = require('./schemas');
const resolvers = require('./resolvers');
const models = require('./models');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  cacheControl: false,
  debug: false,
  tracing: true,
  engine: false, // False if using Engine
  context: ({
    req
  }) => {
    // Get the bearer token from the headers
    let res = {
      token: null,
      players: models.players,
      teams: models.teams
    };
    if (req) {
      res.token = req.headers.bearer || '';
      // Must return an object
      if (!res.token) {
        throw new AuthenticationError('You must be logged in!!');
      }
      return res;
    } else { // Else necessary to allow subscriptions
      return res;
    }
  },
  formatError: error => {
    // Do everything you want with the error object
    return error;
  }
});

server.applyMiddleware({
  app,
  path: '/graphql'
});

app.use(compression());

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

const engine = new ApolloEngine({
  apiKey: 'API_KEY',
  stores: [{
    name: 'inMemEmbeddedCache',
    inMemory: {
      cacheSize: 20971520 // 20 MB
    }
  }],
  queryCache: {
    publicFullQueryStore: 'inMemEmbeddedCache'
  }
});

engine.listen({
  port: PORT,
  httpServer
}, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});