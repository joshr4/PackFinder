const faker = require('faker');

// const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');
const db = require('../../server/db');
const { Address, Park } = require('../../server/db/models');

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}
// build a park
// setAddress

const parks = [
  {
    name: 'Anderson Dog Friendly Areas',
    line1: '1611 S. Wabash Avenue',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60601',
  },
  {
    name: 'Bartelme Dog Friendly Area',
    line1: '115 S. Sangamon',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60607',
  },
  {
    name: 'Belmont Harbor Beach DFA',
    line1: 'Belmont & Lake Shore Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60614',
  },
  {
    name: 'Bryn Mawr Dog Friendly Area - TEMPORARY',
    line1: 'Bryn Mawr & Lake Shore Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60614',
  },
  {
    name: 'Challenger Dog Friendly Area',
    line1: '1100 W. Irving Park Rd.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60613',
  },
  {
    name: 'Churchill Dog Friendly Area',
    line1: '1825 N. Damen Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60614',
  },
  {
    name: 'Clarendon Dog Friendly Area',
    line1: '4501 N. Marine Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60640',
  },
  {
    name: 'Coliseum Dog Friendly Area',
    line1: '1466 S. Wabash Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60605',
  },
  {
    name: 'Grant Dog Friendly Area',
    line1: '951 S. Columbus Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60601',
  },
  {
    name: 'Hamlin Dog Friendly Area',
    line1: '3035 N. Hoyne Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60618',
  },
  {
    name: 'Lake Shore East Dog Friendly Area',
    line1: '450 E. Benton Place',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60601',
  },
  {
    name: 'Montrose Beach DFA',
    line1: '601 West Montrose Avenue',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60613',
  },
  {
    name: 'Noethling Playlot Dog Friendly Area',
    line1: '2645 N. Sheffield Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60614',
  },
  {
    name: 'Norwood Dog Friendly Area',
    line1: '5899 N. Avondale',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60631',
  },
  {
    name: 'Park No. 551 Dog Friendly Area',
    line1: '353 N. DesPlaines St.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60611',
  },
  {
    name: 'Park No. 556 Dog Friendly Area',
    line1: '2529 W. Logan Blvd',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60647',
  },
  {
    name: 'Park No. 569 Dog Friendly Area',
    line1: '1358 W. Monroe',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60607',
  },
  {
    name: 'Portage Dog Friendly Area',
    line1: '4100 N. Long',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60641',
  },
  {
    name: 'Pottawattomie Dog Friendly Area',
    line1: '7340 N. Rogers Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60626',
  },
  {
    name: 'Puptown',
    line1: '4900 N Marine Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60640',
  },
  {
    name: 'River Dog Friendly Area',
    line1: '5100 N. Francisco Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60625',
  },
  {
    name: 'Walsh Dog Friendly Area',
    line1: '1722 N. Ashland Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60614',
  },
  {
    name: 'Ward Dog Friendly Area',
    line1: '630 N. Kingsbury St.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60606',
  },
  {
    name: 'Wicker Dog Friendly Area',
    line1: '1425 N. Damen Ave.',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60622',
  },
];

function createParks(addresses) {
  return Promise.all(
    addresses.map(async park => {
      const address = await Address.create({
        line1: park.line1,
        city: park.city,
        state: park.state,
        zipcode: park.zipcode,
      });
      return Park.create({
        name: park.name,
        rating: 5,
        description: faker.lorem.paragraph(),
        schedule: {},
        addressId: address.id,
      }).then(newPark => newPark);
    })
  );
}
// createParks(parks).then(data => console.log('this is it', data));
// console.log('FGGGGGGGGcreated addresses', createParks(parks));

async function seed() {
  console.log('Syncing parks');
  return createParks(parks);
}

module.exports = seed;
