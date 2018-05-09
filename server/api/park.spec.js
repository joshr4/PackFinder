/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Address = db.model('address')
const Park = db.model('park')

describe('park routes', () => {
  const fakeAddress = [{
    id: 1,
    name: 'Norwood Dog Friendly Area',
    line_1: '2045 W Jackson Blvd',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60612',
  }, {
    id: 2,
    name: 'Grant Dog Friendly Area',
    line_1: '401 E 32nd St',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60616',
  }];

  // const fakePark = [{
  //   id: 1,
  //   name: 'Norwood Dog Friendly Area',
  //   rating: '5',
  //   description: 'this is a long long long long long long long long long long long long longdescription',
  //   addressId: 1,
  // }, {
  //   id: 2,
  //   name: 'Grant Dog Friendly Area',
  //   rating: '5',
  //   description: 'This is a description',
  //   addressId: 2,
  // }];

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('with guest user', () => {

    beforeEach(() => {
      fakeAddress.map(park => {

        const address = Address.create({
          line_1: park.line_1,
          city: park.city,
          state: park.state,
          zipcode: park.zipcode,
        });

        return Park.create({
          name: park.name,
          rating: 5,
          description: 'This is a description',
          schedule: {},
          addressId: address.id,
        }).then(newPark => newPark);
      });

    })

    describe('GET /api/parks', () => {
      it('returns all addresses', () => {
        return request(app)
          .get('/api/addresses')
          .expect(200)
          .then(res => {
            expect(res.body[0].id).to.be.equal(1)
            expect(res.body[0].line_1).to.be.equal('2045 W Jackson Blvd')
            expect(res.body[0].city).to.be.equal('Chicago')
            expect(res.body[0].state).to.be.equal('IL')
            expect(res.body[0].zipcode).to.be.equal('60612')

            expect(res.body[1].id).to.be.equal(2)
            expect(res.body[1].line_1).to.be.equal('401 E 32nd St')
            expect(res.body[1].city).to.be.equal('Chicago')
            expect(res.body[1].state).to.be.equal('IL')
            expect(res.body[1].zipcode).to.be.equal('60616')

          })
      })
    })

  });
});
