const router = require('express').Router()
const {User, Pet, Address, Park, Visit} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
    console.log('post pet', req.body)
    console.log("req.user: ", req.user);
    req.body.userId = req.user.dataValues.id
    Pet.create(req.body).then(pet => {
        res.json(pet);
    })
})

router.get('/', (req, res, next) => {
  Pet.findAll({})
    .then(pets => res.json(pets))
})

router.delete('/:id', (req, res, next) => {
  Pet.findById(req.params.id).then(pet => {
      pet.destroy().then(() => {
          res.send(204);
      });
  })
})

router.put('/:id', (req, res, next) => {
    Pet.findById(req.params.id).then(pet => {
        pet.update(req.body).then(updated => {
            res.json(updated);
        })
    })
})
