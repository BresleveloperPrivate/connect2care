const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

const sourceEmail = 'ourbrother@connect2care.ourbrothers.co.il' // 'Zikaron@ourbrothers.org';

const sendEmail = async (options) => {
    const params = {
        Destination: { /* required */
            // CcAddresses: [
            //     sourceEmail
            // ],
            ToAddresses: [
                options.to
            ]
        },
        Message: { /* required */
            Body: { /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: options.html
                },
                Text: {
                    Charset: "UTF-8",
                    Data: options.text || 'Email content is sent as HTML only at the moment' // TODO should we add plain text to all emails?
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: options.subject
            }
        },
        Source: sourceEmail, /* required */
        ReplyToAddresses: [
            sourceEmail
        ],
    };

    try {
        const sendEmailPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
        const data = await sendEmailPromise;
        console.log('sendEmail data:', data);
    } catch (err) {
        console.log('sendEmail error:', err)
    }

}

module.exports = sendEmail;
