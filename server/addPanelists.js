const jwt = require('jsonwebtoken');
const http = require("https");
const {hostname, token} = require('./zoomAPIUtils');

const addPanelists = async (email, name, webinarId) => {

    console.log('addPanelists');

    const options = {
        "method": "POST",
        "hostname": hostname,
        "port": null,
        "path": `/v2/webinars/${webinarId}/panelists`,
        "headers": {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    };

    let req = http.request(options, function (res) {
        let chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            let body = Buffer.concat(chunks);
            console.log(JSON.parse(body.toString()))
        });
    });

    req.write(JSON.stringify(
        {
            "panelists": [
                {
                    "name": name,
                    "email": email
                }
            ]
        }
    ));

    req.end();

}

module.exports = addPanelists;