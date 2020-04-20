'use strict';
const scheduleWebinar = require('../../server/scheduleWebinar.js');

const schedule = require('node-schedule');

module.exports = function (app) {

    // for (let hour = 0; hour < 24; hour += 2) {
    for (let hour = 0; hour < 24; hour += 2) {
        const rule = new schedule.RecurrenceRule();

        rule.year = new Date().getFullYear();
        rule.hour = hour;
        rule.minute = 0;
        rule.second = 0;
        rule.tz = "Asia/Jerusalem";

        schedule.scheduleJob(rule, () => {
            (async () => {
                try {
                    const meetings = await app.models.meetings.find({ where: { and: [{ or: [{ zoomId: '' }, { zoomId: null }] }, { approved: true }] }, include: "meetingOwner" });
                    meetings.forEach(meeting => {
                        console.log("xxxxxxxxxxxxxxxxxxxxxxx")
                        // console.log(meeting);
                        let jsdata = JSON.parse(JSON.stringify(meetings))
                        if (jsdata.meetingOwner.email && jsdata.date) {
                            let email = jsdata.meetingOwner.email.replace("@", "+c2c@");
                            let start_time = null;
                            //"start_time": "2020-09-20T20:00:00"
                            //enum('יום ראשון, ב באייר, 26.04','יום שני, ג באייר, 27.04','יום שלישי, ד באייר, 28.04','יום רביעי, ה באייר, 29.04')
                            switch (jsdata.date) {
                                case 'יום רביעי, ה באייר, 29.04':
                                    start_time = "2020-04-29T01:00:00"
                                    break;
                                case 'יום שלישי, ד באייר, 28.04':
                                    start_time = "2020-04-28T01:00:00"
                                    break;
                                case 'יום שני, ג באייר, 27.04':
                                    start_time = "2020-04-27T01:00:00"
                                    break;
                                case 'יום ראשון, ב באייר, 26.04':
                                    start_time = "2020-05-01T01:00:00"
                                    break;
                                default:
                                    start_time = "2020-05-05T01:00:00"
                                    break;
                            }
                            console.log("TTTTTTTT", start_time, email)
                            scheduleWebinar((url) => {
                                console.log("url", url)
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