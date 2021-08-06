const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

module.exports.SignUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('userSignUp', {title: "Sign Up",signupmessage:req.flash('signup error'),usernamemessage:req.flash('username error'),passwordmessage:req.flash('password error')})
}

module.exports.SignIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('userSignIn', {title:'Sign In',signupmessage:req.flash('signup success'),signinmessage:req.flash('signin error')})
}

module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        req.flash('password error','Password and Confirm Password should be same')
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},async function(err,user){
        if(err){
            console.log('Error in finding user in db');
            return 
        }
        if(!user){
            username = req.body.username
            email = req.body.email
            phone = req.body.phone
            password = req.body.password
            await User.find({username:username},function(err,user){
                if(err){
                    console.log('Error in finding user')
                }
                if(user){
                    req.flash('username error','Sorry, the username is already taken')
                    return res.redirect('back')
                }
            })
            const salt = await bcrypt.genSalt()
            password = await bcrypt.hash(password, salt)
            await User.create({username,email,phone,password},function(err,user){
                if(err){
                    console.log('Error in creating user in db');
                    return
                }
                req.flash('signup success','You have successfully signed up')
                return res.redirect('/users/signin')
            })
        }
        else{
            req.flash('signup error','User with the email-id already exists')
            return res.redirect('/users/signup')
        }
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