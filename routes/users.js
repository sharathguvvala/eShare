const express = require('express')
const router = express.Router()
const passport = require('passport')
const csrf = require('csurf')
const csrfProtection = csrf()

const usersController = require('../controllers/usersController')

router.get('/signup',csrfProtection,usersController.SignUp)
router.get('/signin',csrfProtection,usersController.SignIn)

router.post('/create',usersController.create)
router.post('/create-session',passport.authenticate('local',{failureFlash:true,failureRedirect:'/users/signin'}),usersController.createSession)
router.get('/signout',usersController.Signout)

router.get('/verify/:token',usersController.verify)
router.get('/resendverify',csrfProtection,usersController.resendverify)
router.post('/resendverifytoken',usersController.resendverifytoken)
router.get('/forgotpassword',csrfProtection,usersController.forgotpassword)
router.post('/forgotpasswordform',usersController.forgotpasswordform)
router.get('/resetpassword/:token',csrfProtection,usersController.resetpassword)
router.post('/resetpasswordform',usersController.resetpasswordform) 

module.exports = router