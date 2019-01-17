'use strict';

const {
    mergeSchemas
} = require('graphql-tools');
const playerSchema = require('./player');
const teamSchema = require('./team');


const linkSchema = `
    extend type Player {
        team: Team!
    }
    extend type Team {
        players: [Player]
    }
`;

module.exports = mergeSchemas({
    schemas: [playerSchema, teamSchema, linkSchema,],
    resolvers: {
        Player: {
            team: {
                fragment: `... on Player {teamId}`, // ... is a shorthand for: fragment FragmentName  
                resolve(parent, args, context, info) {
                    return info.mergeInfo.delegateToSchema({
                        schema: teamSchema,
                        operation: 'query',
                        fieldName: 'team',
                        args: {
                            id: parent.teamId
                        },
                        context,
                        info,
                    });
                }
            }
        },
        Team: {
            players: {
                fragment: `fragment TeamFragment on Team {id}`, // No shorthand
                resolve(parent, args, context, info) {
                    return info.mergeInfo.delegateToSchema({
                        schema: playerSchema,
                        operation: 'query',
                        fieldName: 'playersByTeamId',
                        args: {
                            id: parent.id
                        },
                        context,
                        info,
                    });
                }
            }
        }
    }
});