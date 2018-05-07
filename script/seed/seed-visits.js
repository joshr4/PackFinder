const faker = require('faker');

// const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');
const db = require('../../server/db');
const { User, Visit, Park } = require('../../server/db/models');

const numUsers = 50;


async function createVisits() {
    let allParks = await Park.findAll();
    let allUsers = await User.findAll();
    let nParks = allParks.length;
    let startT = new Date(2018, 4, 7, 13, 0);
    let endT = new Date(2018, 4, 7, 16, 0); 
    let startT2 = new Date(2018, 4, 7, 15, 0);
    let endT2 = new Date(2018, 4, 7, 18, 0); 
    for (let i = 0; i < allUsers.length; i ++) {
        let thisUser = allUsers[i];
        let parkIndex = i % nParks;
        let thisPark = allParks[parkIndex];
        console.log("thisUser: ", thisUser.id);
        console.log("thisPark: ", thisPark.id);
        let visit1 = await Visit.create({
            start: startT,
            end: endT,
            title: thisPark.name,
        })
        visit1.setUser(thisUser);
        visit1.setPark(thisPark);
        await visit1.save();
        let visit2 = await Visit.create({
            start: startT2,
            end: endT2,
            userId: thisUser.id,
            parkId: thisPark.id,
            title: thisPark.name,
        })
        // await thisUser.addUserFavorites(thisPark);
        await thisUser.addFavorite(thisPark);
        await thisUser.save();
    }
}

async function seed() {
  console.log('Syncing visits');
  return await createVisits();
}

module.exports = seed
