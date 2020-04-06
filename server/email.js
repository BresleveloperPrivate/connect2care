const nodemailer = require('nodemailer');

/**
 * @param {string} senderName what the reciever sees as the name;
 * @param {Object} options { to: '', subject: '', html: '<h1></h1>' };
*/

const sendEmail = (senderName, options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "carmel6000dev@gmail.com",
            pass: "uhWFoFK$97r"
        }
    });

    const mailOptions = { from: `${senderName} <carmel6000dev@gmail.com>`, ...options };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            return error;
        }
        else {
            console.log('Email sent: ' + info.response)
            return info.response
        };
    });
};

module.exports = sendEmail;

const sendGridEmail = async (receiver) => {

    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require('@sendgrid/mail');
    const SENDGRID_API_KEY = `${process.env.REACT_APP_SENDGRID_API_KEY}`

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
        to: receiver.email,
        from: 'subteachersystem@gmail.com',
        subject: 'הודעה חדשה ממערכת מורה להחלפה',
        // text: this.tplPersonalContent,
        html: this.tplPersonalContent
    };
    try { await sgMail.send(msg); }
    catch (err) { logNotification("Could not send email with err", err); }
}