const http = require("https");
const jwt = require('jsonwebtoken');


/**
 * @param {string} mail;
 * @param {string} name;
*/

const createZoomUser = async (mail, name, cb) => {
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
        "path": "/v2/users?access_token=" + token,
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
            let jsdata = JSON.parse(body.toString())
            if (jsdata.code && (jsdata.code == "1005" || jsdata.code == 1005)) {
                cb(false)
            }
            else{
                cb(true)
            }
        });
    });

    req.write(JSON.stringify({
        action: 'create',
        user_info:
        {
            email: mail,
            type: 2,
            first_name: name,
            last_name: 'ממתחברים וזוכרים',
            // password: 'OurBrothers2020'
        }
    }));

    req.end();
}

module.exports = createZoomUser;

