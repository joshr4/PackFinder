const faker = require('faker');
const chance = require('chance')(123)
const Promise = require('bluebird');
const db = require('../../server/db');
const { User, Visit, Park, Event, Message } = require('../../server/db/models');

const numUsers = 50;

let eventDescriptions = {
    1: "Doggie capture the flag",
    2: "Corgi meetup",
    3: "Frisbee with dogs",
    4: "Grooming tips and advice session",
    5: "Local pup meetup",
    6: "Puppy playdate",
    7: "Secret dog meetup to plot against the hoomans",
    8: "Train your dog to sing karaoke",
    9: "Doggie costume day"
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
    let Matt = await User.findOne({where:{email:"matt@matt.com"}});
    let Dan = await User.findOne({where:{email:"dan@dan.com"}});
    let Hugh = await User.findOne({where:{email:"hugh@hugh.com"}});
    for (let i = 0; i < 15; i ++) {
        let thisUser = allUsers[i];
        let parkIndex = i % nParks;
        let thisPark = allParks[parkIndex];
        let thisDescription = eventDescriptions[(i % 9) + 1];
        // console.log("i: ", i);
        //console.log("thisUser: ", thisUser.id);
        //console.log("thisPark: ", thisPark.id);
        let startHour = chance.integer({min:0, max:20})
        let startDay = chance.integer({min:1, max:25})
        if(i===0) thisDescription = "Walk in the park"
        let event = await Event.create({
            start: new Date(2018, 4, startDay, startHour, 0),
            end: new Date(2018, 4, startDay, startHour + 1, 0),
            description: thisDescription,
        })
        //Messages
        if (i == 0) {
            await Message.create({
                content:"Howdy, bring treats plz!",
                posterId: Hugh.id,
                eventId: event.id,
            })
            await Message.create({
                content:"Are you a dog?",
                posterId: Dan.id,
                eventId: event.id,
            })
            await Message.create({
                content:"Who me?",
                posterId: Hugh.id,
                eventId: event.id,
            })
            await Message.create({
                content:"Your profile picture looks questionable",
                posterId: Matt.id,
                eventId: event.id,
            })
            await Message.create({
                content:"I dont know what you're barking about",
                posterId: Hugh.id,
                eventId: event.id,
            })
            await Message.create({
                content:"You said barking!",
                posterId: Dan.id,
                eventId: event.id,
            })
            await Message.create({
                content:"Someone is having a ruff day",
                posterId: Hugh.id,
                eventId: event.id,
            })
            await event.addAttendee(Dan);
            await event.addAttendee(Matt);
            await event.addAttendee(Hugh);
            await event.setCreator(Hugh);
            await event.setPark(thisPark);
            continue;
        }

        await event.setCreator(thisUser);
        await event.addAttendee(thisUser);
        await event.setPark(thisPark);

        let testUser = await User.findOne({
            where:{
                email:"josh@josh.com"
            }
        })
        if (i <= 8) { //Sending 8 invites to Josh
            await event.addInvitee(testUser);
            await testUser.addInvitedEvent(event);
        }
        else { //2 Josh accepts 7 invites
            await event.addAttendee(testUser);
            await testUser.addAttendingEvent(event);
        }
        // SEEDING EVENT INVITES FOR MATT & DAN
        // MATT
        await event.addInvitee(Matt);
        // await Matt.addAttendingEvent(event);
        // DAN
        await event.addInvitee(Dan);
        // await Dan.addAttendingEvent(event);


      if(i!==0){ for (let x = 0; x < 10; x++) {
            let randomUserIndex = parseInt(Math.floor(Math.random()*(nUsers - 1)));
            let randomUser = allUsers[randomUserIndex];
            if (randomUser.id == thisUser.id
            || randomUser.email == "matt@matt.com"
            || randomUser.email == "dan@dan.com") {
                continue;
            }
            if (x <= 5) {
                await event.addInvitee(randomUser);
                await randomUser.addInvitedEvent(event);
            }
            else {
                await event.addAttendee(randomUser);
                await randomUser.addAttendingEvent(event);
            }
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
