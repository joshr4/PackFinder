const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/addresses', require('./addresses'))
router.use('/parks', require('./parks'))
router.use('/visits', require('./visits'))
router.use('/pets', require('./pets'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
