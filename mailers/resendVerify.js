const nodeMailer = require('../config/nodemailer')

module.exports.resendverify = function(user,token){
    console.log(user.email)
    let htmlTemplate = nodeMailer.renderTemplate({user:user,token:token}, '/resendverify.ejs')
    nodeMailer.transporter.sendMail({
       from: 'eShare@gmail.com',
       to: token.email,
       subject: "Email Verification",
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