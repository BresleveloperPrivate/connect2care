const http = require("https");
const jwt = require('jsonwebtoken');
const {hostname, token} = require('./zoomAPIUtils');

/**
 * @param {string} mail;
 * @param {string} name;
*/

const createZoomUser = async (mail, name, cb) => {
    
    console.log('createZoomUser');

    const options = {
        "method": "POST",
        "hostname": hostname,
        "port": null,
        "path": "/v2/users",
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

