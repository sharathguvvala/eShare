const express = require('express')
const router = express.Router()
const passport = require('passport')

const profileController = require('../controllers/profileController')

router.get('/view/:id',passport.setAuthUser,profileController.view)

module.exports = router