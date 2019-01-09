'use strict';

const {
    gql
} = require('apollo-server-express');

module.exports = gql `
    type Player @cacheControl(maxAge:120) {
        id: ID!
        "Name of the player"
        name: String!
        surname: String!
        nationality: String!
        age: Int!
        height: Float!
        weight: Float!
        "Current Team"
        team: Team!
        championship: String!
    }

    extend type Query {
        players: [Player],
        player(id: ID!): Player,
    }
`;
