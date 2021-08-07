const nodeMailer = require('../config/nodemailer')

module.exports.verifyUser = function(user){
    console.log(user.email)
    let htmlTemplate = nodeMailer.renderTemplate({user:user}, '/verifyUser.ejs')
    nodeMailer.transporter.sendMail({
       from: 'eShare@gmail.com',
       to: user.email,
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