const express = require('express')
const router = express.Router()
const passport = require('passport')

const profileController = require('../controllers/profileController')

router.get('/view/:id',passport.checkAuth,profileController.view)
router.get('/edit/:id',passport.checkAuth,profileController.edit)
router.post('/editprofile',passport.checkAuth,(profileController.upload).single('profileimg'),profileController.editprofile)

module.exports = router