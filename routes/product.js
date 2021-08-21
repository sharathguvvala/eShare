const express = require('express')
const router = express.Router()
const passport = require('passport')
const middleware = require('../config/middleware')

const productController = require('../controllers/productController')

router.post('/add',passport.checkAuth,(middleware.upload).single('productImg'),productController.add)

module.exports = router