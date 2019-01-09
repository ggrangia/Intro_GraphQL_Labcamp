'use strict';

module.exports = {
    Query: {
      players: (parent, args, context) => {
        return context.players;
      },
      player: (parent, args, context) => {
        return context.players.find(p => p.id.toString() === args.id);
      }
    },
    Player: {
      /* A parent object (Player) needs a resolver for
         each custom type in the schema definition
         (only 'team' in this exmple).                */
      team: (parent, args, context) => {
        return context.teams.find(t => parent.team === t.id);
      }
    }
  };