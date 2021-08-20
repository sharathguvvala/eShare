const User = require('../models/user')
const multer = require('multer')
const sharp = require('sharp')
const bcrypt = require('bcrypt')

module.exports.view = function(req,res){
    return res.render('Profile/userProfile',{title:`Profile`})
}

module.exports.edit = function(req,res){
    return res.render('Profile/editProfile',{title:`Edit Profile`})
}

module.exports.upload = multer({
    limits:{
        fileSize:16000000
    },
    fileFilter(req,file,cb){
        if(!(file.originalname.match(/(.png|.jpg|.jpeg)/))){
            /* return req.flash('info','Supported image format is png/jpg/jpeg') */
            cb(new Error('Supported image format is png/jpg/jpeg'))
        }
        cb(null,true)
    }
})

module.exports.editprofile = async function(req,res){
    const buffer = await sharp(req.file.buffer).resize({width:200,height:200}).png().toBuffer()
    console.log(buffer)
    User.findOne({username:req.body.username},function(err,user){
        if(err){
            console.log('Error in finding user',err)
            return
        }
        user.about = req.body.about
        user.profileimg = buffer
        user.save()
        req.flash('info','Your Profile was successfully updated!!!')
        return res.redirect('/')
    })
}

module.exports.settings = function(req,res){
    return res.render('Profile/userSettings',{title:`Profile`})
}

module.exports.deleteaccount = function(req,res){
    return res.render('Profile/deleteAccount',{title:'Delete Account',csrfToken:req.csrfToken()})
}

module.exports.deleteaccountform = function(req,res){
    User.findOne({email:req.body.email},async function(err,user){
        if(err){
            console.log('Error in finding user',err)
            return
        }
        if((await bcrypt.compare(req.body.password,user.password))==false){
            req.flash('error','Incorrect Password is entered')
            return res.redirect('/profile/deleteaccount')
        }
        await User.findOneAndDelete({email:req.body.email})
        req.flash('info','Your account is deactivated')
        return res.redirect('/users/signin')
    })
}