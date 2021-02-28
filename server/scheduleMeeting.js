const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const http = require("https");
const { log } = require('console');
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

    let req = http.request(options, function (res) {
        let chunks = [];
        // console.log('scheduleMeeting req.options', req.options);

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            let body = Buffer.concat(chunks);
            // console.log(JSON.parse(body.toString()))
            let jsdata = JSON.parse(body.toString())
            // console.log(jsdata)
            if (jsdata.code === 1001) cb(null, jsdata)
            else cb(jsdata.join_url, null)
        });
    });


    // TODO verify meeting params
    req.write(JSON.stringify(
        {
            "topic": "Connect 2 care Meeting",
            "type": 5,
            // "start_time": "2020-09-20T20:00:00",
            "timezone": "Asia/Jerusalem",
            "start_time": start_time,
            "duration": "240",
            "password": pwd,
            "agenda": "Connect 2 care Meeting",
            "settings": {
                "host_video": "true",
                "panelists_video": "true",
                "practice_session": "false",
                "hd_video": "true",
                "approval_type": 0,
                "audio": "both",
                "auto_recording": "cloud",
                "enforce_login": "false",
                "close_registration": "true",
                "show_share_button": "true",
                "allow_multiple_devices": "true"
            }
        }
    ));

    req.end();

}

module.exports = scheduleMeeting;