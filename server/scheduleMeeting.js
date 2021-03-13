const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const http = require("https");
// const { log } = require('console');
const {hostname, token} = require('./zoomAPIUtils');

/**
 * @param {string} mail;
*/

const scheduleMeeting = async (cb, mail, start_time, pwd = Math.floor(Math.random() * (1000000 - 100000)) + 100000) => {

    console.log('scheduleMeeting');

    let options = {
        "method": "POST",
        "hostname": hostname,
        "port": null,
        "path": `/v2/users/${mail}/meetings`,
        "headers": {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    };
    console.log(mail);

    let req = http.request(options, function (res) {
        let chunks = [];
        // console.log('scheduleMeeting req.options', req.options);
        console.log(mail);
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            let body = Buffer.concat(chunks);
            let jsdata = JSON.parse(body.toString())
            if (jsdata.code === 1001) {
                cb(null, jsdata)
            } else {
                cb(jsdata.join_url, null)
            }
        });
    });

    // TODO verify meeting params
    req.write(JSON.stringify(
        {
            "topic": "Connect 2 Care Meeting",
            "type": 2,                      //  Scheduled meeting
            "timezone": "Asia/Jerusalem",
            "start_time": start_time,       // format examples: GMT: 2020-03-31T12:02:00Z OR local (need timezone param): 2020-03-31T12:02:00
            "duration": "240",              // in minutes
            "password": pwd,
            "agenda": "Connect 2 Care Meeting",
            "settings": {
                "host_video": true,         // Start video when the host joins the meeting.
                "participant_video": false,  // Start video when participants join the meeting.
                "join_before_host": false,  // Allow participants to join the meeting before the host starts the meeting.
                "mute_upon_entry": true,    // Mute participants upon entry.
                "approval_type": 0,         // 0 - registration + Automatically approved. 1 - registration + Manually approve. 2 - No registration required (default)
                "audio": "both",            // Both Telephony and VoIP. Determine how participants can join the audio portion of the meeting.
                "auto_recording": "cloud",  // Automatic recording
                "close_registration": true  // Close registration after event date
                // "waiting_room": false,
                // "show_share_button": true, // If set to true, the registration page for the meeting will include social share buttons. only applied for meetings that have enabled registration.
                // "allow_multiple_devices": true, // If set totrue, attendees will be allowed to join a meeting from multiple devices. only applied for meetings that have enabled registration.
            }
        }
    ));

    req.end();

}

module.exports = scheduleMeeting;