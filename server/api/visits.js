const router = require('express').Router()
const {User, Address, Park, Visit} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Visit.findAll({
      include:[
          {model: Park, required:false, include:[Address]},
          {model: User, required:false}
      ]
  })
    .then(visits => res.json(visits))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Visit.findOne({
    where: {
      id:req.params.id,
    },
    include:[
      {model: Park, required:false, include:[Address]},
      {model: User, required:false}
    ]}).then(visit => {
    visit.destroy().then(() => {
      res.send(200);
    })
  })
})

router.put('/:id/change-times', (req, res, next) => {
  Visit.findOne({
    where: {
      id: req.params.id
    },
    include:[
      {model: Park, required: false, include:[Address]},
      {model: User, required:false}
    ]
  }
  ).then(visit => {
    visit.update(req.body).then((updated) => {
      res.send(updated);
    })
  })

})


router.post('/', async (req, res, next) => {
  console.log("posting to visit: ", req.body);
  let relatedPark = await Park.findById(req.body.parkId);
  let relatedUser = await User.findById(req.body.userId);
  let newVisit = await Visit.create({
    start:req.body.start,
    end:req.body.end,
    parkId:req.body.parkId,
    userId:req.body.userId,
    title: req.body.title
  });
  // newVisit.setPark(relatedPark);
  // newVisit.setUser(relatedUser);
  // newVisit.title = relatedPark.name;
  // newVisit.setPark(relatedPark);
  // newVisit.setUser(relatedUser);
  await newVisit.save();
  res.json(newVisit);
  // Visit.findById(req.params.id).then(visit => {
  //   visit.update(req.body).then((updated) => {
  //     console.log('res voisit', updated)
  //     res.send(updated);
  //   })
  // })
})

