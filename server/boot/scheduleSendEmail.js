'use strict';

const schedule = require('node-schedule');

const validateRules = require('../lib/validateRules');
const sendEmail = require('../email');

module.exports = function (app) {
    const dates = validateRules.meetings.date.format.pattern.split("(").join("").split(")").join("").split("^").join("").split("|");

    dates.forEach(date => {

        const [dayDate, month] = date.split(" ")[date.split(" ").length - 1].split(".");

        const rule = new schedule.RecurrenceRule();

        rule.year = new Date().getFullYear();
        rule.month = Number(month) - 1;
        rule.date = Number(dayDate);
        rule.hour = 8;
        rule.minute = 0;
        rule.second = 0;
        rule.tz = "Asia/Jerusalem";

        schedule.scheduleJob(rule, () => {
            (async () => {
                try {
                    const meetings = await app.models.meetings.find({ where: { date }, include: "people" });

                    meetings.forEach(meeting => {

                        JSON.parse(JSON.stringify(meeting)).people.filter(({ email }) => !!email).forEach(({ email, name }) => {
                            const options = {
                                to: email,
                                subject: 'תזכורת למפגש מתחברים וזוכרים',
                                html: `<h1>הי ${name}, תזכורת: יש לך מפגש היום בשעה ${meeting.time}</h1>`
                            }
                            sendEmail("מתחברים וזוכרים", options);
                        });
                    });
                } catch (err) {
                    console.error(err);
                }
            })();
        });
    });
}