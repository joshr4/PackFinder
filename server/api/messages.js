const router = require('express').Router()
const {User, Address, Park, Visit, Message} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Message.findAll({
      include:[
      ]
  })
    .then(messages => res.json(messages))
    .catch(next)
})

router.get('/approved', (req, res, next) => {
    Message.findAll({
        where:{approved:true}
  })
    .then(messages => res.json(messages))
    .catch(next)
})
