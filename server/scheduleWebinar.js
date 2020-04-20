const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const http = require("https");

/**
 * @param {string} mail;
*/

const scheduleWebinar = async (mail = "‫maayan45633+c2c@gmail.com‬") => {

    const payload = {
        iss: "bxkoUl94RgOEagOunvJnDA",
        exp: ((new Date()).getTime() + 5000)
    };
    const token = jwt.sign(payload, "KOp8KDqjqW8wuAsi37VWUGnN61KJt7N8Enzy");

    console.log("token", token)

    let options = {
        "method": "POST",
        "hostname": "api.zoom.us",
        "port": null,
        "path": "/v2/users/maayan45633+c2c@gmail.com/webinars?access_token=" + token,
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
            console.log(body.toString());
        });
    });

    req.write(JSON.stringify(
        {
            "topic": "Test Webinar",
            "type": 5,
            "start_time": "2020-09-19T23:53:00Z",
            "duration": "180",
            "timezone": "Asia/Jerusalem",
            "password": "123456",
            "agenda": "Test Webinar",
            "settings": {
                "host_video": "true",
                "panelists_video": "true",
                "practice_session": "false",
                "hd_video": "true",
                "approval_type": 0,
                "audio": "both",
                "auto_recording": "none",
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