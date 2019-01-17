'use strict';

const players = [{
    id: 1,
    name: 'LeBron',
    surname: 'James',
    nationality: 'USA',
    teamId: 1,
    championship: 'NBA',
    age: 34,
    height: 2.03,
    weight: 113
  }, {
    id: 2,
    name: 'Lonzo',
    surname: 'Ball',
    nationality: 'USA',
    teamId: 1,
    championship: 'NBA',
    age: 21,
    height: 1.98,
    weight: 86.2}];
  
  const teams = [{
    id: 1,
    name: 'Los Angeles Lakers',
    championship: 'NBA',
    playersId: [1, 2]
  }];

// Fake Data
module.exports = {
    players,
    teams
};