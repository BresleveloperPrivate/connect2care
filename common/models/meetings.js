'use strict';

const sendEmail = require('../../server/email.js');
const ValidateTools = require('../../src/modules/tools/server/lib/ValidateTools');
const ValidateRules = require('../../server/lib/validateRules.js');


module.exports = function (meetings) {

    const to = (promise) => {
        return promise.then(data => {
            return [null, data];
        })
            .catch(err => [err]);
    }


    meetings.remoteMethod('getMeetingsUser', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'search', type: 'string' },
            { arg: 'filters', type: 'object' },
            // { arg: 'time', type: 'array' },
            // { arg: 'isAvailable', type: 'boolean' },
            // { arg: 'relation', type: 'string' },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: { arg: 'res', type: 'object', root: true }
    })



    meetings.getMeetingsUser = (search, filters, options, cb) => {
        console.log("filters", filters)
        console.log("search", search)
        let sqlQuerySelect = `meetings.id`
        let sqlQueryfrom = `meetings`
        let sqlQueryWhere = ``

        if (filters.date) {
            sqlQueryWhere += `meetings.date = '${filters.date}'`
        }

        if (filters.language) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.language = '${filters.language}'`
        }

        if (filters.time) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.time >= ${filters.time[0]} and meetings.time < ${filters.time[1]}`
        }

        // if (filters.isOpen !== (null || undefined))
        //     sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.isOpen = ${filters.isOpen}`

        // if (filters.name)
        //     sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) + `meetings.name = '${filters.name}'`

        // if (filters.relationship || filters.fallen) {
        //     sqlQueryfrom += `, fallens_meetings`
        //     if (filters.relationship) {
        //         sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) + `fallens_meetings.relationship = '${filters.relationship}'`
        //     }
        //     if (filters.fallen) {
        //         sqlQueryfrom += `, fallens`
        //         sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) +
        //             `match(fallens.name) against ('${filters.fallen}')
        //              and fallens.id = fallens_meetings.fallen`
        //     }
        //     sqlQueryWhere += ` and meetings.id = fallens_meetings.meeting`
        // }


        // if (filters.owner) {
        //     sqlQueryfrom += `, people`
        //     sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) +
        //         `people.name = '${filters.owner}'
        //          and meetings.owner = people.id`
        // }
        if (filters.isAvailable) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.participants_num < meetings.max_participants`
        }

        if (filters.relationship) {
            sqlQueryfrom += `, fallens_meetings`

            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) + `fallens_meetings.relationship = '${filters.relationship}'`
        }

        if (search) {
            if (search.length > 100)
                return cb("משהו השתבש, אורך החיפוש חייב להיות קטן מ100 תווים")

            if (filters.relationship) {
                sqlQueryfrom += ` , people , fallens`
            }
            else { sqlQueryfrom += ` , people , fallens , fallens_meetings` }
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) +
                `(match(fallens.name) against('${search}') or match(meetings.name) against('${search}') or match(people.name) against('${search}')                 and meetings.owner = people.id
                )
                and fallens.id = fallens_meetings.fallen
                and meetings.id = fallens_meetings.meeting
                `
        }

        // sqlQueryWhere += ` and meetings.id = fallens_meetings.meeting`

        console.log('query:  ', sqlQueryfrom)
        console.log('where:  ', sqlQueryWhere)

        meetings.dataSource.connector.query(`SELECT ${sqlQuerySelect} FROM ${sqlQueryfrom} ${sqlQueryWhere.length !== 0 ? 'WHERE ' + sqlQueryWhere : ''}`, (err, res) => {

            if (err) {
                console.log(err)
            } else {
                console.log(res)
                if (res.length !== 0) {
                    let where = { or: [] }
                    if (res.length === 1) {
                        where = res[0]
                    }
                    else for (let i of res) {
                        where.or.push(i)
                    }
                    console.log(where)
                    meetings.find({ where: where, include: ['meetingOwner', { relation: 'fallens_meetings', scope: { include: 'fallens' } }] }, (err1, res1) => {
                        if (err1) {
                            console.log("err1", err1)
                            return cb(err1)
                        }
                        let size = res1.length
                        // res1 = res1.slice(filters.from, filters.from + 20)
                        // res1.push(size)
                        console.log(res1)
                        return cb(null, res1);
                    })
                }
                else return cb(null, [])
            }

        })

        // let resArray = []
        // meetings.find({ where: filters, include: ['people', 'meetingOwner', { relation: 'fallens_meetings', scope: { include: 'fallens' } }] }, (err, response) => {
        //     if (err) {
        //         return cb(err)
        //     } else {
        //         console.log(response)
        //         if (response.length) {
        //             if (search || time.length || isAvailable || relation) {
        //                 for (let i = 0; i < response.length; i++) {
        //                     let res = JSON.parse(JSON.stringify(response[i]))
        //                     let moveToSearch = true
        //                     let moveToTime = true
        //                     if (relation) {
        //                         if ((res.fallens_meetings).some(fallen => fallen.relationship === relation)) {
        //                             if (!time.length && !isAvailable && !search) {
        //                                 resArray.push(res)
        //                                 moveToTime = false
        //                             }

        //                         } else {
        //                             moveToSearch = false
        //                             moveToTime = false
        //                         }
        //                     }

        //                     if (time.length && moveToTime) {
        //                         try {
        //                             if (time[0] <= Number(res.time.replace(':', '')) && time[1] > Number(res.time.replace(':', ''))) {
        //                                 if (!search && !isAvailable) {
        //                                     resArray.push(res)
        //                                     moveToSearch = false
        //                                 }
        //                                 else if (!search && isAvailable) {
        //                                     if (res.participants_num < res.max_participants) {
        //                                         resArray.push(res)
        //                                     }
        //                                 }

        //                             } else {
        //                                 moveToSearch = false
        //                             }
        //                         } catch (err) {
        //                             console.log(err)
        //                         }
        //                     }
        //                     else if (isAvailable) {
        //                         console.log(res.participants_num, res.max_participants)
        //                         if (!search) {
        //                             if (res.participants_num < res.max_participants) {
        //                                 resArray.push(res)
        //                             }
        //                         } else {
        //                             moveToSearch = false
        //                         }


        //                     }
        //                     if (search && moveToSearch) {
        //                         if (res.name.includes(search) || search.includes(res.name)) {
        //                             resArray.push(res)
        //                         }
        //                         else if (res.meetingOwner && (res.meetingOwner.name.includes(search) || search.includes(res.meetingOwner.name))) {
        //                             resArray.push(res)
        //                         }
        //                         else if (res.fallens_meetings.length && (res.fallens_meetings).some(fallen => (fallen.fallens.name).includes(search))) {
        //                             resArray.push(res)
        //                         }
        //                     }

        //                     if (resArray.length >= 5 || i === response.length - 1) {
        //                         return cb(null, resArray)
        //                     }
        //                 }
        //             }
        //             else {
        //                 return cb(null, response.slice(0, 5))
        //             }
        //         } else {
        //             return cb(null, response)
        //         }
        //     }
        // })
    }


    meetings.getMeetingsByUser = (obj, options, cb) => {
        (async () => {

            const people = meetings.app.models.people
            const people_meetings = meetings.app.models.people_meetings

            let [err, user] = await to(people.findOne({ where: { email: obj.email, phone: obj.phone } }))
            if (!user) {

            } else {
                let [err1, meetingsICreated] = await to(meetings.find({ where: { owner: user.id }, include: ['meetingOwner', { relation: 'fallens_meetings', scope: { include: 'fallens' } }] }))
                let [err2, meetingsIJoined] = await to(people_meetings.find({ where: { person: user.id }, include: { relation: 'meetings', scope: { include: ['meetingOwner', { relation: 'fallens_meetings', scope: { include: 'fallens' } }] } } }))

                console.log(meetingsIJoined)
                return cb(null, [meetingsIJoined, meetingsICreated])
            }
        })()

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
                if (!!!data.owner.name) { cb({ msg: 'אנא מלא/י שם' }, null); return; }
                if (!!!data.owner.email) { cb({ msg: 'אנא מלא/י דואר אלקטרוני' }, null); return; }
                if (!!!data.owner.phone) { cb({ msg: 'אנא מלא/י מספר טלפון' }, null); return; }

                // if (!/^['"\u0590-\u05fe\s.-]*$/.test(data.owner.name)) { cb({ msg: 'השם אינו תקין' }, null); return; }
                if (!/^(.+)@(.+){2,}\.(.+){2,}$/.test(data.owner.email)) { cb({ msg: 'הדואר אלקטרוני אינו תקין' }, null); return; }
                if (!/(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{2,4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,4})/.test(data.owner.phone)) { cb({ msg: 'מספר הטלפון אינו תקין' }, null); return; }

                let [err1, user] = await to(people.create(data.owner))
                if (err1) {
                    console.log("err1", err1)
                    return cb(err1)
                }
                data.owner = user.id
            }
            else data.owner = user0.id
            // security validate
            data.max_participants = Number(data.max_participants)
            data.isOpen = !!data.isOpen
            let whitelist = {
                name: true, description: true, owner: true, language: true, isOpen: true, time: true, zoomId: true, max_participants: true, date: true
            };
            let valid = ValidateTools.runValidate(data, ValidateRules.meetings, whitelist);
            if (!valid.success || valid.errors) {
                return cb(valid.errors, null);
            }
            let [err2, meeting] = await to(meetings.create(valid.data))
            if (err2) {
                console.log("err2", err2)
                return cb(err2)
            }
            if (data.fallens) {
                const fallens_meetings = meetings.app.models.fallens_meetings
                for (let fallen of data.fallens) {

                    let whitelist1 = {
                        fallen: true, meeting: true, relationship: true
                    };
                    let valid1 = ValidateTools.runValidate({ fallen: fallen.id, meeting: meeting.id, relationship: fallen.relative }, ValidateRules.fallens_meetings, whitelist1);
                    if (!valid1.success || valid1.errors) {
                        return cb(valid1.errors, null);
                    }

                    let [err3, res] = await to(fallens_meetings.create(valid1.data))
                    if (err3) {
                        console.log("err3", err3)
                        return cb(err3)
                    }
                    if (res) {
                        console.log("res", res)
                        let [err4, userMeeting] = await to(meetings.find({ where: { id: meeting.id }, include: ['meetingOwner', { relation: 'fallens_meetings', scope: { include: 'fallens' } }] }))
                        if (err4) {
                            console.log("err4", err4)
                            return cb(err4)
                        }
                        if (userMeeting) {
                            console.log("userMeeting", userMeeting)
                            return cb(null, userMeeting)

                        }
                    }
                }
            }
            // else {
            //   console.log(meeting)
            return cb(null, userMeeting)
            // }
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

    meetings.remoteMethod('getMeetingsByUser', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'obj', type: 'object' },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: { arg: 'res', type: 'object', root: true }
    });


    meetings.getMeetingsDashboard = (filters, options, cb) => {

        let sqlQuerySelect = `meetings.id`
        let sqlQueryfrom = `meetings`
        let sqlQueryWhere = ``

        if (filters.date)
            sqlQueryWhere += `meetings.date = '${filters.date}'`

        if (filters.isOpen !== (null || undefined))
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.isOpen = ${filters.isOpen}`

        if (filters.name)
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) + `meetings.name = '${filters.name}'`

        if (filters.relationship || filters.fallen) {
            sqlQueryfrom += `, fallens_meetings`
            if (filters.relationship) {
                sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) + `fallens_meetings.relationship = '${filters.relationship}'`
            }
            if (filters.fallen) {
                sqlQueryfrom += `, fallens`
                sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) +
                    `match(fallens.name) against ('${filters.fallen}')
                     and fallens.id = fallens_meetings.fallen`
            }
            sqlQueryWhere += ` and meetings.id = fallens_meetings.meeting`
        }
        if (filters.owner) {
            sqlQueryfrom += `, people`
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) +
                `people.name = '${filters.owner}'
                 and meetings.owner = people.id`
        }
        if (filters.participants) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.participants_num >= ${filters.participants.min}`
            if (filters.participants.max)
                sqlQueryWhere += `and meetings.participants_num < ${filters.participants.max}`
        }

        meetings.dataSource.connector.query(`SELECT ${sqlQuerySelect} FROM ${sqlQueryfrom} ${sqlQueryWhere.length !== 0 ? 'WHERE ' + sqlQueryWhere : ''}`, (err, res) => {
            if (err) {
                console.log(err)
                return cb(err)
            }
            if (res) {
                if (res.length !== 0) {
                    let where = { or: [] }
                    if (res.length === 1) {
                        where = res[0]
                    }
                    else for (let i of res) {
                        where.or.push({ id: i })
                    }
                    meetings.find({ where: where, include: ['meetingOwner', { relation: 'fallens_meetings', scope: { include: 'fallens' } }] }, (err1, res1) => {
                        if (err1) {
                            console.log("err1", err1)
                            return cb(err1)
                        }
                        let size = res1.length
                        res1 = res1.slice(filters.from, filters.from + 20)
                        res1.push(size)
                        return cb(null, res1);
                    })
                }
                else return cb(null, [])
            }
        })
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
                if (!!!name) { cb({ msg: 'אנא מלא/י שם' }, null); return; }
                if (!!!email) { cb({ msg: 'אנא מלא/י דואר אלקטרוני' }, null); return; }
                if (!!!phone) { cb({ msg: 'אנא מלא/י מספר טלפון' }, null); return; }

                if (!/^['"\u0590-\u05fe\s.-]*$/.test(name)) { cb({ msg: 'השם אינו תקין' }, null); return; }
                if (!/^(.+)@(.+){2,}\.(.+){2,}$/.test(email)) { cb({ msg: 'הדואר אלקטרוני אינו תקין' }, null); return; }
                if (!/(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{2,4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,4})/.test(phone)) { cb({ msg: 'מספר הטלפון אינו תקין' }, null); return; }

                const { people, people_meetings } = meetings.app.models;
                const meeting = await meetings.findById(meetingId);

                if (!meeting) { cb({ msg: "הפגישה אינה קיימת" }, null); return; }
                const { max_participants, participants_num, isOpen } = meeting;

                if (!!!isOpen) { cb({ msg: "המפגש סגור" }, null); return; }
                if (max_participants && participants_num && max_participants <= participants_num) { cb({ msg: "המפגש מלא" }, null); return; }

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