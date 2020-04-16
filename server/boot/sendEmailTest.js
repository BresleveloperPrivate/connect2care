'use strict';

const schedule = require('node-schedule');

const sendEmail = require('../email');

module.exports = function (app) {
    const rule = new schedule.RecurrenceRule();

    rule.year = new Date().getFullYear();
    rule.month = Number(new Date().getMonth());
    rule.date = Number(new Date().getDate());
    rule.hour = 12;
    rule.minute = 0;
    rule.second = 0;
    rule.tz = "Asia/Jerusalem";

    console.log(rule);

    schedule.scheduleJob(rule, () => {
        const options = {
            to: "yona@carmel6000.amitnet.org",
            subject: 'test',
            html: `<h1>test</h1>`
        }
        sendEmail("test", options);
    });
}