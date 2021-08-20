const User = require('../models/user')

module.exports.home = function(req,res){
    User.find({},function(err,users){
        if(err){
            console.log('Error in finding users',err)
            return
        }
        return res.render('home.ejs',{title:"eShare | Home",users:users})
    })
}