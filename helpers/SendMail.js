const nodemailer = require('nodemailer');

module.exports.sendMail = (email,subject,html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.Email_User,
          pass: process.env.Email_password  
        }
      });
      
      const mailOptions = {
        from: process.env.Email_User,
        to: email,
        subject: subject,
        html: html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
    });
}
