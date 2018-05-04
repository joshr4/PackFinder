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

router.delete('/:id', (req, res, next) => {
  Visit.findById(req.params.id).then(visit => {
    visit.destroy().then(() => {
      res.send(200);
    })
  })
})

router.put('/:id/change-times', (req, res, next) => {
  console.log("change-times req.body: ", req.body);
  Visit.findById(req.params.id).then(visit => {
    visit.update(req.body).then((updated) => {
      console.log('res voisit', updated)
      res.send(updated);
    })
  })

})

