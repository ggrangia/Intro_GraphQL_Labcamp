'use strict';

const {
    makeExecutableSchema
} = require('graphql-tools');

const typeDefs = `
    type Team {
        id: ID!
        name: String
        championship: String
        playersId : [ID]
    }

    type Query {
        teams: [Team],
        team(id: ID!): Team
    }

    type Mutation {
        addTeam(team: addTeamInput!): Team
    }

    input addTeamInput {
        id: ID!
        name: String!
        championship: String!,
        players: [ID]
    }

    type Subscription {
        teamAdded: Team
    }
`;

const resolvers = {
    Query: {
        team: (parent, args, context) => {
            args.id = args.id.toString();
            return context.teams.find(t => t.id.toString() === args.id);
        },
        teams: (parent, args, context) => {
            return context.teams;
        }
    },
    Mutation: {
        addTeam: (parent, args) => {
            pubsub.publish(TEAM_ADDED, {
                teamAdded: args.team
            });
            return args.team;
        }
    },
    Subscription: {
        teamAdded: {
            subscribe: () => pubsub.asyncIterator([TEAM_ADDED]),
        }
    }
};

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});