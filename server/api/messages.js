const router = require('express').Router()
const {User, Address, Park, Visit, Message} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Message.findAll({
      include:[{all:true}],
      order: [['sent', 'DESC']]
  })
    .then(messages => res.json(messages))
    .catch(next)
})

router.get('/approved', (req, res, next) => {
    Message.findAll({
        where:{approved:true}
  })
    .then(messages => res.json(messages))
    .catch(next)
})

router.post('/', async (req, res, next) => {
    let newMessage = await Message.create(req.body);
    let resMessage = Message.findOne({
        where: {
            id:newMessage.id,
        },
        include: [{
            all: true
        }]              
    })
    .then(resMessage => {
        res.json(resMessage)
    } 
    );
})
// 