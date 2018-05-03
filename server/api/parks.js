const router = require('express').Router()
const {User, Address, Park} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Park.findAll({
      include:[
          {model: User, required:false}
      ]
  })
    .then(parks => res.json(parks))
    .catch(next)
})
