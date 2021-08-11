const nodemailer = require('nodemailer')
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eshare.contact@gmail.com",
      pass:"eShare-sat"
    }
})

let renderTemplate = function(data,relativepath){
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativepath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template', err); return}
         
         mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {transporter,renderTemplate}
 