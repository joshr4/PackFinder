const router = require('express').Router()
const {User, Address, Park, Visit, Message} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Message.findAll({
      include:[{all:true}],
      order: [['sent', 'DESC']]
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

router.post('/', (req, res, next) => {
    Message.create(req.body).then((message) => res.json(message));
})
// 