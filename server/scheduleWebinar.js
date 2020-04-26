const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const http = require("https");

/**
 * @param {string} mail;
*/

const scheduleWebinar = async (cb, mail, start_time, pwd = Math.floor(Math.random() * (1000000 - 100000)) + 100000) => {

    const payload = {
        iss: "bxkoUl94RgOEagOunvJnDA",
        exp: ((new Date()).getTime() + 4000)
    };
    const token = jwt.sign(payload, "KOp8KDqjqW8wuAsi37VWUGnN61KJt7N8Enzy");

    // console.log("token", token)

    let options = {
        "method": "POST",
        "hostname": "api.zoom.us",
        "port": null,
        "path": `/v2/users/${mail}/webinars?access_token=` + token,
        "headers": {
            "content-type": "application/json"
        }
    };

    let req = http.request(options, function (res) {
        let chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            let body = Buffer.concat(chunks);
            // console.log(JSON.parse(body.toString()))
            let jsdata = JSON.parse(body.toString())
            console.log(jsdata)
            // console.log("zzzzzzzzzzzzz", jsdata.join_url);
            cb(jsdata.join_url)
        });
    });

    req.write(JSON.stringify(
        {
            "topic": "Connect 2 care Webinar",
            "type": 5,
            // "start_time": "2020-09-20T20:00:00",
            "timezone": "Asia/Jerusalem",
            "start_time": start_time,
            "duration": "240",
            "password": pwd,
            "agenda": "Connect 2 care Webinar",
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
                "allow_multiple_devices": "false"
            }
        }
    ));

    req.end();

}

module.exports = scheduleWebinar;