const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/addresses', require('./addresses'))
router.use('/parks', require('./parks'))
router.use('/visits', require('./visits'))
router.use('/events', require('./events'))
router.use('/pets', require('./pets'))
router.use('/messages', require('./messages'))
router.use('/requests', require('./requests'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
