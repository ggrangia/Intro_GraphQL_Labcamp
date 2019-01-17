'use strict';

const {
    makeExecutableSchema
} = require('graphql-tools')

const typeDefs = `
type Player {
    id: ID!
    teamId: ID!
    "Name of the player"
    name: String!
    surname: String!
    nationality: String!
    age: Int!
    height: Float!
    weight: Float!
    championship: String!
}

type Query {
    players: [Player],
    player(id: ID!): Player,
    playersByTeamId(id: ID!): [Player]
}
`;

const resolvers = {
    Query: {
        players: (parent, args, context) => {
            return context.players;
        },
        player: (parent, args, context) => {
            return context.players.find(p => p.id.toString() === args.id);
        },
        playersByTeamId: (parent, args, context) =>  {
            return context.players.filter(p => p.teamId.toString() === args.id.toString());
        }
    },
};

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});