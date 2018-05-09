const router = require('express').Router()
const {User, Park, Visit, Address, Pet} = require('../db/models')
const geolib = require('geolib');
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email'],
    include:[
      {model: Park, required:false, as:'favorites'},
      {model: User, required:false, as:'friends'},
      {model: Visit, required:false,
      include:[{
        model:Park,
        required:false,
        include:[{model:Address}]
      }]},
      // {model: Address, required:false},
    ]
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/simple', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!

    attributes: ['id', 'email', 'imageUrl'], // add name latter
    include: [
      {model: Address, required: true},
      {model: Pet, required: false, as: 'pets'},
    ]
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:latitude/:longitude/:distance', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email', 'imageUrl'], // add name latter
    include: [
      {model: Address, required: true},
      {model: Pet, required: false, as: 'pets'},
    ]
  })
    .then(users => {
      const filteredUsers = users.filter(user =>
        geolib.isPointInCircle(
          {latitude: user.address.location.lat, longitude: user.address.location.lng},
          {latitude: req.params.latitude, longitude: req.params.longitude},
          req.params.distance)
      );

      filteredUsers.forEach(user => {
        user.address.location.distance = geolib.convertUnit('km', geolib.getDistanceSimple(
          {latitude: user.address.location.lat, longitude: user.address.location.lng},
          {latitude: req.params.latitude, longitude: req.params.longitude}), 2)
      })

      let sortedUsers = filteredUsers.sort((a, b) => {
        var a = (a.address.location.distance)
        var b = (b.address.location.distance)

        return a - b;
      })


      res.json(sortedUsers.slice(0, 21))})
    .catch(next)
})
