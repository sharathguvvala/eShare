const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true,
        unique:true
    },
    phone: {
        type:Number,
        required:true
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    img:{
        type:Buffer
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        console.log(this.password)
        this.password = await bcrypt.hash(this.password,8)
        console.log(this.password)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User