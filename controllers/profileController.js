const User = require('../models/user')
const multer = require('multer')
const sharp = require('sharp')

module.exports.view = function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log('Error in finding user',err)
            return
        }
        return res.render('Profile/userProfile',{title:`Profile |  ${user.username}`,profileUser:user})
    })
}

module.exports.edit = function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log('Error in finding user',err)
            return
        }
        return res.render('Profile/editProfile',{title:`Edit Profile | ${user.username}`,profileUser:user})
    })
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