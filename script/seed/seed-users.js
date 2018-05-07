const faker = require('faker');

// const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');
const db = require('../../server/db');
const { User } = require('../../server/db/models');

const numUsers = 20;

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randUser() {
  const user = {
    password: '123',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
  user.email = `${user.firstName}.${user.lastName}@${faker.internet.domainName()}`;
  return User.build(user);
}

function generateUsers() {
  const users = doTimes(numUsers, randUser);
  users.push(
    User.build({
      firstName: 'Daniel',
      lastName: 'Simandl',
      email: `dan@dan.com`,
      password: '123',
    })
  );
  users.push(
    User.build({
      firstName: 'Josh',
      lastName: 'Remaley',
      email: `josh@josh.com`,
      password: '123',
    })
  );
  users.push(
    User.build({
      firstName: 'Ricky',
      lastName: 'Li',
      email: `ricky@ricky.com`,
      password: '123',
    })
  );
  users.push(
    User.build({
      firstName: 'Mathew',
      lastName: 'Chan',
      email: `matt@matt.com`,
      password: '123',
    })
  );
  users.push(
    User.build({
      firstName: 'Kevin',
      lastName: 'OMalley',
      email: `kevin@kevin.com`,
      password: '123',
    })
  );
  return users;
}

function createUsers() {
  return Promise.map(generateUsers(), users => users.save());
}

function seed() {
  console.log('Syncing users');
  return createUsers();
}

module.exports = seed
