const express = require('express')
const router = express.Router()
const passport = require('passport')

const usersController = require('../controllers/usersController')

router.get('/signup', usersController.SignUp)
router.get('/signin', usersController.SignIn)
router.get('/profile', passport.checkAuth, usersController.profile)

router.post('/create', usersController.create)
router.post('/create-session',passport.authenticate('local',{failureFlash:true,failureRedirect:'/users/signin'}),usersController.createSession)
router.get('/signout', usersController.Signout)

router.get('/verify/:token',usersController.verify)
router.get('/forgotpassword',usersController.forgotpassword)
router.post('/forgotpasswordform',usersController.forgotpasswordform)
router.get('/resetpassword/:token',usersController.resetpassword)
router.post('/resetpasswordform',usersController.resetpasswordform) 

module.exports = router