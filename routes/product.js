const express = require('express')
const router = express.Router()
const passport = require('passport')

const productController = require('../controllers/productController')
const profileController = require('../controllers/profileController')

router.post('/add',passport.checkAuth,(profileController.upload).single('productImg'),productController.add)

module.exports = router