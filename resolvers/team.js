'use strict';

const PubSub = require('apollo-server').PubSub;
const pubsub = new PubSub();
const TEAM_ADDED = 'TEAM_ADDED';

module.exports = {
    Query: {
      team: (parent, args, context) => {
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
    Team: {
      players: (parent, args, context) => {
        let temp = parent.players.map(String);
        return context.players.filter(p => temp.indexOf(p.id.toString()) > -1);
      }
    },
    Subscription: {
      teamAdded: {
        subscribe: () => pubsub.asyncIterator([TEAM_ADDED]),
      }
    }
  };