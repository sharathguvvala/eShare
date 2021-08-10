const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('../models/user')

const usersController = require('../controllers/usersController')

passport.use(new LocalStrategy({
    usernameField: 'email',passReqToCallback:true},
    function(req,email,password,done){
        User.findOne({email:email},async function(err,user){
            if(err){
                console.log('Error in finding user')
                return done(err)
            }
            if(!user || (await (bcrypt.compare(password,user.password))==false)){
                return done(null,false,req.flash('error','Invalid Email-id / Password entered'))
            } 
            if(user.confirmed==false){
                return done(null,false,req.flash('error','Verify your Email-Id to Sign In')) 
            }  
            console.log('Successfully logged In')
            return done(null,user)
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