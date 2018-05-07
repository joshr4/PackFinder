const router = require('express').Router()
const {User, Pet, Address, Park, Visit} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
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


