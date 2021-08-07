const User = require('../models/user')
const passport = require('passport')
const verifyUser = require('../mailers/verifyUser')

module.exports.SignUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('userSignUp', {title: "Sign Up"})
}

module.exports.SignIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('userSignIn', {title:'Sign In'})
}

module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        req.flash('error','Password and Confirm Password should be same')
        return res.redirect('back');
    }
    User.findOne({$or:[{email:req.body.email},{username:req.body.username}]},async function(err,user){
        if(err){
            console.log('Error in finding user in db');
            return 
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating user in db');
                    return
                }
                verifyUser.verifyUser(user)
                req.flash('success','You have successfully signed up')
                req.flash('info','Please verify your Email-Id to signin')
                return res.redirect('/users/signin')
            })
        }
        else{
            req.flash('error','Username / Email-Id already exists')
            return res.redirect('/users/signup')
        }
    })
}

module.exports.verify = function(req,res){
    console.log(req.params.id)
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log('Error in finding user',err)
            return
        }
        if(!user){
            return res.redirect('/users/signup')
        }
        user.confirmed=true
        user.save()
        return res.redirect('/users/signin')
    }) 
}

module.exports.createSession = function(req,res){
    return res.redirect('/')
}

module.exports.Signout = function(req,res){
    req.logout()
    return res.redirect('/')
}

module.exports.profile = function(req, res){
    return res.render('userProfile', {title: "Profile"})
}