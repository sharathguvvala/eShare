const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController')

router.get('/',homeController.home)
router.use('/users', require('./users'))
router.use('/profile',require('./profile'))
router.use('/product',require('./product'))

module.exports = router