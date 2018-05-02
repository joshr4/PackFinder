/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Pet, Park, Visit, Address, Event, Review} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  // Creating example seed addresses
  const address1 = await Address.create({
    line_1:"405 W Superior Street",
    city: "Chicago",
    state: "IL",
    zip: "60615"
  });
  const addressLEDP = await Address.create({
    line_1:"450 E Benton Pl",
    city: "Chicago",
    state: "IL",
    zip: "60601"    
  });
  const addressOhioPlace = await Address.create({
    line_1:"360 W Ohio St",
    city: "Chicago",
    state: "IL",
    zip: "60654"    
  });
  // Creating example parks
  const Park1 = await Park.create({
    name: "Lakeshore East Dog Park",
  });
  const Park2 = await Park.create({
    name: "Ohio Place Dog Park",
  });
  // Setting address of example parks
  Park1.setAddress(addressLEDP);
  await Park1.save();
  Park2.setAddress(addressOhioPlace);
  await Park2.save();

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const user1 = await User.create({email: 'user1@email.com', password:'user1'});
  const user2 = await User.create({email: 'user2@email.com', password:'user2'});
  const user3 = await User.create({email: 'user3@email.com', password:'user3'});
  const startTime = new Date(2018, 4, 2, 16, 0);
  const endTime = new Date(2018, 4, 2, 20, 0);
  console.log("Park: ", Park);
  // Adding Users to Park through "visits" MtM relationship 
  await Park1.addUsers([user1, user2], {through: {
    start: startTime,
    end: endTime,
  }})
  await Park1.save();
  // Adding Parks to Users through "visits" MtM relationship 
  await user3.addParks([Park1, Park2], {through: {
    start: startTime,
    end: endTime,
  }})
  await user3.save();
  // Adding a single park to a user through a "visit"
  await user2.addParks(Park2, {through: {
    start: startTime,
    end: endTime,
  }})
  await user2.save();
  
 
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
