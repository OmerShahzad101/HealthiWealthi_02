const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:  'healthiwealthi4@gmail.com',
        pass: 'qwerty@123'
    },
});

exports.SendEmail = (to, subject, html) => {
    try {
        const mailOptions = {
            from: 'scoredigno360@gmail.com',
            to,
            subject,
            html,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });

        // const msg = {
        //     to: to,
        //     from: "Digno <digno@gmail.com>",
        //     subject: subject,
        //     html: html,
        //   };
        //   //ES6
        //   sgMail
        //     .send(msg)
        //     .then(() => {}, error => {
        //       console.error(error);

        //       if (error.response) {
        //         console.error(error.response.body)
        //       }
        //     });
    } catch (error) {
        console.log(error);
    }
};
