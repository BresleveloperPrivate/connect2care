'use strict';

const schedule = require('node-schedule');

module.exports = function (app) {

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
                    const meetings = await app.models.meetings.find({ where: { and: [{ zoomId: null }, { approved: true }] }, include: "meetingOwner" });

                    meetings.forEach(meeting => {
                        console.log(meeting);
                    });

                } catch (err) {
                    console.error(err);
                }
            })();
        });
    }
}