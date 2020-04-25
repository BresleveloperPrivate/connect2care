const jwt = require('jsonwebtoken');
const http = require("https");

const removePanelists = async (email, name, webinarId) => {

    const payload = {
        iss: "bxkoUl94RgOEagOunvJnDA",
        exp: ((new Date()).getTime() + 4000)
    };
    const token = jwt.sign(payload, "KOp8KDqjqW8wuAsi37VWUGnN61KJt7N8Enzy");


    let options = {
        "method": "POST",
        "hostname": "api.zoom.us",
        "port": null,
        "path": `v2/webinars/${webinarId}/panelists/${email}?access_token=` + token,
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