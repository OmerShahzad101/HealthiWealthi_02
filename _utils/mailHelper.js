const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:  {
        user:  'healthiwealthi4@gmail.com',
        pass: 'qwerty@123'
    },
    port: 465,
    secure: true,
    host:"smtp.gmail.com"
  });

module.exports = {
    async send(to, subject, template, from) {
        const mailOptions = {
            from:    `"${from}" <foo@example.com>`,
            // '"Fred Foo 👻" <foo@example.com>'
            to,
            subject,
            html: template
        };
        return new Promise((resolve, reject) => {
            console.log(transporter);
            transporter.sendMail(mailOptions,
                (error, info) => {
                if (error){
                    console.log("emaillllllllllllllllllllllllllerror")
                    return reject({status: false, error});}
                return resolve({status: true, result: info});
            });
        });
    }
    
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}