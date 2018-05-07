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
    let testUser = await User.findById(1);
    let testPark = await Park.findById(1);
    // await testUser.addParks([testPark], {
    //     start: startT,
    //     end: endT,            
    //     title: testPark.name,
    // });
    // await testUser.save();
    for (let i = 0; i < allUsers.length; i ++) {
        let thisUser = allUsers[i];
        let parkIndex = i % nParks;
        let thisPark = allParks[parkIndex];
        console.log("thisUser: ", thisUser.id);
        console.log("thisPark: ", thisPark.id);
        // thisUser.addPark(thisPark, {
        //     start: startT,
        //     end: endT,            
        // })
        // thisUser.save();
        let newVisit = await Visit.create({
            // start: new Date(Date.now()),
            start: startT,
            end: endT,
            userId: thisUser.id,
            parkId: thisPark.id
        })
    //     newVisit.setUser(allUsers[i]);
    //     newVisit.setPark(allParks[parkIndex]);
    }
    // return Promise.map(generateUsers(), users => users.save());
}

async function seed() {
  console.log('Syncing visits');
  return await createVisits();
}

module.exports = seed
