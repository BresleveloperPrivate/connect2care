'use strict';

const sendEmail = require('../../server/email.js');

module.exports = function (meetings) {

    const to = (promise) => {
        return promise.then(data => {
            return [null, data];
        })
            .catch(err => [err]);
    }


    meetings.getMeetingsUser = (search, filters, time, options, cb) => {

        let resArray = []
        meetings.find({ where: filters, include: [{ "relation": "fallens" }, { "relation": "meetingOwner" }] }, (err, response) => {
            if (err) {
                return cb(err)
            } else {
                if (response.length) {
                    if (search || time.length) {
                        for (let i = 0; i < response.length; i++) {
                            let res = JSON.parse(JSON.stringify(response[i]))
                            let moveToSearch = true
                            if (time) {
                                console.log('time', time)
                                ///אם אין חיפוש והזמן תואם  

                                ///פילטר איפה שהזמן תורם

                                //אם יש לי זמן ואין לי חיפוש אז תעשה פוש למערך התוצאות עם return
                                //אם יש לי זמן ויש לי חיפוש 
                                console.log(time[0], Number(res.time.replace(':', '')))
                                try {
                                    if (time[0] <= Number(res.time.replace(':', '')) && time[1] > Number(res.time.replace(':', ''))) {
                                        if (!search) {
                                            resArray.push(res)
                                            moveToSearch = false
                                        }

                                    } else {
                                        moveToSearch = false
                                    }
                                } catch (err) {
                                    console.log(err)
                                }
                            }
                            if (search && moveToSearch) {
                                if (res.name.includes(search) || search.includes(res.name)) {
                                    resArray.push(res)
                                }
                                else if (res.meetingOwner && (res.meetingOwner.name.includes(search) || search.includes(res.meetingOwner.name))) {
                                    resArray.push(res)
                                }
                                else if (res.fallens.length && (res.fallens).some(fallen => (fallen.name).includes(search))) {
                                    resArray.push(res)
                                }
                            }

                            if (resArray.length >= 5 || i === response.length - 1) {
                                return cb(null, resArray)
                            }
                        }
                    }
                    else {
                        return cb(null, response.slice(0, 5))
                    }
                } else {
                    return cb(null, response)
                }
            }
        })
    }


    meetings.createMeeting = (data, options, cb) => {
        (async () => {
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
            if (data.fallens) {
                const fallens_meetings = meetings.app.models.fallens_meetings
                for (let fallen of data.fallens) {
                    let fallenMeeting = { fallen: fallen, meeting: meeting.id }
                    let [err3, res] = await to(fallens_meetings.create(fallenMeeting))
                    if (err3) {
                        console.log("err3", err3)
                        return cb(err3)
                    }
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

    meetings.getMeetingsDashboard = (filters, options, cb) => {
        (async () => {
            let filtersOfMeetting = {}
            if (filters.date) filtersOfMeetting.date = filters.date
            if (filters.isOpen !== (null || undefined)) filtersOfMeetting.isOpen = filters.isOpen
            if (filters.name) filtersOfMeetting.name = filters.name
            if (filters.relationship && filters.relationship !== 'אחר') {
                filtersOfMeetting.relationship = filters.relationship
            }

            let [err, res] = await to(meetings.find({ where: filtersOfMeetting, include: ['people', 'meetingOwner', 'fallens'] }))
            if (err) {
                console.log("err", err)
                return cb(err)
            }
            let allMeetings = JSON.parse(JSON.stringify(res))
            if (filters.participants) {
                allMeetings = allMeetings.filter((meeting) => (meeting.people.length >= filters.participants.min) && (filters.participants.max && meeting.people.length < filters.participants.max))
            }
            if (filters.relationship && filters.relationship === 'אחר') {
                allMeetings = allMeetings.filter((meeting) =>
                    meeting.relationship !== ('אח' || 'הורים' || 'קרובי משפחה' || 'חבר')
                )
            }
            if (filters.fallen) {
                allMeetings = allMeetings.filter((meeting) =>
                    meeting.fallens.some((fallen) =>
                        fallen.name.includes(filters.fallen))
                )
            }
            if (filters.owner) {
                allMeetings = allMeetings.filter((meeting) =>
                    meeting.meetingOwner.name.includes(filters.owner)
                )
            }
            let size = allMeetings.length
            allMeetings = allMeetings.slice(filters.from, filters.from + 20)
            allMeetings.push(size)
            return cb(null, allMeetings)
        })()

    }

    meetings.remoteMethod('getMeetingsDashboard', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'filters', type: 'object' },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: { arg: 'res', type: 'object', root: true }
    })


    meetings.remoteMethod('getMeetingsUser', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'search', type: 'string' },
            { arg: 'filters', type: 'object' },
            { arg: 'time', type: 'array' },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: { arg: 'res', type: 'object', root: true }
    })

    meetings.GetMeetingInfo = (meetingId, cb) => {
        (async () => {
            try {
                const meeting = await meetings.findById(meetingId, { include: ['meetingOwner', 'fallens'] });
                if (!meeting) { cb({ error: "no meeting" }, null); return; }
                cb(null, meeting);
            } catch (err) {
                console.log(err);
                cb(err, null);
            }
        })();
    }

    meetings.remoteMethod('GetMeetingInfo', {
        description: "Get Meeting Info",
        accepts: [{ arg: "meetingId", type: "string", required: true, http: { source: 'path' } }],
        returns: { type: "object", root: true },
        http: { path: "/GetMeetingInfo/:meetingId", verb: "get" }
    });

    meetings.AddPersonToMeeting = (meetingId, name, email, phone, cb) => {
        (async () => {
            try {
                const { people, people_meetings } = meetings.app.models;
                const meeting = await meetings.findById(meetingId);

                if (!meeting) { cb({ msg: "הפגישה אינה קיימת" }, null); return; }
                const { max_participants, participants_num } = meeting;
                if (max_participants && participants_num && max_participants <= participants_num) { cb({ msg: "הפגישה מלאה" }, null); return; }

                const person = await people.create({ name, email, phone });
                await people_meetings.create({ person: person.id, meeting: meetingId });
                const participantsNum = participants_num ? participants_num + 1 : 1;
                await meetings.upsert({ id: meetingId, participants_num: participantsNum });

                cb(null, { participantsNum });
            } catch (err) {
                console.log(err);
                cb(err, null);
            }
        })();
    }

    meetings.remoteMethod('AddPersonToMeeting', {
        description: "Add Person To Meeting",
        accepts: [
            { arg: "meetingId", type: "string", required: true, http: { source: 'path' } },
            { arg: "name", type: "string", required: true },
            { arg: "email", type: "string", required: true },
            { arg: "phone", type: "string", required: true }
        ],
        returns: { type: "object", root: true },
        http: { path: "/AddPersonToMeeting/:meetingId", verb: "post" }
    });

    meetings.SendShareEmail = (senderName, sendOptions, cb) => {
        (async () => {
            console.log("senderName, sendOptions", senderName, sendOptions)
            let res = sendEmail(senderName, sendOptions);
            cb(null, { res: res })
        })();
    }

    meetings.remoteMethod('SendShareEmail', {
        description: "Get House Id by Access Token",
        accepts: [
            { arg: 'senderName', type: 'string', required: true },
            { arg: 'sendOptions', type: 'object', required: true }],
        returns: { type: "object", root: true },
    });
};