const jwt = require('jsonwebtoken');
// const config = require('./config');
// const rp = require('request-promise');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const http = require("https");

/**
 * @param {string} mail;
*/

const getZoomUser = async (mail = "‫maayan45633+c2c@gmail.com‬") => {

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
        "path": "/v2/users/maayan45633+c2c@gmail.com/meetings?access_token=" + token,
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

    req.write(JSON.stringify({
        topic: "Maayan Meeting"
    }));

    req.end();

}

module.exports = getZoomUser;

// { "uuid": "SfYwG5hUTrW4r0EQqnNO9Q==",
//  "id": 92853670103,
//   "host_id": "6pau290bSFWZE7gLZFTmvA",
//    "topic": "Zoom Meeting",
//     "type": 2, 
//     "status": "waiting",
//      "start_time": "2020-04-15T11:01:11Z",
//       "duration": 60, "timezone": "America/Los_Angeles", "created_at": "2020-04-15T11:01:11Z", "start_url": "https://zoom.us/s/92853670103?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiI2cGF1MjkwYlNGV1pFN2dMWkZUbXZBIiwiaXNzIjoid2ViIiwic3R5IjoxMDAsIndjZCI6ImF3MSIsImNsdCI6MCwic3RrIjoicFF3eG1BQzhsa1VFRWVzUTVZLUN0M0VzVjAyd3MzWnNRZ21BdHpDazc3SS5CZ1VzZGxGVVQwVnhTM1o1TlU4eE1UaFJSRGt5V1ZGSk0wRndObUpHVDBWdlEyd3dTRUZWYkVnclRUQnliejFBTWpRellqYzRPR0kzWmpnd09EQXhNVGhqTWpWaU1tVTRNR1EyWVRVMU1URmtZMlpoWkdZd01ESmxaV1UxTURNek1ERTNNR0ZrTXpCak0yWTVNelk1TWdBTU0wTkNRWFZ2YVZsVE0zTTlBQU5oZHpFIiwiZXhwIjoxNTg2OTU1NjcyLCJpYXQiOjE1ODY5NDg0NzIsImFpZCI6Ik5YOTFWbGRFVGQ2LWZJLTBadGZPU1EiLCJjaWQiOiIifQ.1bmmwTWEk5q7PRPbVUx1AUpMxmkcXTLdf3RVkY3i6Ls", "join_url": "https://zoom.us/j/92853670103", "settings": { "host_video": false, "participant_video": false, "cn_meeting": false, "in_meeting": false, "join_before_host": false, "mute_upon_entry": false, "watermark": false, "use_pmi": false, "approval_type": 2, "audio": "both", "auto_recording": "none", "enforce_login": false, "enforce_login_domains": "", "alternative_hosts": "", "close_registration": false, "registrants_confirmation_email": true, "waiting_room": false, "global_dial_in_countries": ["US"], "global_dial_in_numbers": [{ "country_name": "US", "city": "Chicago", "number": "+1 3126266799", "type": "toll", "country": "US" }, { "country_name": "US", "city": "Houston", "number": "+1 3462487799", "type": "toll", "country": "US" }, { "country_name": "US", "city": "San Jose", "number": "+1 4086380968", "type": "toll", "country": "US" }, { "country_name": "US", "city": "New York", "number": "+1 6468769923", "type": "toll", "country": "US" }, { "country_name": "US", "city": "San Jose", "number": "+1 6699006833", "type": "toll", "country": "US" }, { "country_name": "US", "city": "", "number": "+1 2532158782", "type": "toll", "country": "US" }, { "country_name": "US", "city": "", "number": "+1 3017158592", "type": "toll", "country": "US" }], "registrants_email_notification": true, "meeting_authentication": false } }


