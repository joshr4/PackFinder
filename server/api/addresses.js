const router = require('express').Router()
const {User, Address} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Address.findAll({
  })
    .then(addresses => res.json(addresses))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Address.findOne({
    where: {
      id: req.params.id,
  }
  })
    .then(addresses => res.json(addresses))
    .catch(next)
})
