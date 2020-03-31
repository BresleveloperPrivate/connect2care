'use strict';

module.exports = function (meetings) {

    const to = (promise) => {
        return promise.then(data => {
            return [null, data];
        })
            .catch(err => [err]);
    }


    meetings.createMeeting = (data, options, cb) => {
        (async () => {
            console.log('innnnnnnnnnnnnnnn', data)
            const people = meetings.app.models.people
            let [err, user0] = await to(people.findOne({ where: { email: data.owner.email } }))
            if (err) {
                console.log("err", err)
                return cb(err)
            }
            if (!user0) {
                let [err1, user] = await to(people.create(data.owner))
                if (err1) {
                    console.log("err1", err1)
                    return cb(err1)
                }
                data.owner = user.id
            }
            else data.owner = user0.id
            console.log(data)
            let [err2, meeting] = await to(meetings.create(data))
            if (err2) {
                console.log("err2", err2)
                return cb(err2)
            }

            const fallens_meetings = meetings.app.models.fallens_meetings
            for (let fallen of data.fallens) {
                let fallenMeeting = { fallen: fallen, meeting: meeting.id }
                let [err3, res] = await to(fallens_meetings.create(fallenMeeting))
                if (err3) {
                    console.log("err3", err3)
                    return cb(err3)
                }
            }
            console.log(meeting)
            return cb(null, meeting)
        })()

    }

    meetings.remoteMethod('createMeeting', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'data', type: 'object' },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: { arg: 'res', type: 'object', root: true }
    });
};