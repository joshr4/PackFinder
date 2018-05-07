const router = require('express').Router()
const {User, Address, Park, Visit} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Park.findAll({
      include:[
          {model: Visit, required:false, 
            include:[{model:User}]},
            // {model:User, required:false},
        //   {model: Visit, required:false},
          {model: Address, required:false},
      ]
  })
    .then(parks => res.json(parks))
    .catch(next)
})


router.get('/:id', (req, res, next) => {
    Park.findOne({
        where: {
            id:req.params.id,
        },
        include:[
            {model: User, required:false},
          //   {model: Visit, required:false},
            {model: Address, required:false},
        ]        
    }).then((park) => {res.json(park)});
  })
  