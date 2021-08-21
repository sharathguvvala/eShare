const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productTitle:{
        type:String,
        required:true
    },
    productImg:{
        type:Buffer,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productAvail:{
        type:Boolean,
        default:true
    },
    productDesc:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Product = mongoose.model('Product',productSchema)

module.exports = Product