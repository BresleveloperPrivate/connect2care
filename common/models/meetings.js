'use strict';
const sendEmail = require('../../server/newEmail.js');
const createZoomUser = require('../../server/createZoomUser.js');
const scheduleMeeting = require('../../server/scheduleMeeting.js');
const ValidateTools = require('../../src/modules/tools/server/lib/ValidateTools');
const ValidateRules = require('../../server/lib/validateRules.js');
const addPanelists = require('../../server/addPanelists.js');
const removePanelists = require('../../server/removePanelists.js');
const { creatCsvFile } = require('download-csv');
const { meetingDates } = require('../../server/common/dates');
const changeEmail = require('../../server/changeEmail');
const changeDateTime = require('../../server/changeDateTime');


module.exports = function (meetings) {

    const to = (promise) => {
        return promise.then(data => {
            return [null, data];
        })
            .catch(err => [err]);
    }

    meetings.getMeetingsUser = (search, filters, limit, options, cb) => {
        let sqlQuerySelect = `meetings.id `
        let sqlQueryfrom = `meetings `
        let sqlQueryWhere = ``
        let params = []

        if (limit.min !== 0 && !Number(limit.min)) {
            return cb({ error: 'value is not a number' })
        }

        sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.approved = 1`

        if (filters.date) {
            params.push(filters.date)
            if (!meetingDates.includes(filters.date)) {
                return cb({ error: 'date is not valid' })
            }
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.date = '${filters.date}'`
        }

        if (filters.status === 1) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.participants_num < meetings.max_participants and meetings.isOpen = 1`
        } else if (filters.status === 2) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.isOpen = 0`
        } else if (filters.status === 3) {
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.participants_num >= meetings.max_participants`
        }

        if (filters.language) {
            if (filters.language !== 'עברית' && filters.language !== 'English' && filters.language !== 'français' && filters.language !== 'العربية' && filters.language !== 'русский' && filters.language !== 'አማርኛ' && filters.language !== 'español') {
                return cb({ error: 'language is not valid' })
            }
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.language = '${filters.language}'`
        }

        if (filters.time) {
            if (filters.time[0] !== 0 && !Number(filters.time[0]) && filters.time[1] !== 0 && !Number(filters.time[1])) {
                return cb({ error: 'value is not a number' })
            }
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + ` Replace(meetings.time, ':', '') >= ${filters.time[0]} and Replace(meetings.time, ':', '') < ${filters.time[1]}`
        }

        if (filters.participants) {
            if (filters.participants[0] !== 0 && !Number(filters.participants[0]) && filters.participants[1] !== 0 && !Number(filters.participants[1])) {
                return cb({ error: 'value is not a number' })
            }
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.participants_num  >= ${filters.participants[0]} and meetings.participants_num < ${filters.participants[1]} and meetings.isOpen = 1`
        }

        // if (filters.isAvailable) {
        //     sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.participants_num < meetings.max_participants and meetings.isOpen = 1`
        // }

        if (filters.relationship || search) {
            sqlQueryfrom += `, fallens_meetings`
            if (filters.relationship) {
                if (filters.relationship !== 'אח/ות' && filters.relationship !== 'הורים' && filters.relationship !== 'קרובי משפחה' && filters.relationship !== 'אלמן/ אלמנה' && filters.relationship !== 'יתומים' && filters.relationship !== 'חבר/ה' && filters.relationship !== 'בית אביחי' && filters.relationship !== 'האחים שלנו') {
                    return cb({ error: 'relationship is not valid' })
                }
                sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) + `fallens_meetings.relationship = '${filters.relationship}'`
            }

            if (search) {
                let searchArr = search.split("'")
                let newSearch = ""
                for (let i = 0; i < searchArr.length; i++) {
                    newSearch += searchArr[i] + ((searchArr.length - 1) === i ? '' : "\\'")
                }
                params.push(newSearch)
                params.push(newSearch)
                params.push(newSearch)
                sqlQueryfrom += ` , people , fallens`
                sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) +
                    `(match(fallens.name) against('"??"') or 
                        match(meetings.name) against('"??"') or 
                        match(people.name) against('"??"') )
                    and meetings.owner = people.id
                    and fallens.id = fallens_meetings.fallen`
            }

            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and meetings.id = fallens_meetings.meeting ` : `meetings.id = fallens_meetings.meeting `)
        }

        meetings.dataSource.connector.query(`SELECT ${sqlQuerySelect} FROM ${sqlQueryfrom} ${sqlQueryWhere.length !== 0 ? 'WHERE ' + sqlQueryWhere : ''}  GROUP BY CASE 
        WHEN meetings.isOpen = 1 and meetings.participants_num < meetings.max_participants THEN 1
        WHEN meetings.isOpen = 0 and meetings.participants_num < meetings.max_participants THEN 2
        WHEN meetings.isOpen = 1 and meetings.participants_num >= meetings.max_participants THEN 3 
        WHEN meetings.isOpen = 0 and meetings.participants_num >= meetings.max_participants THEN 4 
        ELSE 5
        END , meetings.id DESC LIMIT ${limit.min} , 21`, params, (err, res) => {

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

                    meetings.find({ where: where, "fields": { "code": false, "zoomId": false }, include: [{ "relation": 'meetingOwner', "scope": { "fields": "name" } }, { relation: 'fallens_meetings', scope: { include: 'fallens' } }] }, (err1, res1) => {

                        if (err1) {
                            console.log("err1", err1)
                            return cb(err1)
                        }

                        ////sortttt

                        return cb(null, res1.sort((firstRes, secondRes) => {
                            if (where.or.findIndex(or => or.id === firstRes.id) > where.or.findIndex(or => or.id === secondRes.id)) {
                                return 1
                            } else {
                                return -1
                            }

                        }));
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
            console.log(data.owner);

            let [err, user0] = await to(people.findOne({ where: { email: data.owner.email } }))
            if (err) {
                console.log("err people.findOne [err, user0], data, data.owner", err, user0, data, data.owner)
                return cb(err)
            }
            if (!user0) {
                if (!!!data.owner.name) { cb({ msg: data.lang !== 'heb' && data.lang ? 'Please fill in your name' : 'אנא מלא/י שם' }, null); return; }
                if (!!!data.owner.email) { cb({ msg: data.lang !== 'heb' && data.lang ? 'Please fill in your email' : 'אנא מלא/י דואר אלטקרוני' }, null); return; }
                if (!!!data.owner.phone) { cb({ msg: data.lang !== 'heb' && data.lang ? 'Please fill in your phone number' : 'אנא מלא/י מספר טלפון' }, null); return; }
                // const validateName = /^['"\u0590-\u05fe\s.-]*$/
                const validateEmail = /^(.+)@(.+){2,}\.(.+){2,}$/
                const validatePhone = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{2,4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,4})/
                // if (!validateName.test(data.owner.name)) { cb({ msg: 'השם אינו תקין' }, null); return; }
                if (!validateEmail.test(data.owner.email)) { cb({ msg: data.lang !== 'heb' && data.lang ? 'Email is incorrect' : 'הדואר האלקטרוני אינו תקין' }, null); return; }
                if (!validatePhone.test(data.owner.phone)) { cb({ msg: data.lang !== 'heb' && data.lang ? 'Phone number is incorrect' : 'מספר הטלפון אינו תקין' }, null); return; }

                let whitelist = {
                    name: true, email: true, phone: true
                };
                // countDigit = 0
                // countMinues = 0

                // for (let i = 0; i < data.phone.length; i++) {
                //     if( data.phone[i]==="0"||data.phone[i]==="1"||data.phone[i]==="2"||data.phone[i]==="3"||)
                // }

                let valid = ValidateTools.runValidate(data.owner, ValidateRules.people, whitelist);
                console.log("valid", valid)
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
            if (!data.isOpen) {
                data.code = Math.floor(Math.random() * (1000000 - 100000)) + 100000
            }
            if (data.description.length > 1500) return cb("משהו השתבש, אנא בדוק שתאור המפגש נכון")
            if (data.name.length > 100) return cb("משהו השתבש, אנא בדוק ששם המפגש נכון")

            if (data.fallens) {
                for (let fallen of data.fallens) {
                    if (fallen.relative === "בית אביחי" || fallen.relative === "בית אבי חי" || fallen.relative === "האחים שלנו") {
                        return cb(data.lang !== 'heb' ? "You can't be related to the fallen, by 'Our brothers' and 'Beit Avi Chai'. Only the manager can choose this relation" : "אינך יכול לבחור להיות קשור לנופל מהדברים האלה: 'האחים שלנו', 'בית אבי חי' ו'בית אביחי', רק למנהל מותר לבחור את הקישוריות הזאת.")
                    }
                }
            }

            let whitelist = {
                // name: true, description: true, 
                owner: true, language: true, isOpen: true, time: true,
                //  zoomId: true, 
                max_participants: true, code: true, date: true
            };
            let name = data.name
            let description = data.description
            delete data.name
            delete data.description
            data.max_participants = Number(data.max_participants)
            let valid = ValidateTools.runValidate(data, ValidateRules.meetings, whitelist);
            if (!valid.success || valid.errors) {
                return cb(valid.errors, null);
            }
            valid.data.description = description
            valid.data.name = name

            let [err2, meeting] = await to(meetings.create(valid.data))
            if (err2) {
                if (err2.code === 'ER_DUP_ENTRY') return cb({ error: { duplicate: true } })
                return cb(err2)
            }

            if (data.fallens) {
                const fallens_meetings = meetings.app.models.fallens_meetings
                let count = 1
                for (let fallen of data.fallens) {

                    let whitelist1 = {
                        fallen: true, meeting: true, relationship: true, serveUnit: true,
                    };
                    let valid1 = ValidateTools.runValidate({ fallen: fallen.id, meeting: meeting.id, relationship: fallen.relative, serveUnit: fallen.serveUnit }, ValidateRules.fallens_meetings, whitelist1);
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
                                // let code = jsdata.code ? data.lang == 'en' ? `The code for online sign-up is" ${jsdata.code}` : `קוד המפגש להרשמה באתר: ${jsdata.code}` : ''
                                console.log("sending email next")
                                let sendOptions = {}
                                if (data.lang !== 'heb' && data.lang) {


                                    sendOptions = {
                                        to: emailowner, subject: "The meeting you initiated was accepted and awaiting approval", html:

                                            `
                                    <div width="100%" style="direction: ltr;">
                                    <img width="100%" src="https://connect2care.ourbrothers.co.il/head.jpg">
                                    <div style="text-align: center; margin-top: 20px; color: rgb(30, 43, 78); padding-left: 10vw; padding-right: 10vw; font-size: 15px;">
                                      <div style="font-weight: bold; margin-bottom: 20px;">
                                      Thank you for choosing to host a “Connect2Care” virtual meet-up for Yom HaZikaron.<br>
                                      Thanks to you, we can give a hug of memory and appreciation to those who have fallen for us, and show that this year- despite the challenge- we have not forgotten.
                                      </div>
                                      In order to promise top security for our meet-ups, the project team is reviewing your request, will possibly discuss your request with you, and within 24 hours will send you confirmation to publish and share your meet-up on our website. <br><br>
                                      Continue following our emails.<br>
                                      Thank you for your patience and understanding.
                                      <br>
                                    </div>
                                      <div width="100%" style="text-align: center; margin-top: 20px; padding: 15px; color: white; background-color: rgb(30, 43, 78);">
                                        <div style="font-weight: bold;">
                                        More questions? Anything still unclear? Reach out
                                        </div>zikaron@ourbrothers.org | 058-409-4624
                                      </div>
                                      <div
                                        style="font-weight: bold; text-align: center; margin-top: 20px; margin-bottom: 20px; color: rgb(30, 43, 78);">
                                        See you soon,
                                        Connect2Care Team.</div>
                                        <div
                                        style="text-align: center; color: rgb(30, 43, 78);">
                                        For technical support: <br>
                                        052-6283967 | Amdocs.Digital@glassix.net
                                        </div>
                                        </div>
                                    `
                                    }
                                }
                                else {
                                    sendOptions = {
                                        to: emailowner, subject: "המפגש שיצרת התקבל וממתין לאישור", html:
                                            //             `
                                            //     <div width="100%" style="direction: rtl;"><img width="100%" src="https://connect2care.ourbrothers.co.il/head.jpg"><div style="text-align: center; margin-top: 20px; color: rgb(30, 43, 78); padding-left: 10vw; padding-right: 10vw; font-size: 15px;"><div style="font-weight: bold; margin-bottom: 20px;">אנחנו מעריכים ומודים לך, על שבחרת לארח מפגש יום זיכרון של 'מתחברים וזוכרים'.<br>בזכותך זכינו להעניק חיבוק של זיכרון והערכה לאלו שנפלו למעננו, ולהראות שגם השנה, למרות הקושי, לא שכחנו.
                                            //     </div>המפגש שיצרת נוצר בהצלחה.
                                            //     ${code}<br>
                                            //     <div style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">מידע הכרחי לקיום המפגשים:</div>נשלח אליך מייל הפעלת חשבון מ zoom. החשבון זה הוא יעודי עבורך למפגש שיצרת.<br>יש לך כבר חשבון zoom? לא רלוונטי לצערנו.שים לב שעבור המפגש תצטרך להשתמש בחשבון זמני.<br>למה? בזכות שיתוף פעולה עם חברת zoom לכל המשתתפים במפגש החשבון לא יהיה מוגבל בזמן (pro), תוכל להקליט אותו, ולהשתמש בכל ההטבות של חשבון בתשלום, בחינם.<br><div style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">איך תעשו זאת?</div>א. לחיצה על הקישור של הפעלת החשבון תפתח דף באתר של זום בו תתבקש להירשם<br>ב. יש לבחור באופציה להירשם עם שם משתמש וסיסמה (ולא דרך גוגל או פייסבוק)<br>ג. לאחר בחירת הרשמה השם שלך ימולא באופן אוטומטי, לסיסמה השתמש ב: OurBrothers2021<br><div style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">איך יוצרים מפגש מעולה:</div><div style="font-weight: bold;">אנחנו יודעים שבטוח יש לך שאלות, התלבטויות ואפילו חששות לקראת המפגש,<br>ובדיוק בגלל זה הכנו עבורך את הסדנה המושלמת שתעשה לך סדר.</div><div style="font-weight: bold; margin-top: 20px;">סדנת הכנה בזום</div>הסדנה תועבר ב-zoom על ידי מומחים בהעברת הרצאות zoom, ובתחומי התוכן והדיגיטל. מומלץ מאוד!<br>להרשמה לחץ כאן: <a href="https://bit.ly/connect2care_foryou" target="_blank">https://bit.ly/connect2care_foryou</a><div style="font-weight: bold; margin-top: 20px;">ערכת הכנה</div>ערכה מקיפה, קצרה, ושימושית לקיום מפגשים מוצלחים<br>h<a href="https://bit.ly/connect2care" target="_blank">https://bit.ly/connect2care</a><div style="font-weight: bold; margin-top: 20px;">הזמנת משתתפים</div>הכנו לך כאן חומרים להפצה ושליחה לכל מי שתרצה. חשוב לרתום בני משפחה וחברים, קל ונעים הרבה יותר לנהל מפגש, עם קהל אוהד.</div><div width="100%" style="text-align: center; margin-top: 20px; padding: 15px; color: white; background-color: rgb(30, 43, 78);"><div style="font-weight: bold;">שאלות נוספות? משהו לא ברור? אנחנו כאן לכל דבר</div>zikaron@ourbrothers.org | 058-409-4624</div><div style="font-weight: bold; text-align: center; margin-top: 20px; margin-bottom: 20px; color: rgb(30, 43, 78);">להתראות בקרוב,<br>צוות 'מתחברים וזוכרים'</div></div>
                                            //   `
                                            `
                                <div style="background-image: url('../../server/assets/emailPhoto2.jfif');
    background-repeat: no-repeat; background-attachment: fixed;
    background-position: center; background-size:100% 100%">

    <div style="padding-top: 10%;">
        <div
            style='width: 100%; max-width: 98vw; height: fit-content ;  padding-bottom: 30px; direction: rtl; text-align: center; font-family: Arial'>
            <div
                style="margin-top: 20px; color: rgb(30, 43, 78); padding-left: 10vw; padding-right: 10vw; font-size: 15px;">
                <h3>מייל הרשמה - מתחברים וזוכרים</h3>
                <div style="font-weight: bold; margin-bottom: 20px; ">אנחנו מעריכים ומודים לך על שבחרת לארח מפגש יום
                    זיכרון
                    של מתחברים וזוכרים'</div>
                <div style="padding: 15px">צוות המתנדבים שלנו יצור איתך קשר ב-48 שעות הקרובות על מנת לתת לך את המידע
                    הנדרש ולאשר את המפגש שלך.
                    <br>
                    לאחר אישור המפגש -
                    יועברו לך פרטים נוספים להמשך תהליך.</div>
                <div style="padding: 15px">לתשומת לבך, ניתן לפתוח יותר ממפגש אחד. יש לשים לב שאין חפיפה בשעות ובתאריכים.
                </div>
                <div style="padding: 15px">לכל שאלה, אנחנו פה.</div>
                <div style="padding: 15px">צוות 'מתחברים וזוכרים'
                    <br>
                    <a href="zikaron@ourbrothers.org">zikaron@ourbrothers.org</a>
                </div>

            </div>
        </div>
    </div>
</div>
                                `
                                    }
                                }


                                sendEmail(sendOptions);
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

    meetings.updateMeeting = (data, id, lang, options, cb) => {
        (async () => {
            if (data.code) delete data.code
            let [errMeeting, res] = await to(meetings.findById(id, { include: "meetingOwner" }))
            if (errMeeting) {
                console.log("errMeeting", errMeeting)
                return cb(errMeeting)
            }
            if (data.max_participants) {

                if (data.max_participants && Number(data.max_participants) > 2000) {
                    return cb(lang != "heb" ? "You must enter multiple participants less or equal to 2000" : "אתה חייב להכניס מספר משתתפים שקטן או שווה ל2000")
                }
            }
            let meetingById = JSON.parse(JSON.stringify(res))


            if (data.fallensToChange) {

                const fallens_meetings = meetings.app.models.fallens_meetings
                for (let i of data.fallensToChange) {
                    let whitelist1 = {
                        fallen: true, meeting: true, relationship: true, serveUnit: true,
                    };
                    let valid1 = ValidateTools.runValidate({ fallen: i.fallen, meeting: id, relationship: i.relationship, serveUnit: i.serveUnit }, ValidateRules.fallens_meetings, whitelist1);
                    if (!valid1.success || valid1.errors) {

                        return cb(valid1.errors, null);
                    }

                    fallens_meetings.dataSource.connector.query(`UPDATE fallens_meetings SET relationship="${i.relationship}", serveUnit="${i.serveUnit}" WHERE meeting=${id} and fallen=${i.fallen}`, (err3, res1) => {
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
                    let sendOptions = {}
                    if (meetingById.language !== 'עברית') {
                        sendOptions = {
                            to: sendTo, subject: "Change in Meet-up", html:
                                `<div style="direction: ltr;">The initiator of the meet-up "${meetingById.name}" has changed the time of the meeting.<br/>
                                The meet-up will now take place on ${data.date || meetingById.date} at ${data.time || meetingById.time}</div>`
                        }
                    } else {
                        sendOptions = {
                            to: sendTo, subject: "מפגש השתנה", html:
                                `<div style="direction: rtl;">יוצר המפגש ${meetingById.name}, שינה את זמן המפגש.<br/>
                               המפגש יתקיים ב${data.date || meetingById.date} ${data.time || meetingById.time}</div>`
                        }
                    }

                    sendEmail(sendOptions);
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
                console.log("valid", valid)
                if (!valid.success || valid.errors) {
                    return cb(valid.errors, null);
                }
                let [errPeople, peopleById] = await to(people.upsertWithWhere({ id: meetingById.owner }, valid.data))
                if (errPeople) {
                    console.log("errPeople", errPeople)
                    return cb(errPeople)
                }
                delete data.owner
            }

            // security validate
            if (data.max_participants) data.max_participants = Number(data.max_participants)
            if (data.isOpen) {
                // data.isOpen = true
                data.code = null
            }
            else if (data.isOpen !== undefined && data.isOpen !== null && !data.isOpen) {
                // data.isOpen = false
                data.code = Math.floor(Math.random() * (1000000 - 100000)) + 100000

                let sendOptions = {}
                if (meetingById.language !== 'עברית') {
                    sendOptions = {
                        to: meetingById.meetingOwner.email, subject: "Meeting Code", html:
                            `<div style="direction: ltr;"> The meeting "${meetingById.name}" is now a private meeting.<br/>
                            The code for online sign-up is: ${data.code}`
                    }
                } else {
                    sendOptions = {
                        to: meetingById.meetingOwner.email, subject: "קוד מפגש", html:
                            `<div style="direction: rtl;"> המפגש ${meetingById.name} הוא עכשיו מפגש פרטי.<br/>
                        קוד המפגש להצטרפות: ${data.code}`
                    }

                }

                sendEmail(sendOptions);
            }

            if (data.description && data.description.length > 1500) return cb("משהו השתבש, אנא בדוק שתאור המפגש נכון")
            if (data.name && data.name.length > 100) return cb("משהו השתבש, אנא בדוק ששם המפגש נכון")

            let whitelist = {
                // name: true, description: true,
                title: true, owner: true, language: true, isOpen: true, time: true,
                //  zoomId: true,
                // max_participants: true,
                code: true, date: true
            };

            let valid = ValidateTools.runValidate(data, ValidateRules.meetings, whitelist);
            if (!valid.success || valid.errors) {
                return cb(valid.errors, null);
            }

            if (data.name)
                valid.data.name = data.name
            if (data.description)
                valid.data.description = data.description
            if (data.max_participants) {
                valid.data.max_participants = data.max_participants
            }
            // if (data.zoomId && meetingById.max_participants > 500 && (meetingById.meetingOwner.name === 'האחים שלנו' || meetingById.meetingOwner.name === 'בית אביחי' || meetingById.meetingOwner.name === 'בית אבי חי')) 
            if (data.zoomId) valid.data.zoomId = data.zoomId

            if (Object.keys(valid.data).length !== 0 || data.name || data.description) {
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
            { arg: 'lang', type: 'string', required: true },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: { arg: 'res', type: 'object', root: true }
    });


    meetings.getMeetingsDashboard = (filters, isExcel, options, cb) => {

        let sqlQuerySelect = `meetings.id`
        let sqlQueryfrom = `meetings`
        let sqlQueryWhere = `meetings.date like '%2021%'`
        let params = []

        if (filters.date) {
            if (!meetingDates.includes(filters.date)) {
                return cb({ error: 'date is not valid' })
            }

            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.date = '${filters.date}'`
        }

        if (filters.isOpen !== (null || undefined)) {
            if (filters.isOpen !== true && filters.isOpen !== false) {
                return cb({ error: 'isOpen is not valid' })
            }
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.isOpen = ${filters.isOpen}`
        }

        if (filters.approved !== (null || undefined)) {
            if (filters.approved !== true && filters.approved !== false) {
                return cb({ error: 'approved is not valid' })
            }
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + `meetings.approved = ${filters.approved}`
        }

        if (filters.name) {
            let nameArr = filters.name.split("'")
            let newName = ""
            for (let i = 0; i < nameArr.length; i++) {
                newName += nameArr[i] + ((nameArr.length - 1) === i ? '' : "\\'")
            }
            params.push(newName)
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) + `match(meetings.name) against('"??"')`
        }

        if (filters.relationship || filters.fallen) {
            sqlQueryfrom += `, fallens_meetings`
            if (filters.relationship) {
                if (filters.relationship !== 'אח/ות' && filters.relationship !== 'הורים' && filters.relationship !== 'קרובי משפחה' && filters.relationship !== 'אלמן/ אלמנה' && filters.relationship !== 'יתומים' && filters.relationship !== 'חבר/ה' && filters.relationship !== 'בית אביחי' && filters.relationship !== 'האחים שלנו') {
                    return cb({ error: 'relationship is not valid' })
                }
                sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) + `fallens_meetings.relationship = '${filters.relationship}'`
            }
            if (filters.fallen) {
                let fallenArr = filters.fallen.split("'")
                let newFallen = ""
                for (let i = 0; i < fallenArr.length; i++) {
                    newFallen += fallenArr[i] + ((fallenArr.length - 1) === i ? '' : "\\'")
                }
                params.push(newFallen)
                sqlQueryfrom += `, fallens`
                sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) +
                    `match(fallens.name) against ('"??"')
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
            params.push(newOwner)
            sqlQueryfrom += `, people`
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ` `) +
                ` match(people.name) against('"??"')
                 and meetings.owner = people.id`
        }
        if (filters.participants) {
            if (filters.participants.min !== '0' && !Number(filters.participants.min)) {
                return cb({ error: 'participants is not valid' })
            }
            sqlQueryWhere += (sqlQueryWhere.length !== 0 ? ` and ` : ``) + ` meetings.participants_num >= ${filters.participants.min}`
            if (filters.participants.max) {
                if (filters.participants.max !== 0 && !Number(filters.participants.max)) {
                    return cb({ error: 'participants is not valid' })
                }
                sqlQueryWhere += ` and meetings.participants_num < ${filters.participants.max}`
            }
        }

        meetings.dataSource.connector.query(`SELECT ${sqlQuerySelect} FROM ${sqlQueryfrom} ${sqlQueryWhere.length !== 0 ? 'WHERE ' + sqlQueryWhere : ''} GROUP BY meetings.approved ASC, meetings.id DESC`, params, (err, res) => {
            if (err) {
                console.log(err)
                return cb(err)
            }
            if (res) {
                if (res.length !== 0) {
                    let size = res.length
                    if (!isExcel) {
                        res = res.slice(filters.from, filters.from + 20)
                    }
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
                        if (isExcel) {
                            let meetingsPS = JSON.parse(JSON.stringify(res1))
                            let meetingToReturn = []
                            for (let meeting of meetingsPS) {
                                let fallens = ''
                                meeting.fallens_meetings.map((fallenMeeting, index) =>
                                    fallens = fallens + fallenMeeting.fallens.name + (index === (meeting.fallens_meetings.length - 1) ? '' : ', ')
                                )
                                meetingToReturn.push({
                                    name: '"' + meeting.name + '"',
                                    date: '"' + meeting.date + '"',
                                    time: meeting.time,
                                    fallens: '"' + fallens + '"',
                                    ownerName: meeting.meetingOwner.name,
                                    ownerEmail: meeting.meetingOwner.email,
                                    ownerPhone: meeting.meetingOwner.phone
                                })
                            }
                            return cb(null, meetingToReturn)
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
            { arg: 'isExcel', type: 'boolean' },
            { arg: 'options', type: 'object', http: 'optionsFromRequest' }
        ],
        returns: { arg: 'res', type: 'object', root: true }
    })

    meetings.GetMeetingInfo = (meetingId, cb) => {
        (async () => {
            let [err, meeting] = await to(meetings.findById(meetingId, { "fields": { "code": false, "zoomId": false }, include: [{ "relation": 'meetingOwner', "scope": { "fields": "name" } }, 'fallens'] }));
            if (err) {
                console.log(err);
                return cb(err, null);
            }
            if (!meeting || !meeting.approved) { cb({ error: "no meeting" }, null); return; }
            meeting = JSON.parse(JSON.stringify(meeting))
            cb(null, meeting);
        })();
    }

    meetings.remoteMethod('GetMeetingInfo', {
        description: "Get Meeting Info",
        accepts: [{ arg: "meetingId", type: "string", required: true, http: { source: 'path' } }],
        returns: { type: "object", root: true },
        http: { path: "/GetMeetingInfo/:meetingId", verb: "get" }
    });

    meetings.AddPersonToMeeting = (meetingId, name, email, phone, myCode, mailDetails, participantsCount, cb) => {

        (async () => {
            // var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            // var xmlhttp = new XMLHttpRequest();
            // xmlhttp.open("GET", "https://stackoverflow.com/", false);
            // xmlhttp.send();
            // var dateStr = xmlhttp.getResponseHeader('Date');

            var dateStr = new Date()

            const { people, people_meetings } = meetings.app.models;
            const [err, meetingById] = await to(meetings.findById(meetingId));
            if (err) {
                console.log(err);
                return cb(err, null);
            }
            let meeting = JSON.parse(JSON.stringify(meetingById))

            if (!meeting) return cb({ msg: "הפגישה אינה קיימת" }, null)
            const { max_participants, participants_num, isOpen, code } = meeting;
            const newParticipantsCount = participants_num
                ? Number(participants_num) + Number(participantsCount)
                : Number(participantsCount);

            if (!!!isOpen) {
                if (String(code) !== String(myCode)) {
                    return cb({ msg: 'קוד ההצטרפות שגוי' }, null)
                }
            }


            var date = meeting.date.split(' ').pop().split('.').map(Number);
            let threeHours = Number(String(dateStr).split(' ')[4].split(':')[0] + String(dateStr).split(' ')[4].split(':')[1])
            let meetingTime = Number(meeting.time.replace(':', ''))
            let currentTime = threeHours + 300
            if (date[2] < new Date(dateStr).getFullYear()) {
                console.log('1', date[2], new Date(dateStr).getFullYear())
                return cb({ msg: 'עבר זמן המפגש' }, null)
            }
            if (date[2] === new Date(dateStr).getFullYear() && date[1] < new Date(dateStr).getMonth() + 1) {
                console.log('2', date[1], new Date(dateStr).getMonth() + 1)
                return cb({ msg: 'עבר זמן המפגש' }, null)
            }

            if (date[2] === new Date(dateStr).getFullYear() && date[1] === new Date(dateStr).getMonth() + 1 && date[0] < new Date(dateStr).getDate()) {
                console.log('3', date[0], new Date(dateStr).getDate())
                return cb({ msg: 'עבר זמן המפגש' }, null)
            }

            if (date[2] === new Date(dateStr).getFullYear() && date[1] === new Date(dateStr).getMonth() + 1 && date[0] === new Date(dateStr).getDate() && meetingTime - currentTime < -10) {
                console.log('4', meetingTime, currentTime)
                return cb({ msg: 'עבר זמן המפגש' }, null)
            }

            if (max_participants && max_participants < newParticipantsCount) { cb({ msg: "המפגש מלא" }, null); return; }
            let person;
            let [err1, user0] = await to(people.findOne({ where: { email: email } }))
            if (err1) {
                console.log("err", err1)
                return cb(err1)
            }
            if (!user0) {
                if (!!!name) { cb({ msg: 'אנא מלא/י שם' }, null); return; }
                if (!!!email) { cb({ msg: 'אנא מלא/י דואר אלטקרוני' }, null); return; }
                if (!!!phone) { cb({ msg: 'אנא מלא/י מספר טלפון' }, null); return; }
                const validateEmail = /^(.+)@(.+){2,}\.(.+){2,}$/
                const validatePhone = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{2,4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,4})/
                if (!validateEmail.test(email)) { cb({ msg: 'הדואר האלקטרוני אינו תקין, האימייל חייב להיות בסיומת של gmail.com' }, null); return; }
                if (!validatePhone.test(phone)) { cb({ msg: 'מספר הטלפון אינו תקין' }, null); return; }
                let whitelist = {
                    name: true, email: true, phone: true
                };
                let valid = ValidateTools.runValidate({ email: email, name: name, phone: phone }, ValidateRules.people, whitelist);
                console.log("valid", valid)
                if (!valid.success || valid.errors) {
                    return cb(valid.errors, null);
                }
                let [err1, user] = await to(people.create(valid.data))
                if (err1) {
                    console.log("err1", err1)
                    return cb(err1)
                }
                person = user
            } else {
                if (meeting.owner === user0.id) { cb({ msg: 'מארח/ת המפגש לא יכול להצטרף למפגש כמשתתף' }, null); return; }
                person = user0
            }

            let [err3, res] = await to(people_meetings.create({ person: person.id, meeting: Number(meetingId) }));
            if (err3) {
                console.log(err3);
                return cb(err3, null);
            }

            let shalom = mailDetails
            let sendOptions = {}
            if (meeting.language !== 'עברית') {

                sendOptions = {
                    to: email, subject: "Meet-up registration confirmed", html:
                        `
                    <div style = 'width: 100%; max-width: 98vw; color: white !important; height: fit-content ;  padding-bottom: 30px;
                    background-color: #082551; direction: rtl'>
                    <div style = 'display:flex ; width: 100%' >
                        <div style='width:100%;' >
                            <img style='margin-right: 10%; margin-top: 10%;' width='60%' src="https://i.ibb.co/VqRC2ZS/green-Background.png" > 
                        </div>
                            <div style='width: 30%;' >
                                <img width='100%' src="https://i.ibb.co/FByFZfx/New-Project-3-1.png"  > 
                        </div>
                            </div>
                            <div style='color: white !important; font-size: 20px; width: 73%; margin: auto; margin-top: 20px; direction: ltr; '>
                           Hello,<br>
                           We would like to thank you for choosing to participate in one of the "Connect2Care" meet-ups on this coming Yom Hazikaron.<br><br>
                           Your participation means so much, even more than in previous years, gives strength to bereaved families, and widens the circle of commemoration.<br><br>
                           So how does it work?<br><br>
                           In the coming days we will send you a link for the Zoom meet up in memory of ${shalom.fallensText}.  All that's left to do is to click on the link in zoom on ${shalom.date} at ${shalom.time}.<br><br>
                           Want to invite friends to join the meet-up? Sounds great!<br>
                           Just share the link with your family and friends, neighbors and colleagues, and on all social media platforms,<br>
                           so that everyone can participate in Yom Hazikaron events.<br><br>
                           Ideas? Suggestions? Questions or comments?<br>
                           We are here to help.<br><br>
                           See you soon,
                           <br>
                           Connect2Care Team.<br>
                           </div>
    
                   
                      </div>
                           ` }
            } else {
                sendOptions = {

                    to: email, subject: "הרשמתך למפגש התקבלה", html:
                        `
                        <body style="background-image: url('./assets/emailPhoto2.jfif');
        background-repeat: no-repeat; background-attachment: fixed;
        background-position: center; background-size:100% 100%">
    <div
        style='width: 100%; max-width: 98vw; height: fit-content ;  padding-bottom: 30px; direction: rtl; text-align: center; font-family: Arial'>
        <div
            style="margin-top: 20px; color: rgb(30, 43, 78); padding-left: 10vw; padding-right: 10vw; font-size: 15px;">
            <h2 style="text-decoration: underline;">הרשמתך למפגש התקבלה - 'מתחברים וזוכרים'</h2>

            <div style="padding-top: 10px;">
                <div style="padding-top: 10px;">שלום </div>

                <div style="padding-top: 10px;">אנחנו רוצים לומר תודה על שבחרת להשתתף באחד ממפגשי 'מתחברים וזוכרים' ביום הזיכרון הקרוב. </div>

                <div>ההשתתפות שלך משמעותית, מחזקת את משפחות הנופלים ומרחיבה את מעגל ההנצחה.</div>

                <div style="padding-top: 10px; font-weight: bold;">אז איך זה עובד?</div>

                <div style="padding-top: 10px;">שעות לפני פתיחת המפגש ישלח לך קישור למפגש לזכר X ז"ל בזום ZOOM.</div>

                <div>כל שנותר לך לעשות, הוא להיכנס לקישור ב ${meeting.date} בשעה ${meeting.time}</div>

                <div style="padding-top: 20px"><strong>רוצה להזמין אחרים להשתתף איתך במפגש?</strong> אנחנו בעד!</div>

                <div style="padding-top: 10px">ניתן לשתף <a target="blank" href="${meeting.zoomId}">בלינק</a>
                    משפחה וחברים, שכנים וחברים מהעבודה, וגם ברשתות החברתיות,
                    כך שאירועי יום הזיכרון יהיו שייכים לכולם.

                </div>

                <div style="padding-top: 10px">אנחנו כאן לכל שאלה,</div>

                <div style="padding-top: 20px;">להתראות בקרוב,</div>

                <div>צוות 'מתחברים וזוכרים'</div>
            </div>
        </div>
    </div>
</body>
                ` }
            }

            sendEmail(sendOptions);

            if (date[0] === new Date(dateStr).getDate() && date[1] === new Date(dateStr).getMonth() + 1 && date[2] === new Date(dateStr).getFullYear() && meetingTime - currentTime < 300 && meetingTime - currentTime >= -10) {

                sendEmail({
                    to: email,
                    subject: "קישור זום למפגש",
                    html: `<h1>זהו קישור הזום למפגש אליו נרשמת, עליך להכנס איתו למפגש  "${meeting.name}" ב${meeting.date} ${meeting.time}<br> ${meeting.zoomId}</h1>`,
                });
            }

            let [err4, meetingsRes] = await to(meetings.upsertWithWhere({ id: Number(meetingId) }, { participants_num: newParticipantsCount }));
            if (err4) {
                console.log(err4);
                return cb(err4, null);
            }

            return cb(null, { participantsNum: newParticipantsCount });
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
            { arg: 'mailDetails', type: 'object', required: true },
            { arg: 'participantsCount', type: 'string', required: true }
        ],
        returns: { type: "object", root: true },
        http: { path: "/AddPersonToMeeting/:meetingId", verb: "post" }
    });

    meetings.SendShareEmail = (senderName, sendOptions, cb) => {
        (async () => {
            console.log(process.env.TEST, process.env.TEST)
            sendEmail(sendOptions);
            cb(null, { res: process.env.TEST })
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
                let sendOptions = {}

                if (meeting && meeting.language !== 'עברית') {
                    sendOptions = {
                        to: sendTo, subject: "Meeting canceled", html:
                            `<div style='direction: ltr;'>The initiator of the meet-up "${meeting.name}" has canceld the meet-up. We're sorry.</div>`
                    }
                } else {
                    sendOptions = {
                        to: sendTo, subject: "מפגש התבטל", html:
                            `<div style='direction: rtl;'>יוצר המפגש ${meeting.name} בחר לבטל את המפגש לזכר ${fallensNames} עמך הסליחה.</div>`
                    }
                }


                sendEmail(sendOptions);

                // people.destroyAll(where, (err4, res2) => {
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


    meetings.approveMeeting = (email, phone, id, nameOwner, cb) => {
        (async () => {
            const newEmail = changeEmail(phone);
            let [err1, res] = await to(meetings.upsertWithWhere({ id: id }, { "approved": 1 }))
            if (err1) {
                console.log("err1", err1)
                return cb(err1, false)
            }
            let code = res.code ? res.language !== 'עברית' ? `The code for online sign-up is: ${res.code}` : `קוד המפגש להרשמה באתר: ${res.code}` : ''
            const [err2] = await createZoomUser(newEmail, nameOwner);
            if (err2) {
                return cb(err2, false)
            }
            let sendOptions = {}
            if (res.language !== 'עברית' && res.language) {
                sendOptions = {
                    to: email, subject: "The meet-up you initiated has been approved",
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
                                    <a href="https://connect2care.ourbrothers.co.il/#/meeting/${res.id}" target="_blank">To the meeting</a>
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
                            OurBrothers2021 <br>
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
                                    <br>Connect2Care Team.
                                </div>
                                <div
                                style="text-align: center; color: rgb(30, 43, 78);">
                                For technical support: <br>
                                052-6283967 | Amdocs.Digital@glassix.net
                                </div>
                            </div>
                            `
                }

            } else {
                sendOptions = {
                    to: email, subject: "המפגש שיצרת אושר",
                    html:
                        `
                    <body style="background-image: url('./assets/emailPhoto2.jfif');
    background-repeat: no-repeat; background-attachment: fixed;
    background-position: center; background-size:100% 100%">
    <div width="100%" style="direction: rtl; font-family: Arial">
        <div
            style="text-align: center; margin-top: 20px; color: rgb(30, 43, 78); padding-left: 10vw; padding-right: 10vw; font-size: 15px;">
            <div style="font-weight: bold; margin-bottom: 20px;">
                המפגש שלך אושר!<br><br>
                אנחנו מעריכים ומודים לך, על שבחרת לארח מפגש יום זיכרון של 'מתחברים וזוכרים'.<br>בזכותך זכינו להעניק
                חיבוק של
                זיכרון והערכה לאלו שנפלו למעננו, ולהראות שגם השנה, למרות הקושי, לא שכחנו.
            </div>
            <a href="https://connect2care.ourbrothers.co.il/#/meeting/${res.id}" target="_blank">להצגת פרטי המפגש</a>
            <br>

            <div
                style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">
                מידע הכרחי לקיום המפגשים:
            </div>

            <div>נשלח אליך מייל הפעלת חשבון מ zoom. החשבון זה הוא יעודי עבורך למפגש שיצרת.</div>

            <div>
                יש לך כבר חשבון zoom? לא רלוונטי לצערנו. שים לב שעבור המפגש תצטרך להשתמש בחשבון זמני.
                <br>
                למה? בזכות שיתוף פעולה עם חברת zoom לכל המשתתפים במפגש החשבון לא תהיה מגבלת זמן מפגש (pro).
            </div>

            <div>תוכל להקליט אותו, ולהשתמש בכל ההטבות של החשבון - בחינם.</div>

            <div style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">
                איך זה עובד?
            </div>
            <div>
                <div  style="padding-top: 1%;">א. ביום המפגש תקבל מאיתנו מייל עם לינק למפגש</div>

                <div  style="padding-top: 1%;">ב. יש להכנס ללינק כמה שעות קודם עם שם המשתמש: והסיסמה: OurBrothers2021</div>

                <div  style="padding-top: 1%;">ג. חשוב מאוד! לא להתחבר עם המשתמש זום הקיים שלך, רק עם המשתמש שיצרנו לך והסיסמה שקיבלת.</div>
            </div>


            <div style="font-weight: bold; color: rgb(71, 129, 177); margin-top: 20px; margin-bottom: 20px; font-size: 20px;">
                איך יוצרים מפגש מעולה:
            </div>

            <div>
                הסדנה תועבר ב-zoom על ידי מומחים בהעברת הרצאות zoom ובתחומי התוכן והדיגיטל.
                <br>
                מומלץ מאוד!
            </div>

            <div style="font-weight: bold; padding-top: 10px;" >
                אנחנו יודעים שבטוח יש לך שאלות, התלבטויות ואפילו חששות לקראת המפגש,
                <br>
                ובדיוק בגלל זה הכנו עבורך את הסדנה המושלמת שתעשה לך סדר.
                    <div style="font-weight: bold; padding-top: 1%;">סדנת הכנה בזום</div>
            </div>

            <div>מועדי הסדנאות מתחלקים בין מועדי הכנה למובילי מפגש בזום ובין מועדי סדנה הכנת למפגשים פרונטליים - 4 סדנאות בתאריכים ושעות
            שונות בתאריכים: 4-5.4.2021 - בוקר+ ערב</div>

            <div style="font-weight: bold">  להשתבצות לסדנה לחץ <a target="blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdysCMih5-VnB241KuP9zFbLyju9NqShDwntZHpBcUsGntqLg/viewform">כאן</a></div>

            <div style="font-weight: bold; padding-top: 10px;">ערכת הכנה</div>

            <div>ערכה מקיפה, קצרה, ושימושית לקיום מפגשים מוצלחים</div>

            <div style="font-weight: bold; padding-top: 10px;">
                <a target="blank" href="">ערכת תוכן להובלת מפגש זיכרון</a>
            </div>

            <div style="font-weight: bold; padding-top: 10px;">הזמנת משתתפים</div>

            <div style="padding-top: 10px">הכנו לך כאן חומרים להפצה ושליחה אותם תוכל להפיץ לכל מי שתרצה. חשוב לרתום בני משפחה וחברים קרובים ורחוקים. קל ונעים
                הרבה
                יותר לנהל מפגש עם קהל קרוב.</div>

            <div style="font-weight: bold; text-decoration: underline; padding-top: 15px;">
                איך מזמינים אנשים למפגשים?
                הזמנת משתתפים למפגש > באמצעות לינק
            </div>

            <div style="font-weight: bold">
                -מפגש פתוח לקהל הרחב-
            </div>

            <div>
                יש לשלוח כתובת URL עם מס' המפגש המופיע שם > מי שמקבל את הקישור נכנס לעמוד של מתחברים וזוכרים ושם נרשם בצד שמאל להשתתפות
                במפגש.
            </div>

            <div style="font-weight: bold">
                -מפגש סגור לקהל ספציפי -
            </div>

            <div>
                קוד מפגש > זה הקוד שאתה מזמין איתו משתתפים להירשם.
            </div>

            <div
                style="font-weight: bold; text-align: center; margin-top: 20px; margin-bottom: 20px; color: rgb(30, 43, 78);">
                להתראות בקרוב,<br>צוות 'מתחברים וזוכרים'</div>

            <div style="text-align: center; color: rgb(30, 43, 78);">
                שאלות נוספות? משהו לא ברור?: <br>
                zikaron@ourbrothers.org
            </div>

            <div style="text-align: center; color: rgb(30, 43, 78); padding-top: 10px;">
                לתמיכה טכנית: <br>
                052-6283967 | Amdocs.Digital@glassix.net
            </div>
        </div>
    </body>
                `
                }
            }

            console.log('sending a meeting approval to', sendOptions.to);
            sendEmail(sendOptions);
            return cb(null, true)
        })()
    }

    meetings.remoteMethod('approveMeeting', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'email', type: 'string', required: true },
            { arg: 'phone', type: 'string', required: true },
            { arg: 'id', type: 'number', required: true },
            { arg: 'nameOwner', type: 'string', required: true },],
        returns: { arg: 'res', type: 'boolean', root: true }
    })

    meetings.get38Meetings = (cb) => {
        // console.log('meetings', meetings);
        (async () => {
            let [err, res] = await to(meetings.find(
                {
                    "where": { "approved": 1, "date": { like: "%2021%" } },
                    "fields": { "id": true, "zoomId": false },
                    "include": [{ "relation": "fallens", "scope": { "fields": { "image_link": true } } }],
                    "limit": "38"
                }))
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
            where match(name) against ('"??"')`, [newName], (err, res) => {
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
            const newEmail = changeEmail(email);

            const [err] = await createZoomUser(newEmail, nameOwner)

            return cb(err, !err);
        })()
    }

    meetings.remoteMethod('newZoom', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'email', type: 'string', required: true },
            { arg: 'nameOwner', type: 'string', required: true },],
        returns: { arg: 'res', type: 'boolean', root: true }
    })

    meetings.createZoom = (email, date, time, meetingId, cb) => {
        (async () => {
            const newEmail = changeEmail(email);
            const startTime = changeDateTime(date, time);
            scheduleMeeting(async (url, error) => {
                if (error) {
                    return cb(error);
                }
                if (url && url !== undefined) {
                    let [err, res] = await to(meetings.upsertWithWhere({ id: meetingId }, { zoomId: url }));
                    if (err) {
                        console.log(err)
                        return cb(err)
                    }
                }
                return cb(null, url)

            }, newEmail, startTime)
        })()
    }

    meetings.remoteMethod('createZoom', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'email', type: 'string', required: true },
            { arg: 'date', type: 'string', required: true },
            { arg: 'time', type: 'string', required: true },
            { arg: 'meetingId', type: 'number', required: true },
        ],
        returns: { arg: 'res', type: 'object', root: true }
    })

    meetings.getParticipants = (id, cb) => {
        (async () => {
            let [err, res] = await to(meetings.findById(id, { include: { relation: "people_meetings", scope: { include: "people" } } }))
            if (err) {
                return cb(err)
            }
            let people_meetings = JSON.parse(JSON.stringify(res)).people_meetings
            let people = []
            for (let i of people_meetings) {
                i.people.isPanelist = i.isPanelist
                people.push(i.people)
            }
            people = people.sort((p1, p2) => {
                if (p1.isPanelist && p2.isPanelist || !p1.isPanelist && !p2.isPanelist) {
                    if (p1.name > p2.name) return 1
                    return -1
                }
                if (p1.isPanelist && !p1.isPanelist) {
                    return 1
                }
                return -1

            })
            people.push(res.max_participants)
            people.push(res.zoomId !== null && res.zoomId !== '')
            return cb(null, people)
        })()
    }

    meetings.remoteMethod('getParticipants', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'id', type: 'number', required: true }],
        returns: { arg: 'res', type: 'object', root: true }
    })

    meetings.deleteParticipant = (meetingId, participantId, cb) => {
        (async () => {
            let [error, meeting] = await to(meetings.findById(meetingId))
            if (error) {
                return cb(err)
            }
            await to(meetings.upsertWithWhere({ id: meetingId }, { participants_num: meeting.participants_num - 1 }))
            const people_meetings = meetings.app.models.people_meetings
            let [err, res] = await to(people_meetings.destroyAll({ meeting: meetingId, person: participantId }))
            if (err) {
                return cb(err)
            }
            console.log("process.env.TEST", process.env.TEST)
            let x = { "process.env.TEST": process.env.TEST }
            return cb(null, x)
        })()
    }

    meetings.remoteMethod('deleteParticipant', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'meetingId', type: 'number', required: true },
            { arg: 'participantId', type: 'number', required: true }
        ],
        returns: { arg: 'res', type: 'object', root: true }
    })

    meetings.setPanelistStatus = (meetingId, participantId, isPanelist, participantName, participantEmail, zoomId, cb) => {
        (async () => {
            const people_meetings = meetings.app.models.people_meetings
            let [err, res] = await to(people_meetings.upsertWithWhere({ meeting: meetingId, person: participantId }, { isPanelist: isPanelist }))
            if (err) {
                return cb(err)
            }
            if (res) {
                console.log(zoomId)
                let webinarId = zoomId.split('/')[4].split('?')[0]
                console.log(isPanelist, webinarId, participantName, participantEmail, zoomId)
                isPanelist ? addPanelists(participantEmail, participantName, webinarId) : removePanelists(participantEmail, participantName, webinarId)
                return cb(null, true)
            }
        })()
    }

    meetings.remoteMethod('setPanelistStatus', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'meetingId', type: 'number', required: true },
            { arg: 'participantId', type: 'number', required: true },
            { arg: 'isPanelist', type: 'boolean', required: true },
            { arg: 'participantName', type: 'string', required: true },
            { arg: 'participantEmail', type: 'string', required: true },
            { arg: 'zoomId', type: 'string', required: true },

        ],
        returns: { arg: 'res', type: 'boolean', root: true }
    })

    meetings.sendMailHost = (time, date, meetingId = null, cb) => {
        (async () => {
            const [err, meetings1] = !meetingId ? await to(meetings.find({ where: { and: [{ and: [{ zoomId: { neq: null } }, { zoomId: { neq: '' } }] }, { approved: true }, { date: date }, { time: time }] }, include: ["people", "meetingOwner"] })) : await to(meetings.find({ where: { and: [{ and: [{ zoomId: { neq: null } }, { zoomId: { neq: '' } }] }, { approved: true }, { date: date }, { time: time }, { id: meetingId }] }, include: ["people", "meetingOwner"] }))

            if (err) {
                return cb(err)
            }
            if (meetings1) {
                console.log("sendMailHost", meetings1);
                meetings1.forEach(meeting => {
                    const { people, meetingOwner } = JSON.parse(JSON.stringify(meeting));
                    // add datas and columns:
                    let columns = { name: 'שם המשתתף', email: 'אימייל המשתתף' };
                    let datas = [];
                    let link = meeting.zoomId.replace('j', 's')
                    const emailZoom = changeEmail(meetingOwner.phone);
                    let htmlMessage = meeting.language !== 'heb'
                        ? `<div style="direction: rtl;">
                            <div>
                                זהו קישור הזום למפגש שיצרת שעליך להכנס איתו למפגש "${meeting.name}"<br>${link}<br><br>
                                <strong>טרם המפגש עליך להתנתק מכל חשבונות הזום אליהם אתה מחובר ולהתחבר עם חשבון הזום אותו יצרנו עבורך.</strong><br><br>
                                <strong>התחבר עם האימייל והסיסמה:</strong><br>
                                אימייל: ${emailZoom} <br>
                                סיסמה: הסיסמה איתה ביצעת אקטיבציה לחשבון זום, אנחנו המלצנו על הסיסמה "OurBrothers2021" <br>
                                לאחר שעשית זאת לחץ על הלינק המצורף והפגישה תחל.
                                <br><br>
                                בקובץ המצורף ישנה רשימת כל המשתתפים שנרשמו למפגש שיצרת נכון לזמן שליחת מייל זה.
                            </div>
                            <div width="100%" style="text-align: center; margin-top: 20px; padding: 15px; color: white; background-color: rgb(30, 43, 78);">
                                <div style="font-weight: bold;">
                                    לתמיכה טכנית: <br>
                                    052-6283967 | Amdocs.Digital@glassix.net
                                </div>
                            </div>
                        </div>`
                        : `<div style="direction: rtl;">
                            <div>
                                זהו קישור הזום למפגש שיצרת שעליך להכנס איתו למפגש "${meeting.name}"<br>${link}<br><br>
                                <strong>טרם המפגש עליך להתנתק מכל חשבונות הזום אליהם אתה מחובר ולהתחבר עם חשבון הזום אותו יצרנו עבורך.</strong><br><br>
                                <strong>התחבר עם האימייל והסיסמה:</strong><br>
                                אימייל: ${emailZoom} <br>
                                סיסמה: הסיסמה איתה ביצעת אקטיבציה לחשבון זום, אנחנו המלצנו על הסיסמה "OurBrothers2021" <br>
                                לאחר שעשית זאת לחץ על הלינק המצורף והפגישה תחל.
                                <br><br>
                                בקובץ המצורף ישנה רשימת כל המשתתפים שנרשמו למפגש שיצרת נכון לזמן שליחת מייל זה.
                            </div>
                            <div width="100%" style="text-align: center; margin-top: 20px; padding: 15px; color: white; background-color: rgb(30, 43, 78);">
                                <div style="font-weight: bold;">
                                    לתמיכה טכנית: <br>
                                    052-6283967 | Amdocs.Digital@glassix.net
                                </div>
                            </div>
                        </div>`

                    if (people && people.length > 0) {
                        people.forEach((man, index) => {
                            datas.push({ name: man.name, email: man.email })
                        })
                    }

                    const emailOptions = {
                        to: meetingOwner.email, subject: "קישור זום למפגש", html: htmlMessage
                    }
                    if (datas.length > 0) {
                        emailOptions.attachments = [
                            {
                                content: Buffer.from(creatCsvFile(datas, columns)).toString("base64"),
                                // add file name:
                                filename: "משתתפים.csv",
                                type: "application/csv",
                                disposition: "attachment"
                            }
                        ]
                    }
                    sendEmail(emailOptions);
                });
            }
            return cb(null, {})
        })()
    }

    meetings.remoteMethod('sendMailHost', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'time', type: 'string', required: true },
            { arg: 'date', type: 'string', required: true },
            { arg: 'meetingId', type: 'number', required: false }
        ],
        returns: { arg: 'res', type: 'object', root: true }
    })

    meetings.sendMailParticipants = (time, date, meetingId = null, cb) => {
        (async () => {
            const [err, meetings1] = !meetingId ? await to(meetings.find({ where: { and: [{ and: [{ zoomId: { neq: null } }, { zoomId: { neq: '' } }] }, { approved: true }, { date: date }, { time: time }] }, include: ["people", "meetingOwner"] })) : await to(meetings.find({ where: { and: [{ and: [{ zoomId: { neq: null } }, { zoomId: { neq: '' } }] }, { approved: true }, { date: date }, { time: time }, { id: meetingId }] }, include: ["people", "meetingOwner"] }))
            if (err) {
                return cb(err)
            }
            if (meetings1) {
                console.log("sendMailParticipants", meetings1);
                meetings1.forEach(meeting => {
                    const { people } = JSON.parse(JSON.stringify(meeting));
                    let htmlMessage = meeting.language !== 'heb'
                    ? `<body style="background-image: url('./assets/emailPhoto2.jfif');
                        background-repeat: no-repeat; background-attachment: fixed;
                        background-position: center; background-size:100% 100%">
                        <div style='width: 100%; max-width: 98vw; height: fit-content ;  padding-bottom: 30px; direction: rtl; text-align: center; font-family: Arial'>
                            <div style="margin-top: 20px; color: rgb(30, 43, 78); padding-left: 10vw; padding-right: 10vw; font-size: 15px;">
                                <h2 style="text-decoration: underline;">קישור למפגש - 'מתחברים וזוכרים'</h2>
                                <div style="padding-top: 10px;">
                                    <div style="padding-top: 10px;">שלום </div>
                                    <div style="padding-top: 10px;">מצורף קישור למפגש של: ${meeting.name} </div>
                                    <div style="padding-top: 10px;">מצורף קישור למפגש של: ${meeting.date} בשעה ${meeting.time}</div>
                                    <div style="padding-top: 10px;">להלן הקישור למפגש זום ${meeting.zoomId}</div>
                                    <div style="padding-top: 20px;">מטעמי אבטחה, על מנת להצטרף לפגישה בכניסה למפגש יהיה עליך למלא את שמך וכתובת המייל שלך.</div>
                                    <div>כך גם נוכל לדעת מי נמצא כאן איתנו, כדי לתת לנו חיבוק!</div>
                                    <div style="padding-top: 20px;">רוצה לשמור את המפגש אצלך ביומן ?</div>
                                    <div>*אין לשמור את המפגש אוטומטית דרך יומן גוגל וזום</div>
                                    <div>יש להעתיק את הקישור ולהדביק בפגישה, אותה פותחים ידנית באופן עצמאי, אצלך ביומן של גוגל.</div>
                                    <div style="padding-top: 20px;">תודה</div>
                                    <div>צוות 'מתחברים וזוכרים'</div>
                                </div>
                            </div>
                        </div>
                    </body>`
                    : `<div style="direction: rtl;">
                        שלום <br>
                        מצורף קישור למפגש של: ${meeting.name}<br>
                        בתאריך: ${meeting.date}<br>
                        בשעה: ${meeting.time}<br><br>
                        להלן הקישור: ${meeting.zoomId}<br><br>
                        מטעמי אבטחה, על מנת להצטרף לפגישה<br>
                        בכניסה למפגש יהיה עליכם למלא את שמכם וכתובת המייל שלכם.<br>
                        כך גם נוכל לדעת מי נמצא כאן איתנו , לתת לנו חיבוק!<br><br>
                        כמו כן, רוצים לשמור את המפגש אצלכם ביומן?<br>
                        העתיקו את הקישור והדביקו אותו בפגישה שתפתחו ידנית.<br>
                        <strong>אין</strong>  לשמור את המפגש אוטמטית דרך יומן גוגל וזום<br><br>
                        תודה<br>
                        צוות מתחברים וזוכרים
                    </div>`

                    if (people && people.length > 0) {
                        people.forEach(human => {
                            sendEmail({
                                to: human.email, subject: "קישור זום למפגש", html: htmlMessage,
                            });
                        });
                    }
                });
            }
            return cb(null, {})
        })()
    }

    meetings.remoteMethod('sendMailParticipants', {
        http: { verb: 'post' },
        accepts: [
            { arg: 'time', type: 'string', required: true },
            { arg: 'date', type: 'string', required: true },
            { arg: 'meetingId', type: 'number', required: false }
        ],
        returns: { arg: 'res', type: 'object', root: true }
    })

};