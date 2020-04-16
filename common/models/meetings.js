'use strict';
const getZoomUser = require('../../server/getZoomUser.js');
const sendEmail = require('../../server/email.js');
const createZoomUser = require('../../server/createZoomUser.js');
const ValidateTools = require('../../src/modules/tools/server/lib/ValidateTools');
const ValidateRules = require('../../server/lib/validateRules.js');
// const http = require("https");
// const jwt = require('jsonwebtoken');
// const config = require('./config');
// const rp = require('request-promise');

module.exports = function (meetings) {

    const to = (promise) => {
        return promise.then(data => {
            return [null, data];
        })
            .catch(err => [err]);
    }

    meetings.getMeetingsUser = (search, filters, limit, options, cb) => {
        let sqlQuerySelect = `meetings.id`
        let sqlQueryfrom = `meetings`
        let sqlQueryWhere = ``
        let searchArr = search.split("'")
        let newSearch = ""
        for (let i = 0; i < searchArr.length; i++) {
            newSearch += searchArr[i] + ((searchArr.length - 1) === i ? '' : "\\'")
        }


        if (filters.id) {
            sqlQueryWhere += `meetings.id <= '${filters.id}'`
        }

        sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.approved = 1`

        if (filters.date) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.date = '${filters.date}'`
        }

        if (filters.language) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.language = '${filters.language}'`
        }

        if (filters.time) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + ` Replace(meetings.time, ':', '') >= ${filters.time[0]} and Replace(meetings.time, ':', '') < ${filters.time[1]}`
        }

        if (filters.isAvailable) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.participants_num < meetings.max_participants and meetings.isOpen = 1`
        }

        if (filters.relationship || search) {
            sqlQueryfrom += `, fallens_meetings`
            if (filters.relationship) {
                sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) + `fallens_meetings.relationship = '${filters.relationship}'`
            }

            if (search) {
                sqlQueryfrom += ` , people , fallens`
                sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) +
                    `(match(fallens.name) against('"${newSearch}"') or 
                        match(meetings.name) against('"${newSearch}"') or 
                        match(people.name) against('"${newSearch}"') )
                    and meetings.owner = people.id
                    and fallens.id = fallens_meetings.fallen`
            }
            sqlQueryWhere += ` and meetings.id = fallens_meetings.meeting`
        }

        meetings.dataSource.connector.query(`SELECT ${sqlQuerySelect} FROM ${sqlQueryfrom} ${sqlQueryWhere.length !== 0 ? 'WHERE ' + sqlQueryWhere : ''}  order by meetings.id DESC LIMIT 5`, (err, res) => {

            if (err) {
                console.log(err)
                return cb(err)
            } else {
                if (res.length !== 0) {
                    let where = { or: [] }
                    if (res.length === 1) {
                        where = res[0]
                    }
                    else for (let i of res) {
                        where.or.push(i)
                    }
                    // meetings.find({ where: where, include: ['meetingOwner', { relation: 'fallens_meetings', scope: { include: 'fallens' } }], order: 'id DESC' }, (err1, res1) => {
                    meetings.find({ where: where, "fields": { "code": false, "zoomId": false }, include: [{ "relation": 'meetingOwner', "scope": { "fields": "name" } }, { relation: 'fallens_meetings', scope: { include: 'fallens' } }], order: 'id DESC' }, (err1, res1) => {

                        if (err1) {
                            console.log("err1", err1)
                            return cb(err1)
                        }
                        return cb(null, res1);
                    })
                }
                else return cb(null, [])
            }

        })

    }

    meetings.remoteMethod('getMeetingsUser', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'search', type: 'string' },
            { arg: 'filters', type: 'object' },
            { arg: 'limit', type: 'object' },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: { arg: 'res', type: 'object', root: true }
    })


    meetings.createMeeting = (data, options, cb) => {
        (async () => {
            const people = meetings.app.models.people
            const emailowner = data.owner.email;
            let newEmail = emailowner.replace("@", "+c2c@");
            const nameOwner = data.owner.name;

            let [err, user0] = await to(people.findOne({ where: { email: data.owner.email } }))
            if (err) {
                console.log("err", err)
                return cb(err)
            }
            if (!user0) {
                if (!!!data.owner.name) { cb({ msg: data.lang !== 'heb' ? 'Please fill in your name' : 'אנא מלא/י שם' }, null); return; }
                if (!!!data.owner.email) { cb({ msg: data.lang !== 'heb' ? 'Please fill in your email' : 'אנא מלא/י דואר אלטקרוני' }, null); return; }
                if (!!!data.owner.phone) { cb({ msg: data.lang !== 'heb' ? 'Please fill in your phone number' : 'אנא מלא/י מספר טלפון' }, null); return; }
                // const validateName = /^['"\u0590-\u05fe\s.-]*$/
                const validateEmail = /^(.+)@(.+){2,}\.(.+){2,}$/
                const validatePhone = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{2,4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,4})/
                // if (!validateName.test(data.owner.name)) { cb({ msg: 'השם אינו תקין' }, null); return; }
                if (!validateEmail.test(data.owner.email)) { cb({ msg: data.lang !== 'heb' ? 'Email is incorrect' : 'הדואר האלקטרוני אינו תקין' }, null); return; }
                if (!validatePhone.test(data.owner.phone)) { cb({ msg: data.lang !== 'heb' ? 'Phone number is incorrect' : 'מספר הטלפון אינו תקין' }, null); return; }

                let whitelist = {
                    name: true, email: true, phone: true
                };
                let valid = ValidateTools.runValidate(data.owner, ValidateRules.people, whitelist);
                if (!valid.success || valid.errors) {
                    return cb(valid.errors, null);
                }

                let [err1, user] = await to(people.create(valid.data))
                if (err1) {
                    console.log("err1", err1)
                    return cb(err1)
                }
                data.owner = user.id
            }
            else data.owner = user0.id


            // security validate
            data.max_participants = Number(data.max_participants)
            if (data.isOpen === "true")
                data.isOpen = true
            else if (data.isOpen === "false") {
                data.isOpen = false
                data.code = Math.floor(Math.random() * (1000000 - 100000)) + 100000
            }
            let jsdata = JSON.parse(JSON.stringify(data))
            let whitelist = {
                name: true, description: true, owner: true, language: true, isOpen: true, time: true, zoomId: true, max_participants: true, code: true, date: true
            };
            let valid = ValidateTools.runValidate(data, ValidateRules.meetings, whitelist);
            if (!valid.success || valid.errors) {
                return cb(valid.errors, null);
            }


            let [err2, meeting] = await to(meetings.create(valid.data))
            if (err2) {
                console.log("err2", err2.code)
                if (err2.code === 'ER_DUP_ENTRY') return cd({ error: { duplicate: true } })
                return cb(err2)
            }

            if (data.fallens) {
                const fallens_meetings = meetings.app.models.fallens_meetings
                let count = 1
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
                        if (count === data.fallens.length) {
                            let [err4, userMeeting] = await to(meetings.find({ where: { id: meeting.id }, include: ['meetingOwner', { relation: 'fallens_meetings', scope: { include: 'fallens' } }] }))
                            if (err4) {
                                console.log("err4", err4)
                                return cb(err4)
                            }
                            if (userMeeting) {
                                let code = jsdata.code ? data.lang !== 'heb' ? `The code for online sign-up is" ${jsdata.code}` : `קוד המפגש להרשמה באתר: ${jsdata.code}` : ''
                                // createZoomUser(newEmail, nameOwner)

                                let sendOptions = {}
                                if (data.lang !== 'heb') {
                                    sendOptions = {
                                        to: emailowner, subject: "The meet-up you initiated has been successfully created",
                                        html:
                                            `<div width="100%" style="direction: ltr;">
                                        <img width="100%" src="https://connect2care.ourbrothers.co.il/head.jpg">
                                        <div
                                            style="text-align: center; margin-top: 20px; color: rgb(30, 43, 78); padding-left: 10vw; padding-right: 10vw; font-size: 15px;">
                                            <div style="font-weight: bold; margin-bottom: 20px;">
                                                Thank you for choosing to host a “Connect2Care” virtual meet-up for Yom
                                    HaZikaron.<br>
                                    Thanks to you, we can give a hug of memory and appreciation to those
                                    who have fallen for us, and show that this year- despite the challenge- we have
                                    not forgotten.
                                            </div>
                                            The meet-up you initiated has been successfully created.
                                            ${code}<br>
                                            <div
                                                style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">
                                                Crucial information for hosting the meet-up:
                                            </div>
                                            This account has been created for the meet-up that you initiated. An activate account e-mail has been sent to you via Zoom.
                                    <br>
                                    If you already have a Zoom account, this is
                                    irrelevant for this meet-up; please use the temporary account. <br>
                                    Due to a special
                                    collaboration with Zoom, all of the meet-ups will be able to use pro features at no cost:
                                    
                                    including unlimited time, ability to record the session, etc.
                                    
                                            <div
                                                style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">
                                                How does this work?
                                    </div>
                                    A. Click the link “Activate Account”, you will be sent to the Zoom sign-up site <br>
                                    B. Click sign-up for Zoom with User Name and Password (not through google or Facebook) <br>
                                    C. Your user name will be automatically filled in, please use the password:
                                    
                                    OurBrothers2020 <br>
                                            <div
                                                style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">
                                                How to create a meaningful meet-up:
                                    </div>
                                            <div style="font-weight: bold;">
                                                We know you probably have questions and concerns about the virtual meet-up.<br>
                                                And exactly for that reason we created the perfect preparatory workshop on Zoom.
                                            </div>
                                            <div style="font-weight: bold; margin-top: 20px;">
                                                Zoom Prep Workshop
                                                </div>
                                                The virtual workshop will be held on Zoom by public speaking experts and digital content
                                    
                                                experts. It is highly recommended!<br>
                                                Sign up here: <a href="https://bit.ly/connect2care_foryou"
                                                target="_blank">https://bit.ly/connect2care_foryou</a>
                                            <div style="font-weight: bold; margin-top: 20px;">Prep Packet
                                            </div>
                                            Short, detailed and user-friendly pack for successful meet-ups
                                            <br>
                                            h<a href="https://bit.ly/connect2care" target="_blank">https://bit.ly/connect2care</a>
                                            <div style="font-weight: bold; margin-top: 20px;">
                                                Invite Participants
                                    </div>
                                    We have prepared materials for you to share and send to anyone you would like. It is
                                    crucial to invite friends and family, it is much easier to host a meeting with a loving crowd.
                                        </div>
                                        <div width="100%"
                                            style="text-align: center; margin-top: 20px; padding: 15px; color: white; background-color: rgb(30, 43, 78);">
                                            <div style="font-weight: bold;">More questions? Anything still unclear? Reach out
                                            </div>zikaron@ourbrothers.org |
                                            058-409-4624
                                        </div>
                                        <div style="font-weight: bold; text-align: center; margin-top: 20px; margin-bottom: 20px; color: rgb(30, 43, 78);">
                                            See you soon,
                                            <br>Connect2Care Team
                                        </div>
                                    </div>
                                    `
                                    }
                                }
                                else {
                                    sendOptions = {
                                        to: emailowner, subject: "המפגש נוצר בהצלחה", html:
                                            `
                                    <div width="100%" style="direction: rtl;"><img width="100%" src="https://connect2care.ourbrothers.co.il/head.jpg"><div style="text-align: center; margin-top: 20px; color: rgb(30, 43, 78); padding-left: 10vw; padding-right: 10vw; font-size: 15px;"><div style="font-weight: bold; margin-bottom: 20px;">אנחנו מעריכים ומודים לך, על שבחרת לארח מפגש יום זיכרון של 'מתחברים וזוכרים'.<br>בזכותך זכינו להעניק חיבוק של זיכרון והערכה לאלו שנפלו למעננו, ולהראות שגם השנה, למרות הקושי, לא שכחנו.
                                    </div>המפגש שיצרת נוצר בהצלחה.
                                    ${code}<br>
                                    <div style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">מידע הכרחי לקיום המפגשים:</div>נשלח אליך מייל הפעלת חשבון מ zoom. החשבון זה הוא יעודי עבורך למפגש שיצרת.<br>יש לך כבר חשבון zoom? לא רלוונטי לצערנו.שים לב שעבור המפגש תצטרך להשתמש בחשבון זמני.<br>למה? בזכות שיתוף פעולה עם חברת zoom לכל המשתתפים במפגש החשבון לא יהיה מוגבל בזמן (pro), תוכל להקליט אותו, ולהשתמש בכל ההטבות של חשבון בתשלום, בחינם.<br><div style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">איך תעשו זאת?</div>א. לחיצה על הקישור של הפעלת החשבון תפתח דף באתר של זום בו תתבקש להירשם<br>ב. יש לבחור באופציה להירשם עם שם משתמש וסיסמה (ולא דרך גוגל או פייסבוק)<br>ג. לאחר בחירת הרשמה השם שלך ימולא באופן אוטומטי, לסיסמה השתמש ב: OurBrothers2020<br><div style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">איך יוצרים מפגש מעולה:</div><div style="font-weight: bold;">אנחנו יודעים שבטוח יש לך שאלות, התלבטויות ואפילו חששות לקראת המפגש,<br>ובדיוק בגלל זה הכנו עבורך את הסדנה המושלמת שתעשה לך סדר.</div><div style="font-weight: bold; margin-top: 20px;">סדנת הכנה בזום</div>הסדנה תועבר ב-zoom על ידי מומחים בהעברת הרצאות zoom, ובתחומי התוכן והדיגיטל. מומלץ מאוד!<br>להרשמה לחץ כאן: <a href="https://bit.ly/connect2care_foryou" target="_blank">https://bit.ly/connect2care_foryou</a><div style="font-weight: bold; margin-top: 20px;">ערכת הכנה</div>ערכה מקיפה, קצרה, ושימושית לקיום מפגשים מוצלחים<br>h<a href="https://bit.ly/connect2care" target="_blank">https://bit.ly/connect2care</a><div style="font-weight: bold; margin-top: 20px;">הזמנת משתתפים</div>הכנו לך כאן חומרים להפצה ושליחה לכל מי שתרצה. חשוב לרתום בני משפחה וחברים, קל ונעים הרבה יותר לנהל מפגש, עם קהל אוהד.</div><div width="100%" style="text-align: center; margin-top: 20px; padding: 15px; color: white; background-color: rgb(30, 43, 78);"><div style="font-weight: bold;">שאלות נוספות? משהו לא ברור? אנחנו כאן לכל דבר</div>zikaron@ourbrothers.org | 058-409-4624</div><div style="font-weight: bold; text-align: center; margin-top: 20px; margin-bottom: 20px; color: rgb(30, 43, 78);">להתראות בקרוב,<br>צוות 'מתחברים וזוכרים'</div></div>
                                  `
                                    }
                                }




                                //                                 Thank you for choosing to host a “Connect2Care” virtual meet-up for Yom
                                // HaZikaron. Thanks to you, we can give a hug of memory and appreciation to those
                                // who have fallen for us, and show that this year- despite the challenge- we have
                                // not forgotten.
                                // The meet-up you initiated has been successfully created. The code for online sign-up is

                                // 357201

                                // Crucial information for hosting the meet-up:

                                // This account has been created for the meet-up that you initiated. An activate account e-
                                // mail has been sent to you via Zoom. If you already have a Zoom account, this is
                                // irrelevant for this meet-up; please use the temporary account. Due to a special
                                // collaboration with Zoom, all of the meet-ups will be able to use pro features at no cost:

                                // including unlimited time, ability to record the session, etc.

                                // How does this work?

                                // A. Click the link “Activate Account”, you will be sent to the Zoom sign-up site
                                // B. Click sign-up for Zoom with User Name and Password (not through google or

                                // Facebook)

                                // C. Your user name will be automatically filled in, please use the password:

                                // OurBrothers2020

                                // How to create a meaningful meet-up:

                                // We know you probably have questions and concerns about the virtual meet-up.
                                // And exactly for that reason we created the perfect preparatory workshop on Zoom

                                // Zoom Prep Workshop

                                // The virtual workshop will be held on Zoom by public speaking experts and digital content

                                // experts. It is highly recommended!
                                // Sign up here: https://bit.ly/connect2care_foryou

                                // Prep Packet

                                // Short, detailed and user-friendly pack for successful meet-ups

                                // https://bit.ly/connect2care
                                // Invite Participants

                                // We have prepared materials for you to share and send to anyone you would like. It is
                                // crucial to invite friends and family, it is much easier to host a meeting with a loving crowd

                                // .

                                // More questions? Anything still unclear? Reach out
                                // zikaron@ourbrothers.org | 058-409-4624

                                // See you soon,
                                // Connect2Care Team

                                sendEmail("", sendOptions);
                                return cb(null, userMeeting)

                            }
                        }
                        else count++
                    }
                }
            }
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

    meetings.updateMeeting = (data, id, options, cb) => {
        (async () => {
            if (data.code) delete data.code

            // const fallens_meetings = meetings.app.models.fallens_meetings
            // if (data.fallensToDelete) {
            //     for (let i of data.fallensToDelete) {
            //         if (typeof i === 'number') {
            //             let [err1, res] = await to(fallens_meetings.destroyAll({ fallen: i, meeting: id }))
            //             if (err1) {
            //                 console.log(err1)
            //                 return cb(err1)
            //             }
            //         }
            //     }
            //     delete data.fallensToDelete
            // }

            // if (data.fallensToAdd) {
            //     for (let i of data.fallensToAdd) {
            //         let whitelist1 = {
            //             fallen: true, meeting: true, relationship: true
            //         };
            //         let valid1 = ValidateTools.runValidate({ fallen: i.fallen, meeting: id, relationship: i.relationship }, ValidateRules.fallens_meetings, whitelist1);
            //         if (!valid1.success || valid1.errors) {
            //             return cb(valid1.errors, null);
            //         }

            //         let [err3, res1] = await to(fallens_meetings.create(valid1.data))
            //         if (err3) {
            //             console.log("err3", err3)
            //             return cb(err3)
            //         }
            //     }
            //     delete data.fallensToAdd
            // }

            let [errMeeting, res] = await to(meetings.findById(id, { include: "meetingOwner" }))
            if (errMeeting) {
                console.log(errMeeting)
                return cb(errMeeting)
            }
            let meetingById = JSON.parse(JSON.stringify(res))

            if (data.fallensToChange) {
                const fallens_meetings = meetings.app.models.fallens_meetings
                for (let i of data.fallensToChange) {
                    let whitelist1 = {
                        fallen: true, meeting: true, relationship: true
                    };
                    let valid1 = ValidateTools.runValidate({ fallen: i.fallen, meeting: id, relationship: i.relationship }, ValidateRules.fallens_meetings, whitelist1);
                    if (!valid1.success || valid1.errors) {
                        return cb(valid1.errors, null);
                    }

                    fallens_meetings.dataSource.connector.query(`UPDATE fallens_meetings SET relationship="${i.relationship}" WHERE meeting=${id} and fallen=${i.fallen}`, (err3, res1) => {
                        if (err3) {
                            console.log("err3", err3)
                            return cb(err3)
                        }
                    })

                }
                delete data.fallensToChange
            }

            if (data.date || data.time) {
                const people_meetings = meetings.app.models.people_meetings
                //find all people that sign to the meeting
                const [err2, res1] = await to(people_meetings.find({ where: { meeting: id }, include: 'people' }))
                if (err2) {
                    console.log("err2", err2)
                    return cb(err2)
                }
                let peopleInMeeting = JSON.parse(JSON.stringify(res1))
                if (peopleInMeeting.length !== 0) {

                    //send email to all the people that sign to the meeting
                    let sendTo = []
                    for (let peopleMeeting of peopleInMeeting) {
                        sendTo.push(peopleMeeting.people.email)
                    }
                    let sendOptions = {
                        to: sendTo, subject: "מפגש השתנה", html:
                            `<div style="direction: rtl;">יוצר המפגש ${meetingById.name} שינה את זמן המפגש.<br/>
                            המפגש יתקיים ב${data.date || meetingById.data} ${data.time || meetingById.time}</div>`
                    }

                    sendEmail("", sendOptions);
                }
            }

            if (data.owner) {
                const validateEmail = /^(.+)@(.+){2,}\.(.+){2,}$/
                const validatePhone = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{2,4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,4})/
                if (data.owner.email && !validateEmail.test(data.owner.email)) { cb({ msg: 'הדואר אלקטרוני אינו תקין' }, null); return; }
                if (data.owner.phone && !validatePhone.test(data.owner.phone)) { cb({ msg: 'מספר הטלפון אינו תקין' }, null); return; }

                let people = meetings.app.models.people

                let whitelist = {
                    name: true, email: true, phone: true
                };
                let valid = ValidateTools.runValidate(data.owner, ValidateRules.people, whitelist);
                if (!valid.success || valid.errors) {
                    return cb(valid.errors, null);
                }

                let [errPeople, peopleById] = await to(people.upsertWithWhere({ id: meetingById.owner }, valid.data))
                if (errPeople) {
                    console.log(errPeople)
                    return cb(errPeople)
                }
                delete data.owner
            }

            // security validate
            if (data.max_participants) data.max_participants = Number(data.max_participants)

            if (!!data.isOpen) {
                data.isOpen = true
                data.code = null
            }
            else if (!!!data.isOpen) {
                data.isOpen = false
                data.code = Math.floor(Math.random() * (1000000 - 100000)) + 100000
                let sendOptions = {
                    to: meetingById.meetingOwner.email, subject: "קוד מפגש", html:
                        `<div style="direction: rtl;"> המפגש ${meetingById.name} הוא עכשיו מפגש סגור.<br/>
                        קוד המפגש להיצטרפות: ${data.code}`
                }

                sendEmail("", sendOptions);
            }

            let whitelist = {
                name: true, description: true, owner: true, language: true, isOpen: true, time: true, zoomId: true, max_participants: true, code: true, date: true
            };
            let valid = ValidateTools.runValidate(data, ValidateRules.meetings, whitelist);
            if (!valid.success || valid.errors) {
                return cb(valid.errors, null);
            }

            if (Object.keys(valid.data).length !== 0) {
                let [err2, meeting] = await to(meetings.upsertWithWhere({ id: id }, valid.data))
                if (err2) {
                    console.log("err2", err2)
                    return cb(err2)
                }
            }
            return cb(null, true)
        })()

    }

    meetings.remoteMethod('updateMeeting', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'data', type: 'object', required: true },
            { arg: 'id', type: 'number', required: true },
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

        if (filters.approved !== (null || undefined))
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.approved = ${filters.approved}`

        if (filters.name) {
            let nameArr = filters.name.split("'")
            let newName = ""
            for (let i = 0; i < nameArr.length; i++) {
                newName += nameArr[i] + ((nameArr.length - 1) === i ? '' : "\\'")
            }
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) + `match(meetings.name) against('"${newName}"')`
        }

        if (filters.relationship || filters.fallen) {
            sqlQueryfrom += `, fallens_meetings`
            if (filters.relationship) {
                sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) + `fallens_meetings.relationship = '${filters.relationship}'`
            }
            if (filters.fallen) {
                let fallenArr = filters.fallen.split("'")
                let newFallen = ""
                for (let i = 0; i < fallenArr.length; i++) {
                    newFallen += fallenArr[i] + ((fallenArr.length - 1) === i ? '' : "\\'")
                }
                sqlQueryfrom += `, fallens`
                sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) +
                    `match(fallens.name) against ('"${newFallen}"')
                     and fallens.id = fallens_meetings.fallen`
            }
            sqlQueryWhere += ` and meetings.id = fallens_meetings.meeting`
        }
        if (filters.owner) {
            let ownerArr = filters.owner.split("'")
            let newOwner = ""
            for (let i = 0; i < ownerArr.length; i++) {
                newOwner += ownerArr[i] + ((ownerArr.length - 1) === i ? '' : "\\'")
            }
            sqlQueryfrom += `, people`
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) +
                ` match(people.name) against('"${newOwner}"')
                 and meetings.owner = people.id`
        }
        if (filters.participants) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + ` meetings.participants_num >= ${filters.participants.min}`
            if (filters.participants.max)
                sqlQueryWhere += ` and meetings.participants_num < ${filters.participants.max}`
        }

        meetings.dataSource.connector.query(`SELECT ${sqlQuerySelect} FROM ${sqlQueryfrom} ${sqlQueryWhere.length !== 0 ? 'WHERE ' + sqlQueryWhere : ''} ORDER BY meetings.approved ASC, meetings.id DESC`, (err, res) => {
            if (err) {
                console.log(err)
                return cb(err)
            }
            if (res) {
                if (res.length !== 0) {
                    let size = res.length
                    res = res.slice(filters.from, filters.from + 20)
                    let where = { or: [] }
                    if (res.length === 1) {
                        where = res[0]
                    }
                    else for (let i of res) {
                        where.or.push(i)
                    }
                    meetings.find({ where: where, include: ['meetingOwner', { relation: 'fallens_meetings', scope: { include: 'fallens' } }], order: ['meetings.approved ASC', 'meetings.id DESC'] }, (err1, res1) => {
                        if (err1) {
                            console.log("err1", err1)
                            return cb(err1)
                        }
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
                let meeting = await meetings.findById(meetingId, { "fields": { "code": false, "zoomId": false }, include: [{ "relation": 'meetingOwner', "scope": { "fields": "name" } }, 'fallens'] });
                if (!meeting || !meeting.approved) { cb({ error: "no meeting" }, null); return; }
                // console.log(meeting.approved)
                // console.log("meeting", meeting.code)
                meeting = JSON.parse(JSON.stringify(meeting))
                // delete meeting.code;
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

    meetings.AddPersonToMeeting = (meetingId, name, email, phone, myCode, mailDetails, cb) => {
        (async () => {
            try {
                if (!!!name) { cb({ msg: 'אנא מלא/י שם' }, null); return; }
                if (!!!email) { cb({ msg: 'אנא מלא/י דואר אלקטרוני' }, null); return; }
                if (!!!phone) { cb({ msg: 'אנא מלא/י מספר טלפון' }, null); return; }
                // const validateName = /^['"\u0590-\u05fe\s.-]*$/
                const validateEmail = /^(.+)@(.+){2,}\.(.+){2,}$/
                const validatePhone = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{2,4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,4})/
                // if (!validateName.test(name)) { cb({ msg: 'השם אינו תקין' }, null); return; }
                if (!validateEmail.test(email)) { cb({ msg: 'הדואר האלקטרוני אינו תקין' }, null); return; }
                if (!validatePhone.test(phone)) { cb({ msg: 'מספר הטלפון אינו תקין' }, null); return; }

                const { people, people_meetings } = meetings.app.models;
                const meeting = await meetings.findById(meetingId);

                if (!meeting) { cb({ msg: "הפגישה אינה קיימת" }, null); return; }
                const { max_participants, participants_num, isOpen, code } = meeting;

                if (!!!isOpen) {
                    if (String(code) !== String(myCode)) {
                        { cb({ msg: 'קוד ההצטרפות שגוי' }, null); return; }
                    }
                }
                if (max_participants && participants_num && max_participants <= participants_num) { cb({ msg: "המפגש מלא" }, null); return; }
                let person;
                let [err, user0] = await to(people.findOne({ where: { email: email } }))
                if (err) {
                    console.log("err", err)
                    return cb(err)
                }
                if (!user0) {
                    let whitelist = {
                        name: true, email: true, phone: true
                    };
                    let valid = ValidateTools.runValidate({ name, email, phone }, ValidateRules.people, whitelist);
                    if (!valid.success || valid.errors) {
                        return cb(valid.errors, null);
                    }

                    person = await people.create(valid.data);
                }
                else {
                    if (meeting.owner === user0.id) { cb({ msg: 'מארח/ת המפגש לא יכול להצטרף למפגש כמשתתף' }, null); return; }
                    person = user0
                }

                let whitelist1 = {
                    person: true, meeting: true
                };
                let valid1 = ValidateTools.runValidate({ person: person.id, meeting: Number(meetingId) }, ValidateRules.people_meetings, whitelist1);
                if (!valid1.success || valid1.errors) {
                    return cb(valid1.errors, null);
                }

                await people_meetings.create(valid1.data);
                const participantsNum = participants_num ? participants_num + 1 : 1;

                let whitelist2 = {
                    id: true, participants_num: true
                };
                let valid2 = ValidateTools.runValidate({ id: Number(meetingId), participants_num: participantsNum }, ValidateRules.meetings, whitelist2);
                if (!valid2.success || valid2.errors) {
                    return cb(valid2.errors, null);
                }

                await meetings.upsert(valid2.data);
                let shalom = mailDetails
                let sendOptions = {
                    to: email, subject: "הרשמתך למפגש התקבלה", html:
                        `
                  <div style='width: 100%; max-width: 98vw; color: white !important; height: fit-content ;  padding-bottom: 30px;
                   background-color: #082551; direction: rtl'>
                  <div style='display: flex ; width: 100%' >
                    <div style='width: 100%;' >
                      <img style='margin-right: 10%; margin-top: 10%;' width='60%' src="https://i.ibb.co/VqRC2ZS/green-Background.png" > 
                    </div>
                    <div style='width: 30%;' >
                      <img width='100%' src="https://i.ibb.co/FByFZfx/New-Project-3-1.png"  > 
                    </div>
                  </div>
                  <div style='color: white !important; font-size: 20px; width: 73%; margin: auto; margin-top: 20px; '>
                  שלום,<br>
אנחנו רוצים לומר תודה על שבחרת להשתתף באחד ממפגשי 'מתחברים וזוכרים' ביום הזיכרון הקרוב.<br><br>
ההשתתפות שלך משמעותית אף יותר השנה מבעבר, מחזקת את משפחות הנופלים ומרחיבה את מעגל ההנצחה.<br><br>
אז איך זה עובד?<br><br>
בימים הקרובים נשלח לך קישור למפגש  של ${shalom.fallensText} בזום. כל שנותר לך לעשות, הוא להיכנס לקישור ביום ${shalom.date} בשעה ${shalom.time}.<br><br>
רוצה להזמין אחרים להשתתף איתך במפגש? אנחנו בעד!<br>
ניתן לשתף בלינק משפחה וחברים, שכנים וחברים מהעבודה, וגם ברשתות החברתיות,<br>
כך שאירועי יום הזיכרון יהיו שייכים לכולם.<br><br>
יש לך רעיונות? הצעות ייעול? שאלות או התלבטויות?<br>
אנחנו כאן כדי לעזור.<br><br>
להתראות בקרוב,<br>
צוות 'האחים שלנו'<br>
                  
                  <div style='font-size: 27px'></div>
                  </div>
              
                  <div style='color: white ; margin-top: 20px ; text-align: center; font-size: 16px;'></div>
                  </div>
                  ` }

                sendEmail("", sendOptions);
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
            { arg: "phone", type: "string", required: true },
            { arg: "myCode", type: "string", required: false },
            { arg: 'mailDetails', type: 'object', required: true }
        ],
        returns: { type: "object", root: true },
        http: { path: "/AddPersonToMeeting/:meetingId", verb: "post" }
    });

    meetings.SendShareEmail = (senderName, sendOptions, cb) => {
        (async () => {
            // getZoomUser()
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

    meetings.deleteMeeting = (id, cb) => {
        (async () => {
            const fallens_meetings = meetings.app.models.fallens_meetings
            const people_meetings = meetings.app.models.people_meetings

            const [err, meeting] = await to(meetings.findById(id))
            if (err) {
                console.log(err)
                return cb(err)
            }

            //find all people that sign to the meeting
            const [err2, res1] = await to(people_meetings.find({ where: { meeting: id }, include: 'people' }))
            if (err2) {
                console.log("err2", err2)
                return cb(err2)
            }
            let peopleInMeeting = JSON.parse(JSON.stringify(res1))
            if (peopleInMeeting.length !== 0) {

                //find fallens of meeting
                const [err10, fallensMeetings] = await to(fallens_meetings.find({ where: { meeting: id }, include: 'fallens' }))
                if (err10) {
                    console.log("err10", err10)
                    return cb(err10)
                }
                let fallensNames = ''
                const fallensMeeting = JSON.parse(JSON.stringify(fallensMeetings))
                for (let i = 0; i < fallensMeeting.length; i++) {
                    fallensNames += (i === (fallensMeeting.length - 1) && fallensMeeting.length > 1 ? 'ו' : '') + fallensMeeting[i].fallens.name + (i === (fallensMeeting.length - 1) ? '' : ', ')
                }

                //send email to all the people that sign to the meeting
                let sendTo = []
                for (let peopleMeeting of peopleInMeeting) {
                    if (peopleMeeting.people) sendTo.push(peopleMeeting.people.email)
                }
                let sendOptions = {
                    to: sendTo, subject: "מפגש התבטל", html:
                        `<div style='direction: rtl;'>יוצר המפגש ${meeting.name} בחר לבטל את המפגש לזכר ${fallensNames} עמך הסליחה.</div>`
                }

                sendEmail("", sendOptions);

                // people.destroyAll(where, (err3, res2) => {
                //     if (err3) {
                //         console.log("err3", err3)
                //         return cb(err3)
                //     }
                // })

            }

            const [err1, delete1] = await to(fallens_meetings.destroyAll({ meeting: id }))
            if (err1) {
                console.log(err1)
                return cb(err1)
            }

            const [err4, delete2] = await to(people_meetings.destroyAll({ meeting: id }))
            if (err4) {
                console.log(err4)
                return cb(err4)
            }

            // let [err6, res4] = await to(people.destroyById(meeting.owner))
            // if (err5) {
            //     console.log(err6)
            //     return cb(err6)
            // }

            let [err7, res5] = await to(meetings.destroyById(id))
            if (err7) {
                console.log(err7)
                return cb(err7)
            }
            return cb(null, true)
        })()
    }

    meetings.remoteMethod('deleteMeeting', {
        http: { verb: 'post' },
        accepts: { arg: 'id', type: 'number' },
        returns: { arg: 'res', type: 'boolean', root: true }
    })


    meetings.approveMeeting = (email, id, nameOwner, cb) => {
        (async () => {
            let newEmail = email.replace("@", "+c2c@");
            let [err2, res] = await to(meetings.upsertWithWhere({ id: id }, { "approved": 1 }))
            if (err2) {
                console.log("err2", err2)
                return cb(err2, false)
            }
            createZoomUser(newEmail, nameOwner)
            let sendOptions = {
                to: email, subject: "המפגש שיצרת אושר", html:
                    `
                <div width="100%" style="direction: rtl;">המפגש שיצרת אושר</div>
              `
            }

            sendEmail("", sendOptions);
            return cb(null, true)
        })()
    }

    meetings.remoteMethod('approveMeeting', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'email', type: 'string', required: true },
            { arg: 'id', type: 'number', required: true },
            { arg: 'nameOwner', type: 'string', required: true },],
        returns: { arg: 'res', type: 'boolean', root: true }
    })

    meetings.get38Meetings = (cb) => {
        (async () => {
            let [err, res] = await to(meetings.find({ "fields": { "code": false, "zoomId": false }, "include": [{ "relation": "fallens" }], "limit": "38" }))
            if (err) {
                console.log(err)
                cb(err, {})
            }
            else {
                cb(null, res)
            }
        })()
    }

    meetings.remoteMethod('get38Meetings', {
        http: { verb: 'get' },
        returns: { type: "object", root: true }
    })

    meetings.isNameExist = (name, cb) => {
        (async () => {
            let nameArr = name.split("'")
            let newName = ""
            for (let i = 0; i < nameArr.length; i++) {
                newName += nameArr[i] + ((nameArr.length - 1) === i ? '' : "\\'")
            }
            meetings.dataSource.connector.query(`select id
            from meetings
            where match(name) against ('"${newName}"')`, (err, res) => {
                if (err) {
                    console.log(err)
                    return cb(err)
                }
                if (res.length === 0) return cb(null, false);
                return cb(null, true)
            })
        })()
    }

    meetings.remoteMethod('isNameExist', {
        http: { verb: 'POST' },
        accepts: { arg: 'name', type: 'string', required: true },
        returns: { type: "object", root: true }
    })

    meetings.getMeetingById = (meetingId, cb) => {
        (async () => {
            let [err, res] = await to(meetings.find({ where: { id: meetingId }, include: ["meetingOwner", { relation: "fallens_meetings", scope: { include: "fallens" } }] }))
            if (err) {
                console.log(err)
                cb(err)
            }
            else {
                cb(null, res)
            }
        })()
    }

    meetings.remoteMethod('getMeetingById', {
        http: { verb: 'POST' },
        accepts: { arg: 'meetingId', type: 'number', required: true },
        returns: { type: "object", root: true }
    })

    meetings.newZoom = (email, nameOwner, cb) => {
        (async () => {
            let newEmail = email.replace("@", "+c2c@");

            createZoomUser(newEmail, nameOwner)

            return cb(null, true)
        })()
    }

    meetings.remoteMethod('newZoom', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'email', type: 'string', required: true },
            { arg: 'nameOwner', type: 'string', required: true },],
        returns: { arg: 'res', type: 'boolean', root: true }
    })

};
/* <div style='width: 100%; max-width: 98vw; color: white !important; height: fit-content ;  padding-bottom: 30px;
background-color: #082551; direction: rtl'>
<div style='display: flex ; width: 100%' >
 <div style='width: 100%;' >
   <img style='margin-right: 10%; margin-top: 10%;' width='60%' src="https://i.ibb.co/VqRC2ZS/green-Background.png" >
 </div>
 <div style='width: 30%;' >
   <img width='100%' src="https://i.ibb.co/FByFZfx/New-Project-3-1.png"  >
 </div>
</div>
<div style='color: white !important; font-size: 20px; width: 73%; margin: auto; margin-top: 20px; '>
אנחנו מעריכים ומודים לך, על שבחרת לארח מפגש יום זיכרון של 'מתחברים וזוכרים'.<br>
היוזמה שלקחת הופכת לעוד יותר משמעותית, לנוכח האתגרים היומיומיים מולם כולנו מתמודדים בתקופה האחרונה.<br>
בזכותך, אנשים רבים יציינו את יום הזיכרון, יתחברו לרעיון ויגדילו את מעגל הנצחה.<br><br>

חשוב לנו לציין, שביכולתך לפתוח יותר ממפגש אחד, ולייעד כל מפגש לקהל שונה. כך למשל, אפשר לפתוח מפגש אחד לציבור הכללי, ומפגש אחר סגור (לצוות או למשפחה, לדוגמא) כאשר לכל אחד מהם מטרה שונה ואופי ייחודי.<br><br>

הכנו עבורך הנחיות ועצות, שיעזרו לך ליצור מפגש בלתי נשכח:<br><br>

איך נכנסים למערכת ויוצרים מפגש?<br>
בהמשך ישלח אליך מייל הפעלת חשבון מזום, חשבון זה הוא יעודי למפגש שיצרת<br>
יתכן וכבר יש לך חשבון בזום, אבל בכדי להנחות מפגש יש להתחבר בנפרד לחשבון זמני.<br>
איך תעשו זאת?<br>
א. לחיצה על הקישור של הפעלת החשבון תפתח דף באתר של זום בו תתבקש להירשם<br>
ב. יש לבחור באופציה להירשם עם שם משתמש וסיסמא (ולא דרך גוגל או פייסבוק)<br>
ג. לאחר בחירת הרשמה עם שם משתמש, תתבקש להזין את שמך הפרטי ושם משפחה, וכן סיסמא. הזן את שמך האמיתי. השתמש בסיסמא OurBrothers2020<br>
איך יוצרים מפגש?<br>
בימים הקרובים, אחרי ביצוע האקטיבציה, אנו נשלח לך אימייל נוסף, שיכיל קישור והוראות מדויקות לפתיחת מפגש הזום אותו אתה תנחה.<br>
בכדי להתחבר ביום המפגש, יהיה עליך להשתמש בפרטים הבאים:<br>
אימייל: ${newEmail}<br>
סיסמא:  OurBrothers2020 .<br>
אנא שמור אותם במקום נגיש.<br><br>

איך יוצרים מפגש מוצלח, משמעותי ונטול מתחים?<br><br>

א. סדנת הכנה וירטואלית <br><br>

צוות ההדרכה שלנו עמל רבות, והכין עבורך סדנה מקצועית וירטואלית לניהול מפגש.<br>
סדנת ההכנה תועבר בזמן אמת אונליין ב-ZOOM על ידי מרצים מומחים בתחומי התוכן והדיגיטל, במועדים הקבועים מראש. ניתן להשתבץ לאחד או יותר מהמועדים לבחירתך. <br><br>

הסדנה החווייתית תעזור לך להתכונן לקראת המפגש, והכלים הכלולים בה, בהם בין היתר עצות לתכנון זמן ועמידה מול קהל, יעזרו לך גם אחרי המפגש בחייך המקצועיים.<br><br>

ב. ערכת הכנה לעיון<br><br>

בנוסף לסדנא, הכנו עבורך ערכת תוכן ובה המלצות ושיטות עבודה לבניית מפגש מוצלח. אנו ממליצים בחום לגשת לערכה, לעיין בה וליישם את ההמלצות הכלולות בה. הערכה נמצאת בלינק: https://connect2care.ourbrothers.co.il/meetingContent.pdf<br><br>

ג. הזמנת משתתפים מקרבה ראשונה<br><br>

אחת העצות הטובות שניתן לך, היא הזמנת בני משפחה וחברים למפגש.<br>
קל ונעים הרבה יותר לנהל מפגש, עם קהל אוהד :).<br><br>

נעשה הכל כדי לעזור לך לנהל מפגש משמעותי ומהנה.<br>
שאלות? התלבטויות? רעיונות? אנחנו כאן עבורך.<br><br>

להתראות בקרוב,<br>
צוות 'האחים שלנו'<br>
<div style='font-size: 27px'></div>
</div>

<div style='color: white ; margin-top: 20px ; text-align: center; font-size: 16px;'></div>
</div> */