const User = require('../models/user')

module.exports.view = function(req,res){
    console.log(req.params.id)
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log('Error in finding user',err)
            return
        }
        return res.render('userProfile',{title:`Profile |  ${user.username}`,profileUser:user})
    })
}