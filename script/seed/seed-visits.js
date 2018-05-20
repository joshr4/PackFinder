const faker = require('faker');
const chance = require('chance')(123)
// const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');
const db = require('../../server/db');
const { User, Visit, Park } = require('../../server/db/models');

const numUsers = 50;


async function createVisits() {
    let allParks = await Park.findAll();
    let allUsers = await User.findAll();
    let nParks = allParks.length;
    //let endT = new Date(2018, 4, 7, 16, 0);
    //let startT2 = new Date(2018, 4, 7, 15, 0);
    //let endT2 = new Date(2018, 4, 7, 18, 0);
    for (let i = 0; i < allUsers.length; i ++) {
        let thisUser = allUsers[i];
        let parkIndex = i % nParks;
        let thisPark = allParks[parkIndex];
        //console.log("thisUser: ", thisUser.id);
        //console.log("thisPark: ", thisPark.id);
        let bigNum = 30;
        let smallNum = 10;
        if (thisPark.name == 'Ward Dog Friendly Area') {
            for (let m = 0; m < bigNum; m ++) {
                let morningStart = chance.integer({min:5, max:8});
                let morningDay = chance.integer({min:14, max:23});
                let morningVisit = await Visit.create({
                    start: new Date(2018, 4, morningDay, morningStart, 0),
                    end: new Date(2018, 4, morningDay, morningStart + 1, 0),
                    title: thisPark.name,
                })
                morningVisit.setUser(thisUser);
                morningVisit.setPark(thisPark);
                await morningVisit.save();
            }
            for (let b = 0; b < smallNum; b ++) {
                let beforeNoon = chance.integer({min:8, max:11});
                let beforeNoonDay = chance.integer({min:14, max:23}); 
                let beforeNoonVisit = await Visit.create({
                    start: new Date(2018, 4, beforeNoonDay, beforeNoon, 0),
                    end: new Date(2018, 4, beforeNoonDay, beforeNoon + 1, 0),
                    title: thisPark.name,
                })
                beforeNoonVisit.setUser(thisUser);
                beforeNoonVisit.setPark(thisPark);
                await beforeNoonVisit.save();
            }
            for (let l = 0; l < bigNum; l ++) {
                let noonHour = chance.integer({min:11, max:13});
                let noonDay = chance.integer({min:14, max:23}); 
                let noonVisit = await Visit.create({
                    start: new Date(2018, 4, noonDay, noonHour, 0),
                    end: new Date(2018, 4, noonDay, noonHour + 1, 0),
                    title: thisPark.name,
                })
                noonVisit.setUser(thisUser);
                noonVisit.setPark(thisPark);
                await noonVisit.save();                
            }
            for (let a = 0; a < smallNum; a ++) {
                let afternoonHour = chance.integer({min:13, max:16});
                let afternoonDay = chance.integer({min:14, max:23}); 
                let afternoonVisit = await Visit.create({
                    start: new Date(2018, 4, afternoonDay, afternoonHour, 0),
                    end: new Date(2018, 4, afternoonDay, afternoonHour + 1, 0),
                    title: thisPark.name,
                })
                afternoonVisit.setUser(thisUser);
                afternoonVisit.setPark(thisPark);
                await afternoonVisit.save();                                
            }
            for (let e = 0; e < bigNum; e ++) {
                let afterWorkHour = chance.integer({min:17, max:21});
                let afterWorkDay = chance.integer({min:14, max:23}); 
                let afterWorkVisit = await Visit.create({
                    start: new Date(2018, 4, afterWorkDay, afterWorkHour, 0),
                    end: new Date(2018, 4, afterWorkDay, afterWorkHour + 1, 0),
                    title: thisPark.name,
                })
                afterWorkVisit.setUser(thisUser);
                afterWorkVisit.setPark(thisPark);
                await afterWorkVisit.save();                                                
            }            
        }
        for (let x = 0; x < 5; x ++) {
            let startHour = chance.integer({min:15, max:18})
            let startDay = chance.integer({min:17, max:19})
            let visit1 = await Visit.create({
                start: new Date(2018, 4, startDay, startHour, 0),
                end: new Date(2018, 4, startDay, startHour + 1, 0),
                title: thisPark.name,
            })
            visit1.setUser(thisUser);
            visit1.setPark(thisPark);
            await visit1.save();
            let startHour2 = chance.integer({min:6, max:23})
            let startDay2 = chance.integer({min:14, max:23})
            let visit2 = await Visit.create({
                start: new Date(2018, 4, startDay2, startHour2, 0),
                end: new Date(2018, 4, startDay2, startHour2 + 1, 0),
                userId: thisUser.id,
                parkId: thisPark.id,
                title: thisPark.name,
            })
            await visit2.save();
            let startHour3 = chance.integer({min:15, max:18})
            let startDay3 = chance.integer({min:17, max:19})
            let visit3 = await Visit.create({
                start: new Date(2018, 4, startDay3, startHour3, 0),
                end: new Date(2018, 4, startDay3, startHour3 + 1, 0),
                userId: thisUser.id,
                parkId: thisPark.id,
                title: thisPark.name,
            })
            await visit3.save();                
        }
        // await thisUser.addUserFavorites(thisPark);
        await thisUser.addFavorite(thisPark);
        await thisUser.save();
        // let startHour3 = chance.integer({min:15, max:18})
        // let startDay3 = chance.integer({min:17, max:19})
        // let visit3 = await Visit.create({
        //     start: new Date(2018, 4, startDay3, startHour3, 0),
        //     end: new Date(2018, 4, startDay3, startHour3 + 1, 0),
        //     userId: thisUser.id,
        //     parkId: thisPark.id,
        //     title: thisPark.name,
        // })

        // let startHour4 = chance.integer({min:6, max:23})
        // let startDay4 = chance.integer({min:14, max:23})
        // let visit4 = await Visit.create({
        //     start: new Date(2018, 4, startDay4, startHour4, 0),
        //     end: new Date(2018, 4, startDay4, startHour4 + 1, 0),
        //     userId: thisUser.id,
        //     parkId: thisPark.id,
        //     title: thisPark.name,
        // })

        // let startHour5 = chance.integer({min:15, max:18})
        // let startDay5 = chance.integer({min:17, max:19})
        // let visit5 = await Visit.create({
        //     start: new Date(2018, 4, startDay5, startHour5, 0),
        //     end: new Date(2018, 4, startDay5, startHour5 + 1, 0),
        //     userId: thisUser.id,
        //     parkId: thisPark.id,
        //     title: thisPark.name,
        // })        
    }
}

async function seed() {
  console.log('Syncing visits');
  return await createVisits();
}

module.exports = seed
