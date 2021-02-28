const jwt = require('jsonwebtoken');
const http = require("https");
const {hostname, token} = require('./zoomAPIUtils');

const removePanelists = async (email, name, webinarId) => {

    
    console.log('removePanelists');

    const options = {
        "method": "POST",
        "hostname": hostname,
        "port": null,
        "path": `v2/webinars/${webinarId}/panelists/${email}?access_token=` + token,
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
            console.log(body.toString())
        });
    });

    // req.write(JSON.stringify(
    //     {


    //     }
    // ));


    req.end();

}

module.exports = removePanelists;