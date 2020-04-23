// 'use strict';

// const schedule = require('node-schedule');
// const { creatCsvFile } = require('download-csv');

// const validateRules = require('./lib/validateRules');
// const sendEmail = require('./email');

// module.exports = app => {
//     const dates = validateRules.meetings.date.format.pattern.split("(").join("").split(")").join("").split("^").join("").split("|");

//     dates.forEach(date => {
//         const [dayDate, month] = date.split(" ")[date.split(" ").length - 1].split(".");
//         const day = new Date();
//         day.setMonth(month - 1);
//         day.setDate(dayDate);
//         const yesterday = new Date(day.getTime());
//         yesterday.setDate(day.getDate() - 1);

//         const rule = new schedule.RecurrenceRule();

//         rule.year = new Date().getFullYear();
//         rule.month = yesterday.getMonth();
//         rule.date = yesterday.getDate();
//         rule.hour = 6;
//         rule.minute = 0;
//         rule.second = 0;
//         rule.tz = "Asia/Jerusalem";

//         schedule.scheduleJob(rule, () => {
//             (async () => {
//                 try {
//                     const meetings = await app.models.meetings.find({ where: { and: [{ or: [{ zoomId: { neq: null } }, { zoomId: { neq: '' } }] }, { approved: true }, { date }] }, include: ["people", "meetingOwner"] });
//                     meetings.forEach(meeting => {
//                         const { people, meetingOwner } = JSON.parse(JSON.stringify(meeting));
//                         // add datas and columns:
//                         const datas = [];
//                         const columns = {};

//                         const attachment = Buffer.from(creatCsvFile(datas, columns)).toString("base64");
//                         sendEmail("", {
//                             // add subject and html:
//                             to: meetingOwner.email, subject: "asdfsadf", html:"<h1></h1>",
//                             attachments: [
//                                 {
//                                     content: attachment,
//                                     // add file name:
//                                     filename: "מפגש.csv",
//                                     type: "application/csv",
//                                     disposition: "attachment"
//                                 }
//                             ]
//                         });
//                     });
//                 } catch (err) {
//                     console.error(err);
//                 }
//             })();
//         });
//     });
// }