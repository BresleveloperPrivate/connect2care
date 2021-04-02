const AWS = require('aws-sdk');
const nodeMailer = require('nodemailer');

const sendMailWithAttached = async(mailingData) => {
    const sourceEmail = 'ourbrother@connect2care.ourbrothers.co.il';

    let transporter = nodeMailer.createTransport({
        SES: new AWS.SES({ region: 'eu-west-1', apiVersion: '2010-12-01'})
        });
    console.log('Trying to send email', mailingData.to, mailingData.subject)
    let mail = await transporter.sendMail({
        from: sourceEmail,
        to: mailingData.to,
        subject: mailingData.subject,
        html: mailingData.html,
        attachments: mailingData.attachments

    });
    console.log("Message sent: %s", mail.messageId);
    return mail;
}

module.exports = sendMailWithAttached;
