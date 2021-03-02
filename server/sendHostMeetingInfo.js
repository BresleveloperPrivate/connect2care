'use strict';

const schedule = require('node-schedule');
const { creatCsvFile } = require('download-csv');
const sendEmail = require('./email');
const { meetingDates } = require('./common/dates');

module.exports = function (app) {
    const to = (promise) => {
        return promise.then(data => {
            return [null, data];
        })
            .catch(err => [err]);
    }

    for (let hour = 0; hour < 24; hour += 8) {
        const rule = new schedule.RecurrenceRule();

        rule.year = new Date().getFullYear();
        rule.hour = hour;
        rule.minute = 0;
        rule.second = 0;
        rule.tz = "Asia/Jerusalem";
        if (hour === 16) {
            schedule.scheduleJob(rule, () => {
                (async () => {
                    try {
                        const today = new Date()
                        const date = meetingDates.find((d) => {
                            const dateMap = d.split(' ').pop().split('.').map(Number);
                            return dateMap[0] === today.getDate()
                                && dateMap[1] === today.getMonth()
                                && dateMap[2] === today.getFullYear();
                        })
                        const [err, meetings] = await to(app.models.meetings.find({ where: { and: [{ and: [{ zoomId: { neq: null } }, { zoomId: { neq: '' } }] }, { approved: true }, { date: date }] }, include: ["people", "meetingOwner"] }))

                        if (meetings) {
                            meetings.forEach(meeting => {
                                const { people, meetingOwner } = JSON.parse(JSON.stringify(meeting));
                                // add datas and columns:
                                let columns = { name: 'שם המשתתף', email: 'אימייל המשתתף' };;
                                let datas = [];
                                let link = meeting.zoomId.replace('j', 's')
                                let emailZoom = meetingOwner.email.replace("@", "+c2c@");
                                if (people && people.length > 0) {
                                    people.forEach((man, index) => {
                                        datas.push({ name: man.name, email: man.email })
                                        if (index === people.length - 1) {
                                            try {
                                                const attachment = Buffer.from(creatCsvFile(datas, columns)).toString("base64");
                                                sendEmail("", {
                                                    // add subject and html:
                                                    to: meetingOwner.email, subject: "קישור זום למפגש", html:
                                                        `<div style="direction: rtl;">זהו קישור הזום למפגש שיצרת שעליך להכנס איתו למפגש "${meeting.name}"<br>${link}<br>
                                            טרם המפגש עליך להתנתק מכל חשבונות הזום אליהם אתה מחובר ולהתחבר עם חשבון הזום אותו יצרנו עבורך.<br> התחבר עם האימייל והסיסמה:
                                            <br>אימייל: ${emailZoom} <br>סיסמה: הסיסמה איתה ביצעת אקטיבציה לחשבון זום, אנחנו המלצנו על הסיסמה "OurBrothers2020" <br>
                                            לאחר שעשית זאת לחץ על הלינק המצורף והפגישה תחל.
                                            <br>
                                            בקובץ המצורף ישנה רשימת כל המשתתפים שנרשמו למפגש שיצרת נכון לזמן שליחת מייל זה.
                                            </div>`,
                                                    attachments: [
                                                        {
                                                            content: attachment,
                                                            // add file name:
                                                            filename: "משתתפים.csv",
                                                            type: "application/csv",
                                                            disposition: "attachment"
                                                        }
                                                    ]
                                                });
                                            } catch (err) {
                                                console.error(err);
                                            }
                                        }
                                    })
                                }
                                else {
                                    sendEmail("", {
                                        // add subject and html:
                                        to: meetingOwner.email, subject: "קישור זום למפגש", html:
                                            `<div style="direction: rtl;">זהו קישור הזום למפגש שיצרת שעליך להכנס איתו למפגש "${meeting.name}"<br>${link}<br>
                                טרם המפגש עליך להתנתק מכל חשבונות הזום אליהם אתה מחובר ולהתחבר עם חשבון הזום אותו יצרנו עבורך.<br> התחבר עם האימייל והסיסמה:
                                <br>אימייל: ${emailZoom} <br>סיסמה: הסיסמה איתה ביצעת אקטיבציה לחשבון זום, אנחנו המלצנו על הסיסמה "OurBrothers2020" <br>
                                לאחר שעשית זאת לחץ על הלינק המצורף והפגישה תחל.
                                <br>
                                נכון לרגע שליחת המייל, לא נרשמו משתתפים למפגש
                                </div>`
                                    });
                                }

                            });
                        }

                    } catch (err) {
                        console.error(err);
                    }
                })();
            });
        }
    }
}
