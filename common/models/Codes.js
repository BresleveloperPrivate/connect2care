'use strict';

const randomstring = require("randomstring");

const sendEmail = require('../../server/email.js');

module.exports = function (Codes) {

    Codes.sendCode = (email, options, cb) => {
        // const people = meetings.app.models.people
        // people.findOne({where: {email}},(err,res)=>{

        // })
        (async () => {
            var code = randomstring.generate();

            await Codes.create({ id: code, ttl: 1500, userId: email }, (err, res) => {
                if (err) {
                    console.log(err)
                    return cb(err)
                }
            })
            await sendEmail('senderName',
                {
                    to: email,
                    subject: 'מתחברים וזוכרים - אימות זהות',
                    html: code
                });
            return cb(null, 'yay')
        })();
    }


    Codes.checkCode = (email, code, options, cb) => {

        (async () => {

            const meetings = Codes.app.models.meetings
            const people = Codes.app.models.people
            const people_meetings = Codes.app.models.people_meetings

            await Codes.find({ code: code }, (err, res) => {
                if (err) {
                    console.log(err)
                    return cb(err)
                } else {
                    if(!res.length){
                        return cb('incorrect code')
                    }
                    if(res.length){
                        res = res[res.length-1]
                        console.log(res)
                        if (res.userId === email) {
                            (async () => {
    
                                await people.findOne({ where: { email: email } }, (err, user) => {
    
                                    console.log(user)
                                    if (!user) {
                                        return cb({error: 'user doesnt exist'})
                                    } else {
                                        meetings.find({ where: { owner: user.id }, include: ['meetingOwner', { relation: 'fallens_meetings', scope: { include: 'fallens' } }] }, (err, meetingsICreated) => {
                                            if (meetingsICreated) {
                                                people_meetings.find({ where: { person: user.id }, include: { relation: 'meetings', scope: { include: ['meetingOwner', { relation: 'fallens_meetings', scope: { include: 'fallens' } }] } } }, (err, meetingsIJoined) => {
                                                    if (meetingsIJoined) {
                                                        return cb(null, [meetingsIJoined, meetingsICreated])
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            })();
                        } else {
                            return cb({error: 'incorrect code'})
                        }
                    }
              
                }
            })
        })();
    }

    Codes.remoteMethod('checkCode', {
        description: "checkCode",
        accepts: [
            { arg: "email", type: "string", required: true },
            { arg: "code", type: "string", required: true },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: { arg: 'res', type: 'object', root: true }

    });


    Codes.remoteMethod('sendCode', {
        description: "sendCode",
        accepts: [
            { arg: "email", type: "string", required: true },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: { arg: 'res', type: 'object', root: true }

    });

    // Codes.SendShareEmail = (senderName, email, cb) => {
    //     (async () => {
    //         // console.log("senderName, sendOptions", senderName, sendOptions)
    //         let res = sendEmail(senderName,  {to: email, subject: 'string', html:'hey'});
    //         cb(null, { res: res })
    //     })();
    // }

    // Codes.remoteMethod('SendShareEmail', {
    //     description: "Get House Id by Access Token",
    //     accepts: [
    //         { arg: 'senderName', type: 'string', required: true },
    //         { arg: 'sendOptions', type: 'object', required: true }],
    //     returns: { type: "object", root: true },
    // });
}