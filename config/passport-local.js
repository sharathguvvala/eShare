const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('../models/user')
passport.use(new LocalStrategy({
    usernameField: 'email'},
    async function(email,password,done){
        await User.findOne({email:email}, function(err,user){
            if(err){
                console.log('Error in finding user')
                return done(err)
            }
            if(bcrypt.compare(password,user.password)){
                console.log('Successfully logged In')
                done(null,user)
            }
        })
    }
))

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user')
            return done(err)
        }
        return done(null,user)
    })
})

passport.checkAuth = function(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/users/signin')
}
passport.setAuthUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

module.exports = passport