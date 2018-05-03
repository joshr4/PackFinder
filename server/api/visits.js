const router = require('express').Router()
const {User, Address, Park, Visit} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Visit.findAll({
      include:[
          {model: Park, required:false}
      ]
  })
    .then(visits => res.json(visits))
    .catch(next)
})
