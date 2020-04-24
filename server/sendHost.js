'use strict';

const schedule = require('node-schedule');
const { creatCsvFile } = require('download-csv');
const sendEmail = require('./email');

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

        schedule.scheduleJob(rule, () => {
            (async () => {
                try {
                    let day = new Date().getDay()
                    let f_day = null
                    console.log(day, typeof day)
                    switch (day) {
                        case 2:
                            f_day = 'יום רביעי, ה באייר, 29.04'
                            break;
                        case 1:
                            f_day = 'יום שלישי, ד באייר, 28.04'
                            break;
                        case 0:
                            f_day = 'יום שני, ג באייר, 27.04'
                            break;
                        case 7:
                            f_day = 'יום ראשון, ב באייר, 26.04'
                            break;
                        default:
                            f_day = 'יום ראשון, ב באייר, 26.04'
                            break;
                    }
                    const [err, meetings] = await to(app.models.meetings.find({ where: { and: [{ or: [{ zoomId: { neq: null } }, { zoomId: { neq: '' } }] }, { approved: true }, { date: f_day }] }, include: ["people", "meetingOwner"] }))

                    if (meetings) {
                        meetings.forEach(meeting => {
                            const { people, meetingOwner } = JSON.parse(JSON.stringify(meeting));
                            // add datas and columns:
                            const datas = [];
                            const columns = {};
                            try {
                                const attachment = Buffer.from(creatCsvFile(datas, columns)).toString("base64");
                                sendEmail("", {
                                    // add subject and html:
                                    to: meetingOwner.email, subject: "קישור זום למפגש", html: `<h1>זהו קישור הזום למפגש שיצרת שעליך להכנס איתו למפגש  ${meeting.name} <br> ${meeting.zoomId}</h1>`,
                                    // attachments: [
                                    //     {
                                    //         content: attachment,
                                    //         // add file name:
                                    //         filename: "משתתפים.csv",
                                    //         type: "application/csv",
                                    //         disposition: "attachment"
                                    //     }
                                    // ]
                                });
                            } catch (err) {
                                console.error(err);
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