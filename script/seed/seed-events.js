const faker = require('faker');
const chance = require('chance')(123)
const Promise = require('bluebird');
const db = require('../../server/db');
const { User, Visit, Park, Event } = require('../../server/db/models');

const numUsers = 50;

let eventDescriptions = {
    1: "Walk dogs in the park together",
    2: "Corgi meetup",
    3: "Frisbee with dogs",
    4: "Grooming tips and advice session",
    5: "Local meetup"
}

async function createEvents() {
    let allParks = await Park.findAll();
    let allUsers = await User.findAll();
    let nUsers = allUsers.length;
    let nParks = allParks.length;
    //let endT = new Date(2018, 4, 7, 16, 0);
    //let startT2 = new Date(2018, 4, 7, 15, 0);
    //let endT2 = new Date(2018, 4, 7, 18, 0);
    // for (let i = 0; i < allUsers.length; i ++) {
    for (let i = 0; i < 15; i ++) {
        let thisUser = allUsers[i];
        let parkIndex = i % nParks;
        let thisPark = allParks[parkIndex];
        let thisDescription = eventDescriptions[(i % 5) + 1];
        // console.log("i: ", i);
        //console.log("thisUser: ", thisUser.id);
        //console.log("thisPark: ", thisPark.id);
        let startHour = chance.integer({min:0, max:20})
        let startDay = chance.integer({min:1, max:25})
        let event = await Event.create({
            start: new Date(2018, 4, startDay, startHour, 0),
            end: new Date(2018, 4, startDay, startHour + 1, 0),
            description: thisDescription,
        })
        await event.setCreator(thisUser);
        await event.addAttendee(thisUser);
        await event.setPark(thisPark);
        for (let x = 0; x < 6; x++) {
            let randomUserIndex = parseInt(Math.floor(Math.random()*(nUsers - 1)));
            let randomUser = allUsers[randomUserIndex];
            if (randomUser.id == thisUser.id) {
                continue;
            }
            if (x <= 4) {
                await event.addInvitee(randomUser);
                await randomUser.addInvitedEvent(event);
            }
            else {
                await event.addAttendee(randomUser);
                await randomUser.addAttendingEvent(event);
            }
        }
            // console.log("randomUserIndex: ", randomUserIndex);
            // console.log("random user: ", allUsers[randomUserIndex]);
        
    }
}

async function seed() {
  console.log('Syncing events');
  return await createEvents();
}

module.exports = seed
