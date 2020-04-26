'use strict';

const schedule = require('node-schedule');
const sendEmail = require('./email');
const validateRules = require('./lib/validateRules');

Object.defineProperty(Array.prototype, 'flat', {
    value: function (depth = 1) {
        return this.reduce(function (flat, toFlatten) {
            return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
        }, []);
    }
});

module.exports = function (app) {
    const to = (promise) => {
        return promise.then(data => {
            return [null, data];
        })
            .catch(err => [err]);
    }

    const dates = validateRules.meetings.date.format.pattern.split("(").join("").split(")").join("").split("^").join("").split("|");

    dates.forEach(date => {

        const hours = [5, 8, 11, 14, 17, 20, 23];
        const minutes = ['00', '30'];

        hours.forEach(hour => {
            const nextHour = hour + 3;
            const rule = new schedule.RecurrenceRule();

            const nextHours = [];

            for (let index = nextHour; index < nextHour + 3; index++) {
                nextHours.push(index % 24);
            }

            const timeStrings = nextHours.map(hour => minutes.map(minute => `${hour}:${minute}`)).flat();
            const [dayDate, month] = date.split(" ")[date.split(" ").length - 1].split(".");

            rule.year = new Date().getFullYear();
            rule.month = Number(month) - 1;
            rule.date = Number(dayDate);
            rule.hour = hour;
            rule.minute = 0;
            rule.second = 0;
            rule.tz = "Asia/Jerusalem";

            schedule.scheduleJob(rule, () => {
                (async () => {
                    try {
                        const [errM, meetings] = await to(app.models.meetings.find({ where: { and: [{ and: [{ zoomId: { neq: null } }, { zoomId: { neq: '' } }] }, { or: timeStrings.map(time => ({ time })) }, { date }] }, include: ["people", "meetingOwner", "fallens"] }))
                        meetings.forEach(meeting => {
                            const { people, meetingOwner } = JSON.parse(JSON.stringify(meeting));
                            if (people && people.length > 0) {
                                people.forEach(human => {
                                    sendEmail("", {
                                        to: human.email, subject: "קישור זום למפגש", html: `<h1>זהו קישור הזום למפגש אליו נרשמת, עליך להכנס איתו למפגש  ${meeting.name} ב ${meeting.date} ${meeting.time}<br> ${meeting.zoomId}</h1>`,
                                    });
                                });
                            }
                        });
                    } catch (err) {
                        console.error(err);
                    }
                })();
            });
        });
    });
}
