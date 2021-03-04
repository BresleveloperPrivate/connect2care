const scheduleMeeting = require('./scheduleMeeting.js');
const schedule = require('node-schedule');

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
                    let time = 1000;
                    let count = 0;
                    const meetings = await app.models.meetings.find({ where: { and: [{ or: [{ zoomId: '' }, { zoomId: null }] }, { approved: true }] }, include: "meetingOwner" });
                    meetings.forEach(meeting => {
                        count++
                        if (count > 20) {
                            count = 0
                            time = time + 4000
                        }
                        else {

                            setTimeout(function () {

                                let jsdata = JSON.parse(JSON.stringify(meeting))
                                if (jsdata && jsdata.meetingOwner.email && jsdata.date) {
                                    let email = jsdata.meetingOwner.email.replace("@", "+c2c@");
                                    const dateMap = jsdata.date.split(' ').pop().split('.');
                                    const newDate = new Date(`${dateMap[1]}/${dateMap[0]}/${dateMap[2]}`);
                                    newDate.date += 1;
                                    let start_time = `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}T00:59:00`;
                                    console.log(count)
                                    console.log("xxxxxxx")
                                    // scheduleWebinar(async (url, error) => {
                                    scheduleMeeting(async (url, error) => {
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
                                                // createZoomUser(email, jsdata.meetingOwner.name, (toSend) => {
                                                //     if (toSend) {
                                                //         // sendEmail("", {
                                                //         //     to: jsdata.meetingOwner.email, subject: "עליך לבצע אקטיבציה", html: `<h1>נראה שלא ביצעת אקטיבציה לחשבון הזום שיצרנו לך ובהתאם לכך לא הצלחנו ליצור לך פגישת זום. עליך לבצע אקטיבציה בהקדם. כל שעליך לעשות הוא להכנס למייל של זום המצורף, ולהפעיל את החשבון על ידי הכנסת סיסמה. </h1>`,
                                                //         // });
                                                //     }
                                                // })
                                            }

                                        }
                                    }, email, start_time)
                                }
                            }, time);
                        }

                    });


                } catch (err) {
                    console.error(err);
                }
            })();
        });
    }
}