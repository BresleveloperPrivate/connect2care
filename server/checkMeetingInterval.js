'use strict';
const scheduleWebinar = require('./scheduleWebinar.js');
const sendEmail = require('./email');
const schedule = require('node-schedule');
const createZoomUser = require('./createZoomUser.js');

module.exports = function (app) {
    const to = (promise) => {
        return promise.then(data => {
            return [null, data];
        })
            .catch(err => [err]);
    }

    for (let hour = 0; hour < 24; hour += 1) {
        const rule = new schedule.RecurrenceRule();

        rule.year = new Date().getFullYear();
        rule.hour = hour;
        rule.minute = 0;
        rule.second = 0;
        rule.tz = "Asia/Jerusalem";

        schedule.scheduleJob(rule, () => {
            (async () => {
                try {
                    const [err, meetings] = await to(app.models.meetings.find({ where: { and: [{ or: [{ zoomId: '' }, { zoomId: null }] }, { approved: true }] }, include: "meetingOwner" }))
                    meetings.forEach(meeting => {
                        // console.log("xxxxxxxxxxxxxxxxxxxxxxx")
                        // console.log(meeting);
                        let jsdata = JSON.parse(JSON.stringify(meeting))
                        if (jsdata && jsdata.meetingOwner.email && jsdata.date) {
                            let email = jsdata.meetingOwner.email.replace("@", "+c2c@");
                            let start_time = null; //"2020-09-20T20:00:00"
                            switch (jsdata.date) {
                                case 'יום רביעי, ה באייר, 29.04':
                                    start_time = "2020-04-30T01:59:00"
                                    break;
                                case 'יום שלישי, ד באייר, 28.04':
                                    start_time = "2020-04-29T01:59:00"
                                    break;
                                case 'יום שני, ג באייר, 27.04':
                                    start_time = "2020-04-28T01:59:00"
                                    break;
                                case 'יום ראשון, ב באייר, 26.04':
                                    start_time = "2020-04-27T01:59:00"
                                    break;
                                default:
                                    start_time = "2020-05-05T01:59:00"
                                    break;
                            }
                            scheduleWebinar(async (url) => {
                                console.log("url", url)
                                if (url && url !== undefined) {
                                    // let [err, res] = await to(app.models.meetings.upsertWithWhere({ id: meetingId }, { participants_num: meeting.participants_num - 1 }))
                                    let [err, res] = await to(app.models.meetings.upsertWithWhere({ id: meeting.id }, { zoomId: url }));
                                    if (err) {
                                        console.log(err)
                                    }
                                }
                                else {
                                    if (hour == 8 || hour == 16) {
                                        createZoomUser(email, jsdata.meetingOwner.name, (toSend) => {
                                            if (toSend) {
                                                sendEmail("", {
                                                    to: jsdata.meetingOwner.email, subject: "עליך לבצע אקטיבציה", html: `<h1>נראה שלא ביצעת אקטיבציה לחשבון הזום שיצרנו לך ובהתאם לכך לא הצלחנו ליצור לך פגישת זום. עליך לבצע אקטיבציה בהקדם. כל שעליך לעשות הוא להכנס למייל של זום המצורף, ולהפעיל את החשבון על ידי הכנסת סיסמה. </h1>`,
                                                });
                                            }
                                        })
                                    }

                                }
                            }, email, start_time)
                        }
                    });


                } catch (err) {
                    console.error(err);
                }
            })();
        });
    }
}