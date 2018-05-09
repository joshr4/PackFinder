const router = require('express').Router()
const {User, Park, Visit, Address, Request} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email'],
    include: [
      { all: true },
    ],
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findOne({
    where:{id:req.params.id}, 
    include:[{all:true}]
  }
).then(user => {
    res.json(user);
  })
})

router.get('/:id/friends', (req, res, next) => {
  User.findOne({
    where:{id:req.params.id}, 
    include:[{all:true}]
  }
).then(user => {
    res.json(user.friends);
  })
})

router.get('/:id/sent-requests', async (req, res, next) => {
  let user = await User.findById(req.params.id);
  let requestees = await user.getRequestees();
  res.json(requestees);
})

router.get('/:id/received-requests', async (req, res, next) => {
  let user = await User.findById(req.params.id);
  let requesters = await user.getRequesters();
  res.json(requesters);
})

router.post('/:id/friend-request', async (req, res, next) => {
  let friendId = req.body.friendId;
  let user = await User.findById(req.params.id);
  let friendIduser = await User.findById(friendId);
  let reverseRequest = await user.getRequesters({
    where:{
        id:friendId
    }
  });
  if (reverseRequest.length > 0) {
      await user.removeRequester(friendIduser);
      await friendIduser.removeRequestee(user);
      // existingRequests[0].destroy();                
      await user.addFriend(friendIduser);
      await friendIduser.addFriend(user);
  }
  else {
      await user.addRequestee(friendIduser);
      await friendIduser.addRequester(user);
  }            
  res.json(friendIduser);
})

router.get('/:id/has-request/:friendId', async (req, res, next) => {
  let user = await User.findById(req.params.id);
  let friendId = req.params.friendId;
  let friendIduser = await User.findById(friendId);
  let requestees = await user.getRequestees({where:{id:friendId}});
  let requesters = await user.getRequesters({where:{id:friendId}});
  res.json((requestees.length > 0 || requesters.length > 0));
})

router.put('/:id/cancel-request', async (req, res, next) => {
  let user = await User.findById(req.params.id);
  let friendId = req.body.friendId;
  let friendIduser = await User.findById(friendId);
  await user.removeRequestee(friendIduser);
  await friendIduser.removeRequester(user);
  res.json(user);
})

router.put('/:id/unfriend', async (req, res, next) => {
  let user = await User.findById(req.params.id);
  let friendId = req.body.friendId;
  let friendIduser = await User.findById(friendId);
  await user.removeFriend(friendIduser);
  await friendIduser.removeFriend(user);
  res.json(user);
})