// sendEmail(parms) {
//     try {
//         // Load the AWS SDK for Node.js
//         var AWS = require('aws-sdk');
//         // Set the region 
//         AWS.config.update({ region: 'eu-west-1' });

//         // Create sendEmail params 
//         var params = {
//             Destination: { /* required */
//                 CcAddresses: [
//                     'justsivan@gmail.com',
//                     /* more items */
//                 ],
//                 ToAddresses: [
//                     options.recieverAddress,
//                     /* more items */
//                 ]
//             },
//             Message: { /* required */
//                 Body: { /* required */
//                     Html: {
//                         Charset: "UTF-8",
//                         Data: "<h1>Hello ננסה</h1>"
//                     },
//                     Text: {
//                         Charset: "UTF-8",
//                         Data: "ניסיון"
//                     }
//                 },
//                 Subject: {
//                     Charset: 'UTF-8',
//                     Data: 'Test email'
//                 }
//             },
//             Source: 'justsivan@gmail.com', /* required */
//             ReplyToAddresses: [
//                 'justsivan@gmail.com',
//                 /* more items */
//             ],
//         };

//         // Create the promise and SES service object
//         var sendEmail = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
//         console.log(sendEmail)

//         const data = await sendEmail;
//         console.log(typeof (data));
//         console.log(data);
//     } catch (err) {
//         console.log(err)
//     }
// }

const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

const sourceEmail = 'justsivan@gmail.com' // 'Zikaron@ourbrothers.org';

const awsSendEmail = async (options) => {
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
                    Data: options.text  || 'test' // TODO should we add plain text to all emails?
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
        console.log('awsSendEmail data:', data);
    } catch (err) {
        console.log('awsSendEmail error:', err)
    }

}

module.exports = awsSendEmail;
