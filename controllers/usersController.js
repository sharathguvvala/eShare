const User = require('../models/user')
const passport = require('passport')
const verifyUser = require('../mailers/verifyUser')
const resendverify = require('../mailers/resendVerify')
const verifyToken = require('../models/verifyTokens')
const randomstring = require('randomstring')
const forgotPassword = require('../models/forgotPassword')
const resetPassword = require('../mailers/resetPassword')

module.exports.SignUp = function(req,res){
    if(req.isAuthenticated()){
        req.flash('info','You have already Signed In')
        return res.redirect('/')
    }
    return res.render('userSignUp', {title: "Sign Up",csrfToken:req.csrfToken()})
}

module.exports.SignIn = function(req,res){
    if(req.isAuthenticated()){
        req.flash('info','You have already Signed In')
        return res.redirect('/')
    }
    return res.render('userSignIn', {title:'Sign In',csrfToken:req.csrfToken()})
}

module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        req.flash('error','Password and Confirm Password should be same')
        return res.redirect('back');
    }
    User.findOne({$or:[{email:req.body.email},{username:req.body.username}]},function(err,user){
        if(err){
            console.log('Error in finding user in db');
            return 
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('Error in creating user in db');
                    return
                }
                var randomtoken = randomstring.generate(32)
                console.log('Token:',randomtoken)
                verifyToken.create({email:req.body.email,token:randomtoken},function(err,token){
                    if(err){
                        console.log('Error in creating a token')
                        return
                    }
                    if(token){
                        verifyUser.verifyUser(user,token)
                        req.flash('info','Please verify your Email-Id to signin')
                        return res.redirect('/user/signin')
                    }
                })
            })
        }
        else{
            req.flash('error','Username / Email-Id already exists')
            return res.redirect('/user/signup')
        }
    })
}

module.exports.verify = function(req,res){
    console.log(req.params.token)
    verifyToken.findOne({token:req.params.token},function(err,token){
        if(err){
            console.log('Error in finding user',err)
            return
        }
        if(!token){
            ReadableStream.flash('info','Link has expired, kindly request again.')
            return res.redirect('/user/resendverify')
        }
        User.findOne({email:token.email},async function(err,user){
            if(err){
                console.log('Error in finding user',err)
                return
            }
            if(user){
                user.confirmed=true
                user.save()
                await verifyToken.findOneAndDelete({token:token.token},function(err){
                    if(err){
                        console.log('Error in deleting token')
                        return
                    }
                })
                req.flash('success','Your Email-Id has been verified, Please Sign In to continue')
                return res.redirect('/user/signin')
            }
        })
    })
}

module.exports.resendverify = function(req,res){
    if(req.isAuthenticated()){
        req.flash('info','You have already Signed In')
        return res.redirect('/')
    }
    return res.render('resendVerify',{title:'Email Verification',csrfToken:req.csrfToken()})
}

module.exports.resendverifytoken = function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user',err)
            return
        }
        if(user.confirmed==true){
            req.flash('info','Your Email-Id is already verified')
            return res.redirect('/user/signin')
        }
        var randomtoken = randomstring.generate(32)
        console.log('Token:',randomtoken)
        verifyToken.findOne({email:req.body.email},function(err,requesteduser){
            if(err){
                console.log('Error in finding user',err)
                return
            }
            if(requesteduser){
                req.flash('info','You have already requested for verification, kindly request again after 5mintues.')
                return res.redirect('/user/signin')
            }
            verifyToken.create({email:req.body.email,token:randomtoken},function(err,token){
                if(err){
                    console.log('Error in creating a token')
                    return
                }
                if(token){
                    resendverify.resendverify(user,token)
                    req.flash('info','Please verify your Email-Id to signin')
                    return res.redirect('/user/signin')
                }
            })
        })
    })
}

module.exports.forgotpassword = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('forgotPassword',{title:"Forgot Password",csrfToken:req.csrfToken()})
}

module.exports.forgotpasswordform = function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user')
            return
        }
        if(!user){
            req.flash('info','No user exists with the Email-Id')
            return res.redirect('/user/forgotPassword')
        }
        var randomtoken = randomstring.generate(64)
        console.log('2',randomtoken)
        forgotPassword.findOne({email:req.body.email},function(err,requesteduser){
            if(err){
                console.log('Error in finding user',err)
                return
            }
            if(requesteduser){
                req.flash('info','Already requested for reset password, kindly wait and request after 5 min')
                return res.redirect('/user/signin')
            }
            forgotPassword.create({email:req.body.email,token:randomtoken},function(err,token){
                if(err){
                    console.log('Error in creating token',err)
                }
                if(token){
                    resetPassword.resetPassword(user,token)
                    req.flash('info','Check your mail for changing the password')
                    return res.redirect('/user/signin')
                }
            })
        })
    })
}

module.exports.resetpassword = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    console.log('1',req.params.token)
    forgotPassword.findOne({token:req.params.token},function(err,token){
        if(err){
            console.log('Error in finding token',err)
            return
        }
        console.log(token)
        return res.render('resetPassword',{title:"Reset Password",token:token,csrfToken:req.csrfToken()})
    })
}

module.exports.resetpasswordform = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        req.flash('error','Password and Confirm Password should be same')
        return res.redirect('back');
    }
    forgotPassword.findOne({email:req.body.email},function(err,token){
        if(err){
            console.log('Error in finding token')
            return
        }
        console.log(token)
        if(token){
            User.findOne({email:token.email},async function(err,user){
                if(err){
                    console.log('Error in finding user')
                    return
                }
                user.password = req.body.password
                user.save()
                await forgotPassword.findOneAndDelete({email:token.email},function(err){
                    if(err){
                        console.log('Error in deleting token')
                        return
                    }
                })
                req.flash('success','Your Password has been changed, Please Sign In to continue')
                return res.redirect('/user/signin')
            })
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

