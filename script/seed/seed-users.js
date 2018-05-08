const faker = require('faker');
const chance = require('chance')(123)

// const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');
const db = require('../../server/db');
const {
  User,
  Address
} = require('../../server/db/models');
const addresses = require('./chicagoAddresses')

// console.log('this is addresses', addresses)
const numUsers = 200;

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function generateAddresses(locations) {
  let createdAddresses = locations.map(address => Address.create(address))
  return Promise.all(createdAddresses)
}



function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randUser(possibleAddresses) {
  const start = randomIndex(possibleAddresses.length)
  const addressId = possibleAddresses.splice(start, 1)[0].id;
  const user = {
    password: '123',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    addressId
  };
  user.email = `${user.firstName}.${user.lastName}@gmail.com`;
  return User.build(user);
}


function generateUsers(userAddresses) {
  const users = doTimes(numUsers, () => randUser(userAddresses));
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

async function createUsers(locations) {
  // const createdAddresses = await generateAddresses(locations)
  return Promise.map(generateAddresses(addresses).then(addressArray =>
    generateUsers(addressArray)), users => users.save());
}

function seed() {
  console.log('Syncing users');
  return createUsers(addresses);
}

module.exports = seed
