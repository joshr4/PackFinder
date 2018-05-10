const faker = require('faker');
const chance = require('chance')(123)
// const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');
const db = require('../../server/db');
const { User, Visit, Park, Request } = require('../../server/db/models');

const numUsers = 50;


async function seedMessages() {
    let allUsers = await User.findAll();
    let nUsers = allUsers.length;
    for (let i = 0; i < allUsers.length; i ++) {
        //console.log("i: ", i);
    }
}

async function seed() {
  console.log('Seeding messages');
  return await seedMessages();
}

module.exports = seed
