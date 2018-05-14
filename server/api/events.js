const router = require('express').Router()
const {User, Address, Park, Visit, Event} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Event.findAll({
      include:[
        { all: true },
        //   {model: Park, required:false, include:[Address]},
        //   {model: User, required:false}
      ]
  })
    .then(events => res.json(events))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  let relatedPark = await Park.findById(req.body.parkId);
  let creatorUser = await User.findById(req.body.userId);
  let newEvent = await Event.create({
    start:req.body.start,
    end:req.body.end,
    description: req.body.description
  });
  await newEvent.setCreator(creatorUser);
  await newEvent.setPark(relatedPark);
  await newEvent.save();
  res.json(newEvent);
})

router.get('/:id', (req, res, next) => {
  Event.findOne({
    where:{id:req.params.id},
    include:[{all:true}]
  }).then(event => {
    res.json(event);
  })
})

router.delete('/:id', (req, res, next) => {
  Event.findOne({
    where: {
      id:req.params.id,
    },
    include:[
    //   {model: Park, required:false, include:[Address]},
    //   {model: User, required:false}
    ]}).then(events => {
    events.destroy().then(() => {
      res.send(200);
    })
  })
})

router.put('/:id', (req, res, next) => {
  Event.findOne({
    where: {
      id: req.params.id
    },
    include:[
    //   {model: Park, required: false, include:[Address]},
    //   {model: User, required:false}
    { all: true }
    ]
  }
  ).then(events => {
    console.log('req.body', req.body)
    events.update(req.body).then((updated) => {
      res.send(updated);
    })
  })
})

router.put('/:id/invite', async (req, res, next) => {
  let event = await Event.findOne({
    where: {
      id:req.params.id,
    }
  });
  await event.addAttendees(req.body.userIds);
  res.json(event);
})

router.post('/add-user', async (req, res, next) => {
  let relatedPark = await Park.findById(req.body.parkId);
  let addUser = await User.findById(req.body.userId);
  await relatedPark.addAttendee(addUser);
  res.json(relatedPark);


})
