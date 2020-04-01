'use strict';

const sendEmail = require('../../server/email.js');

module.exports = function (meetings) {

    const to = (promise) => {
        return promise.then(data => {
            return [null, data];
        })
            .catch(err => [err]);
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
            console.log(filters.relationship)
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
                        (fallen.first_name + ' ' + fallen.last_name).includes(filters.fallen))
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

    meetings.GetMeetingInfo = (meetingId, cb) => {
        (async () => {
            try {
                const meeting = await meetings.findById(meetingId, { include: ['meetingOwner', 'zoom', 'fallens_meetings', 'fallens', 'people_meetings', 'people'] });
                if (!meeting) { cb({ error: "no meeting" }, null); return; }
                cb(null, meeting);
            } catch (err) {
                console.log(err);
                cb(err, null);
            }
        })();
    }

    meetings.remoteMethod('GetMeetingInfo', {
        description: "Get House Id by Access Token",
        accepts: [{ arg: "meetingId", type: "string", required: true, http: { source: 'path' } }],
        returns: { type: "object", root: true },
        http: { path: "/GetMeetingInfo/:meetingId", verb: "get" }
    });

    meetings.SendShareEmail = (senderName, sendOptions, cb) => {
        console.log("senderName, sendOptions", senderName, sendOptions)
            (async () => {
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