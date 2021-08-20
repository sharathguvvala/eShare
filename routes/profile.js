const express = require('express')
const router = express.Router()
const passport = require('passport')
const csrf = require('csurf')
const csrfProtection = csrf()

const profileController = require('../controllers/profileController')

router.get('/view',passport.checkAuth,profileController.view)
router.get('/edit',passport.checkAuth,profileController.edit)
router.post('/editprofile',passport.checkAuth,(profileController.upload).single('profileimg'),profileController.editprofile)
router.get('/settings',passport.checkAuth,profileController.settings)
router.get('/deleteaccount',passport.checkAuth,csrfProtection,profileController.deleteaccount)
router.post('/deleteaccountform',passport.checkAuth,profileController.deleteaccountform)

module.exports = router