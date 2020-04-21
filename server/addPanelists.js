const jwt = require('jsonwebtoken');
const http = require("https");

/**
 * @param {string} mail;
*/

const addPanelists = async (id) => {

    const payload = {
        iss: "bxkoUl94RgOEagOunvJnDA",
        exp: ((new Date()).getTime() + 4000)
    };
    const token = jwt.sign(payload, "KOp8KDqjqW8wuAsi37VWUGnN61KJt7N8Enzy");

    console.log("token", token)

    let options = {
        "method": "POST",
        "hostname": "api.zoom.us",
        "port": null,
        "path": `/v2/webinars/96544066292/panelists?access_token=` + token,
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
            console.log(JSON.parse(body.toString()))
            // let jsdata = JSON.parse(body.toString())
            // console.log("zzzzzzzzzzzzz", jsdata.join_url);
            // cb(jsdata.join_url)
        });
    });

    req.write(JSON.stringify(
        {
            "panelists": [
              {
                "name": "מעיין בדיקה",
                "email": "maayan45633@gmail.com"
              }
            ]
          }
    ));

    req.end();

}

module.exports = addPanelists;