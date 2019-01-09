'use strict';

const player_resolvers = require('./player');
const team_resolvers = require('./team');

module.exports = [player_resolvers, team_resolvers];