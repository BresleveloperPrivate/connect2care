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
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response);
    });
};

module.exports = sendEmail;