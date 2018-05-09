const router = require('express').Router()
const {User, Address, Park, Visit, Event, Message, Request} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Request.findAll({
      include:[
      ]
  })
    .then(requests => res.json(requests))
    .catch(next)
})

router.get('/approved', (req, res, next) => {
    Request.findAll({
        where:{approved:true}
  })
    .then(requests => res.json(requests))
    .catch(next)
})
