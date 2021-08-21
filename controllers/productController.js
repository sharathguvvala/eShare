const Product = require('../models/product')
const User = require('../models/user')
const sharp = require('sharp')

module.exports.add = async function(req,res){
    try{
        let user = await User.findById(req.user.id)
        if(user){
            const buffer = await sharp(req.file.buffer).resize({width:150,height:150}).png().toBuffer()
            let product = await Product.create({
                productTitle:req.body.productTitle,
                productImg:buffer,
                productPrice:req.body.productPrice,
                productAvail:Boolean(req.body.productAvail),
                productDesc:req.body.productDesc,
                user:req.user._id
            })
            user.products.push(product)
            user.save()
            return res.redirect('back')
        }
        else{
            return res.redirect('back')
        }
    }
    catch(err){
        console.log('Error',err)
        return
    }
}