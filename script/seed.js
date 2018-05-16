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
const db = require('../server/db');
const {
  User,
  Pet,
  Park,
  Visit,
  Address,
  Event,
  Review,
} = require('../server/db/models');
const usersSeed = require('./seed/seed-users');
const parksSeed = require('./seed/seed-parks');
const petsSeed = require('./seed/seed-pets');
const visitsSeed = require('./seed/seed-visits');
const friendSeed = require('./seed/seed-friends');
const eventsSeed = require('./seed/seed-events');
const messagesSeed = require('./seed/seed-messages');

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  console.log('seeding user');
  await usersSeed();
  await parksSeed();
  await petsSeed();
  await visitsSeed();
  await friendSeed();
  await eventsSeed();
  await messagesSeed();
  // // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
