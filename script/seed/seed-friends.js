const faker = require('faker');
const chance = require('chance')(123)
// const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');
const db = require('../../server/db');
const { User, Visit, Park } = require('../../server/db/models');

const numUsers = 50;


async function seedFriends() {
    let allUsers = await User.findAll();
    // let nParks = allParks.length;
    // //let endT = new Date(2018, 4, 7, 16, 0);
    // //let startT2 = new Date(2018, 4, 7, 15, 0);
    // //let endT2 = new Date(2018, 4, 7, 18, 0);
    let nUsers = allUsers.length;
    for (let i = 0; i < allUsers.length; i ++) {
        let thisUser = allUsers[i];
        for (let x = 0; x < 3; x++) {
            let randomUserIndex = parseInt(Math.floor(Math.random()*(nUsers - 1)));
            // console.log("randomUserIndex: ", randomUserIndex);
            // console.log("random user: ", allUsers[randomUserIndex]);
            let randomUser = allUsers[randomUserIndex];
            await thisUser.addFriend(randomUser);
        }
        await thisUser.save();
    //     let parkIndex = i % nParks;
    //     let thisPark = allParks[parkIndex];
    //     //console.log("thisUser: ", thisUser.id);
    //     //console.log("thisPark: ", thisPark.id);
    //     let startHour = chance.integer({min:0, max:20})
    //     let startDay = chance.integer({min:1, max:25})
    //     let visit1 = await Visit.create({
    //         start: new Date(2018, 4, startDay, startHour, 0),
    //         end: new Date(2018, 4, startDay, startHour + 1, 0),
    //         title: thisPark.name,
    //     })
    //     visit1.setUser(thisUser);
    //     visit1.setPark(thisPark);
    //     await visit1.save();
    //     let startHour2 = chance.integer({min:0, max:20})
    //     let startDay2 = chance.integer({min:1, max:25})
    //     let visit2 = await Visit.create({
    //         start: new Date(2018, 4, startDay2, startHour2, 0),
    //         end: new Date(2018, 4, startDay2, startHour2 + 1, 0),
    //         userId: thisUser.id,
    //         parkId: thisPark.id,
    //         title: thisPark.name,
    //     })
    //     // await thisUser.addUserFavorites(thisPark);
    //     await thisUser.addFavorite(thisPark);
    //     await thisUser.save();
    }
}

async function seed() {
  console.log('Seeding friends');
  return await seedFriends();
}

module.exports = seed
