const multer = require('multer')

module.exports.displayFlash = function(req,res,next){
    res.locals.flash = {
        'success' : req.flash('success'),
         'error' : req.flash('error'), 
         'info' : req.flash('info')
    }
    next();
}

module.exports.upload = multer({
    limits:{
        fileSize:16000000
    },
    fileFilter(req,file,cb){
        if(!(file.originalname.match(/(.png|.jpg|.jpeg)/))){
            cb(new Error('Supported image format is png/jpg/jpeg'))
        }
        cb(null,true)
    }
})