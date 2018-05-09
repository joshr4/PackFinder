const faker = require('faker');
const chance = require('chance')(123)
// const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');
const db = require('../../server/db');
const { User, Visit, Park, Request } = require('../../server/db/models');

const numUsers = 50;


async function seedFriends() {
    let allUsers = await User.findAll();
    let nUsers = allUsers.length;
    for (let i = 0; i < allUsers.length; i ++) {
        let thisUser = allUsers[i];
        for (let x = 0; x < 3; x++) {
            let randomUserIndex = parseInt(Math.floor(Math.random()*(nUsers - 1)));
            // console.log("randomUserIndex: ", randomUserIndex);
            // console.log("random user: ", allUsers[randomUserIndex]);
            let randomUser = allUsers[randomUserIndex];
            if (randomUser.id == thisUser.id) {
                x --;
                continue;
            }
            // let friendRequest = await thisUser.sendRequest(randomUser);
            await thisUser.save();

            // await thisUser.addFriend(randomUser);
            // await randomUser.addFriend(thisUser);
            let existingRequests = await randomUser.getRequesters({
                where:{
                    id:thisUser.id,
                }
            });
            let reverseRequest = await thisUser.getRequesters({
                where:{
                    id:randomUser.id
                }
            });
            if (reverseRequest.length > 0) {
                console.log("existing request found! ", thisUser.id, randomUser.id);
                await thisUser.removeRequester(randomUser);
                await randomUser.removeRequestee(thisUser);
                // existingRequests[0].destroy();                
                await thisUser.addFriend(randomUser);
                await randomUser.addFriend(thisUser);
            }
            else {
                await thisUser.addRequestee(randomUser);
                await randomUser.addRequester(thisUser);
            }            
        }
    }
}

async function seed() {
  console.log('Seeding friends');
  return await seedFriends();
}

module.exports = seed
