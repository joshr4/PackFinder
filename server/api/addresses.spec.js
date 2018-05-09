/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Address = db.model('address')

describe('addresses routes', () => {
  const fakeAddress = [{
    id: 1,
    line_1: '2045 W Jackson Blvd',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60612',
  }, {
    id: 2,
    line_1: '401 E 32nd St',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60616',
  }];

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('with guest user', () => {
    beforeEach(() => {
      fakeAddress.map(address => {
        return Address.create(address)
      });
    })
    describe('GET /api/addresses', () => {
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
