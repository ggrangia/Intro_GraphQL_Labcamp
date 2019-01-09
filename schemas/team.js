'use strict';

const {
    gql
} = require('apollo-server');

module.exports = gql `

    type Team  @cacheControl(maxAge:120){
        id: ID!
        name: String
        championship: String
        players: [Player]
    }

    extend type Query {
        teams: [Team],
        team(id: ID!): Team
    }

    extend type Mutation {
        addTeam(team: addTeamInput!): Team
    }

    input addTeamInput {
        id: ID!
        name: String!
        championship: String!,
        players: [ID]
    }

    extend type Subscription {
        teamAdded: Team
    }
`;