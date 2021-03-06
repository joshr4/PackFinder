const router = require('express').Router()
const {
  User,
  Park,
  Visit,
  Address,
  Pet,
  Request
} = require('../db/models')
const geolib = require('geolib');
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!

      attributes: ['id', 'email', 'fullName', 'firstName', 'lastName', 'imageUrl'],
      include: [{
        all: true
      }],
    })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/simple/:id', (req, res, next) => {
  User.findOne({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!


      attributes: ['id', 'fullName', 'firstName', 'lastName', 'email', 'imageUrl', 'description'],
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Pet,
          required: false,
          as: 'pets'
        },
      ]
    })
    .then(user => res.json(user))
    .catch(next)
})

router.get('/search/:name', (req, res, next) => {
  const names = req.params.name.split('+')
  names.forEach((name, index, arr) => {
    arr[index] =  name + '%'
  })

  User.findAll({
    attributes: ['id', 'fullName', 'firstName', 'lastName', 'email', 'imageUrl', 'description'],
    where: {
        $or: [
      {
        firstName: {
          $ilike: names[0]
        }
      },
      {
        lastName: {
          $ilike: names[names.length - 1]
        }
      }
        ]
    },
    include: [
      {
        model: Pet,
        required: false,
        as: 'pets'
      },
    ]
  })

  .then(user => res.json(user))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [{
        all: true
      },
      // {
      //   model: User,
      //   as: 'Requesters',
      //   required: false,
      //   include: [{model:Pets, required:false}]
      // }
    ]
  }).then(user => {
    res.json(user);
  })
})

router.get('/:id/friends', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: User,
      as: 'Friends',
      required: false,
      include: [{
        all: true
      }]
    }]
  }).then(user => {
    res.json(user.Friends);
  })
})
router.get('/:id/received-requests', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: User,
      as: 'Requesters',
      required: false,
      include: [{
        all: true
        // model: Pet,
        // required: false
      }]
    }]
  }).then(user => {
    res.json(user.Requesters);
  })
})

router.get('/:id/sent-requests', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: User,
      as: 'Requestees',
      required: false,
      include: [{
        all: true
        // model: Pet,
        // required: false
      }]
    }]
  }).then(user => {
    res.json(user.Requestees);
  })
})


// router.get('/:id/sent-requests', async (req, res, next) => {
//   console.log('Got to the sent-requests')
//   let user = await User.findById(req.params.id);
//   let requestees = await user.getRequestees();
//   res.json(requestees);
// })

// router.get('/:id/received-requests', async (req, res, next) => {
//   console.log('inside receive reqs')
//   let user = await User.findById(req.params.id);
//   let requesters = await user.getRequesters();
//   res.json(requesters);
// })

router.put('/:id/approve-request', async (req, res, next) => {
  // console.log('input backend', req.body)
  let user = await User.findById(req.params.id);
  let friendId = req.body.friendId;
  let friendIduser = await User.findById(friendId, {
    include: [{
      model: Pet,
      as: 'pets',
      // include: [{
      //   all: true
      // }]
    }]
  });
  await user.removeRequester(friendIduser);
  await friendIduser.removeRequestee(user);
  await user.addFriend(friendIduser);
  await friendIduser.addFriend(user);
  res.json(friendIduser);
})

router.post('/:id/friend-request', async (req, res, next) => {
  let friendId = req.body.friendId;
  let user = await User.findById(req.params.id);
  let friendIduser = await User.findById(friendId, {
    include: [{
      model: Pet,
      as: 'pets'
    }]
  });
  let reverseRequest = await user.getRequesters({
    where: {
      id: friendId
    }
  });
  if (reverseRequest.length > 0) {
    await user.removeRequester(friendIduser);
    await friendIduser.removeRequestee(user);
    // existingRequests[0].destroy();
    await user.addFriend(friendIduser);
    await friendIduser.addFriend(user);
  } else {
    await user.addRequestee(friendIduser);
    await friendIduser.addRequester(user);
  }
  res.json(friendIduser);
})

router.put('/:id/friend-request/delete', async (req, res, next) => {
  let friendId = req.body.friendId;
  let user = await User.findById(req.params.id);
  let friendIduser = await User.findById(friendId);
  let reverseRequest = await user.getRequesters({
    where: {
      id: friendId
    }
  });
  await user.removeFriend(friendIduser);
  await friendIduser.removeFriend(user);
  res.json(friendIduser);
})

router.get('/:id/has-request/:friendId', async (req, res, next) => {
  let user = await User.findById(req.params.id);
  let friendId = req.params.friendId;
  let friendIduser = await User.findById(friendId);
  let requestees = await user.getRequestees({
    where: {
      id: friendId
    }
  });
  let requesters = await user.getRequesters({
    where: {
      id: friendId
    }
  });
  res.json((requestees.length > 0 || requesters.length > 0));
})

router.get('/:id/sent-request/:friendId', async (req, res, next) => {
  let user = await User.findById(req.params.id);
  let friendId = req.params.friendId;
  let friendIduser = await User.findById(friendId);
  let requestees = await user.getRequestees({
    where: {
      id: friendId
    }
  });
  res.json((requestees.length > 0));
})

router.get('/:id/received-request/:friendId', async (req, res, next) => {
  let user = await User.findById(req.params.id);
  let friendId = req.params.friendId;
  let friendIduser = await User.findById(friendId);
  let requesters = await user.getRequesters({
    where: {
      id: friendId
    }
  });
  res.json((requesters.length > 0 || requesters.length > 0));
})


router.put('/:id/cancel-request', async (req, res, next) => {
  let user = await User.findById(req.params.id);
  let friendId = req.body.friendId;
  let friendIduser = await User.findById(friendId);
  await user.removeRequestee(friendIduser);
  await friendIduser.removeRequester(user);
  res.json(friendIduser);
})

router.put('/:id/unfriend', async (req, res, next) => {
  let user = await User.findById(req.params.id);
  let friendId = req.body.friendId;
  let friendIduser = await User.findById(friendId);
  await user.removeFriend(friendIduser);
  await friendIduser.removeFriend(user);
  res.json(user);
})


router.put('/:id/updateUser', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Address,
      required: false
    }]
  }).then(user => {
    user.update(req.body).then((updated) => {
      res.send(updated);
    })
  })
})

router.put('/:id/updateAddress', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Address,
      required: false
    }]
  }).then(async user => {
    if (user.address) {
      user.address.updateAttributes(req.body.address).then((updated) => {
        res.send(updated)
      })
    } else {

      const newAddress = await Address.create(req.body.address)

      user.setAddress(newAddress)
      // .then(async address => {
      //   // console.log('address created', address)
      //   await user.setAddress(address)
      //   // console.log('updatedAddres', updatedAddress)
      //   // let updatedUser = await user.update()
      //   // console.log('user address set', user)
      //   // .then(updatedUser => res.send(updatedUser))
      //   // res.send(user)
      //   return user
      // })
      // .then(updated => {
      // // .then(updatedUser => res.send(updatedUser))
      // //If I res.send(user) the addressId doesnt save, but if I dont it does

      res.send(newAddress)
      // })
    }

  })
})

router.get('/:latitude/:longitude/:distance', (req, res, next) => {
  User.findAll({
      attributes: ['id', 'email', 'imageUrl', 'firstName', 'lastName'],
      include: [{
          model: Address,
          required: true
        },
        {
          model: Pet,
          required: false,
          as: 'pets'
        },
      ]
    })
    .then(users => { //Filter out users out of range
      const filteredUsers = users.filter(user =>
        geolib.isPointInCircle({
            latitude: user.address.location.lat,
            longitude: user.address.location.lng
          }, {
            latitude: req.params.latitude,
            longitude: req.params.longitude
          },
          req.params.distance)
      );

      filteredUsers.forEach(user => { //add calculated distance to each user
        user.address.location.distance = geolib.convertUnit('mi', geolib.getDistanceSimple({
          latitude: user.address.location.lat,
          longitude: user.address.location.lng
        }, {
          latitude: req.params.latitude,
          longitude: req.params.longitude
        }), 2)
      })

      let sortedUsers = filteredUsers.sort((a, b) => { //sort from nearest to furthest
        var a = (a.address.location.distance)
        var b = (b.address.location.distance)

        return a - b;
      })


      res.json(sortedUsers.slice(0, 21))
    })
    .catch(next)
})
