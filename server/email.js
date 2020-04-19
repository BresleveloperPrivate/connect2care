// const nodemailer = require('nodemailer');

/**
 * @param {string} senderName what the reciever sees as the name;
 * @param {Object} options { to: '', subject: '', html: '<h1></h1>' };
*/

const sendGridEmail = async (senderName, options) => {
    // console.log("options", options)
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require('@sendgrid/mail');
    const SENDGRID_API_KEY = "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"

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
        to: options.to,
        from: 'Zikaron@ourbrothers.org',
        subject: options.subject,
        // text: this.tplPersonalContent,
        html: options.html
    };
    try { await sgMail.send(msg); }
    catch (err) { console.log("Could not send email with err", err); }
}

module.exports = sendGridEmail;

