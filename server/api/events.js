const router = require('express').Router()
const {
  User,
  Address,
  Park,
  Visit,
  Event,
  Pet
} = require('../db/models')
const geolib = require('geolib');
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
  await newEvent.addAttendee(creatorUser);
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
    },
    include: [
    {
      all:true,
    },
    {
      model: Park, required: false,
      include: [
        {
          model: Address,
          required: false,
        }
      ]
    },
  ]
  });
  await event.addInvitees(req.body.userIds);
  for (let i = 0; i < req.body.userIds.length; i ++) {
    let id = req.body.userIds[i];
    user = await User.findById(id);
    await user.addInvitedEvent(event);
  }
  res.json(event);
})

router.get('/:id/uninvited', async (req, res, next) => {
  let event = await Event.findOne({
    where: {
      id: req.params.id,
    },
    include: [{all:true}, {model: Park, required: false, include: [{model: Address,required: false}]}]
  });
  let user = await User.findById(req.body.userId);
  let userFriends = await user.getFriends();
  let uninvitedFriends = [];
  for (let i = 0; i < userFriends.length; i++) {
    let friend = userFriends[i];
    let isInvitee = await event.hasInvitee(friend);
    let isAttendee = await event.hasAttendee(friend);
    if (!isInvitee && isAttendee) {
      uninvitedFriends.push(friend);
    }
  }
  res.json(uninvitedFriends);
})

router.get('/:id/uninvited/:friendId', async (req, res, next) => {
  let event = await Event.findOne({
    where: {
      id: req.params.id,
    },
    include: [{all:true}, {model: Park, required: false, include: [{model: Address,required: false}]}]
  });
  let user = await User.findById(req.params.friendId);
  let userFriends = await user.getFriends();
  let uninvitedFriends = [];
  for (let i = 0; i < userFriends.length; i++) {
    let friend = userFriends[i];
    let isInvitee = await event.hasInvitee(friend);
    let isAttendee = await event.hasAttendee(friend);
    if (!isInvitee && !isAttendee) {
      uninvitedFriends.push(friend);
    }
  }
  event.uninvitedFriends = uninvitedFriends;
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
      id: req.params.id,
    },
  });
  let user = await User.findById(req.body.userId);
  await event.addAttendee(req.body.userId);
  await user.addAttendingEvent(event);
  await event.removeInvitee(req.body.userId);
  await user.removeInvitedEvent(event);
  let updatedEvent = await Event.findOne({
    where:{
      id:req.params.id
    },
    include:[
      {all:true},
    ]
  })
  //console.log('updated',event)///////////event doesnt have the new attendee on it for some reason
  res.json(updatedEvent);
});

router.put('/:id/remove-attendee', async(req, res, next) => {
  let event = await Event.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        all: true
      }
    ]
  });
  let user = await User.findById(req.body.userId);
  await event.removeAttendee(req.body.userId);
  await user.removeAttendingEvent(event);/////////error, cannot find this method
  let updatedEvent = await Event.findOne({
    where:{
      id:req.params.id
    },
    include:[
      {all:true},
    ]
  })
  res.json(updatedEvent);
});


router.get('/:latitude/:longitude/:distance', (req, res, next) => {
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
        {model: User, as: 'attendees', required: false, include: [
          {
            model: Pet,
            as: 'pets',
            required: false,
          }
        ]},
          // {model: User, required:false}
      ]
    })
    .then(events => {
      const filteredEvents = events.filter(event =>

        geolib.isPointInCircle(
          {latitude: event.park.address.location.lat,
          longitude: event.park.address.location.lng},
          {latitude: req.params.latitude,
          longitude: req.params.longitude},
          req.params.distance)
      )

      filteredEvents.forEach(event => {
        event.park.address.location.distance = geolib.convertUnit('mi',
        geolib.getDistanceSimple({
          latitude: event.park.address.location.lat,
          longitude: event.park.address.location.lng},
          {latitude: req.params.latitude,
            longitude: req.params.longitude})
            , 2)
      })

      let sortedEvents = filteredEvents.sort((a, b) => {
        var a = (a.park.address.location.distance)
        var b = (b.park.address.location.distance)

        return a - b;
      })

      sortedEvents.forEach(event => {
      })

      res.json(sortedEvents.slice(0, 20))})
    .catch(next)
})
