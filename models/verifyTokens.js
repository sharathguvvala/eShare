const mongoose = require('mongoose')

const verifyToken = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:'5m'
    }
},{timestamps:true})

module.exports = mongoose.model('verifyToken',verifyToken)