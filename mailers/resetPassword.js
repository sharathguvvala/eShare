const nodeMailer = require('../config/nodemailer')

module.exports.resetPassword = function(user,token){
    console.log(token.email)
    let htmlTemplate = nodeMailer.renderTemplate({user:user,token:token}, '/resetPassword.ejs')
    nodeMailer.transporter.sendMail({
        from: 'eShare@gmail.com',
        to: token.email,
        subject: "Reset your Password",
        html: htmlTemplate
     }, (err, info) => {
         if (err){
             console.log('Error in sending mail', err)
             return
         }
         console.log('Mail was sent successfully', info)
         return
     })
}