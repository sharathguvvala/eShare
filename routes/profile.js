const express = require('express')
const router = express.Router()
const passport = require('passport')
const csrf = require('csurf')
const csrfProtection = csrf()

const profileController = require('../controllers/profileController')

router.get('/:username',passport.checkAuth,profileController.view)
router.get('/edit/:username',passport.checkAuth,profileController.edit)
router.post('/editprofile',passport.checkAuth,(profileController.upload).single('profileimg'),profileController.editprofile)
router.get('/settings/:username',passport.checkAuth,profileController.settings)
router.get('/deleteaccount/:username',passport.checkAuth,csrfProtection,profileController.deleteaccount)
router.post('/deleteaccountform',passport.checkAuth,profileController.deleteaccountform)

module.exports = router