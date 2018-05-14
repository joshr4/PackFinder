const router = require('express').Router()
const {
  User,
  Address,
  Park,
  Visit,
  Event,
  Pet
} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Event.findAll({
      include: [{
          all: true,
          //include:[{all: true}]
        },
        {model: Park, required: false, include: [
          {
            model: Address,
            required: false,
          }
        ]},
        {model: User, as: 'attendees', required: false, include:[
          {
            model: Pet,
            as: 'pets',
            required: false,
          }
        ]},
          // {model: User, required:false}
      ]
    })
    .then(events => res.json(events))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  let relatedPark = await Park.findById(req.body.parkId);
  let creatorUser = await User.findById(req.body.creatorId);
  let newEvent = await Event.create({
    start: req.body.start,
    end: req.body.end,
    description: req.body.description
  });
  await newEvent.setCreator(creatorUser);
  await newEvent.setPark(relatedPark);
  await newEvent.save();
  res.json(newEvent);
})

router.get('/:id', (req, res, next) => {
  Event.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      all: true
    }]
  }).then(event => {
    res.json(event);
  })
})

router.delete('/:id', (req, res, next) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      //   {model: Park, required:false, include:[Address]},
      //   {model: User, required:false}
    ]
  }).then(events => {
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
    include: [
      {
        all: true
      },
      {model: Park, required: false, include: [
        {
          model: Address,
          required: false,
        }
      ]},
    ]
  }).then(events => {
    events.update(req.body).then((updated) => {
      res.send(updated);
    })
  })
})

router.put('/:id/invite-users', async (req, res, next) => {
  let event = await Event.findOne({
    where: {
      id: req.params.id,
    }
  });
  await event.addInvitees(req.body.userIds);
  for (let i = 0; i < req.body.userIds.length; i ++) {
    let id = req.body.userIds[i];
    user = await User.findById(id);
    user.addAttendingEvent(event);    
  }
  res.json(event);
})

router.put('/:id/remove-invite', async(req, res, next) => {
  let event = await Event.findOne({
    where: {
      id:req.params.id,
    }
  });
  let user = await User.findById(req.body.userId);
  await event.removeInvitee(req.body.userId);
  await user.removeInvitedEvent(event);
  res.json(event);
});

router.put('/:id/add-attendee', async(req, res, next) => {
  let event = await Event.findOne({
    where: {
      id:req.params.id,
    }
  });
  let user = await User.findById(req.body.userId);
  await event.addAttendee(req.body.userId);
  await user.addAttendingEvent(event);
  res.json(event);
});

router.put('/:id/remove-attendee', async(req, res, next) => {
  let event = await Event.findOne({
    where: {
      id:req.params.id,
    }
  });
  await event.removeAttendee(req.body.userId);
  await user.removeAttendingEvent(event);
  res.json(event);
});
