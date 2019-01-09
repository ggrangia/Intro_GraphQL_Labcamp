'use strict';

// Export the merged schemas

const {
    gql
} = require('apollo-server-express');

const player_schema = require('./player');
const team_schema = require('./team');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

module.exports = [player_schema, team_schema, linkSchema];
