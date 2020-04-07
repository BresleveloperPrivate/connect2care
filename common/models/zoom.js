'use strict';
const http = require("https");
const jwt = require('jsonwebtoken');

async function createZoomUser(email = "maayan45633@gmail.com") {
  const payload = {
    iss: "bxkoUl94RgOEagOunvJnDA",
    exp: ((new Date()).getTime() + 5000)
  };
  const token = jwt.sign(payload, "KOp8KDqjqW8wuAsi37VWUGnN61KJt7N8Enzy");

  console.log("token", token)

  var options = {
    "method": "POST",
    "hostname": "api.zoom.us",
    "port": null,
    "path": "/v2/users?access_token=" + token,
    "headers": {
      "content-type": "application/json"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(JSON.stringify({
    action: 'create',
    user_info:
    {
      email: 'maayan.lital@gmail.com',
      type: 2,
      first_name: 'maayan',
      last_name: 'cohen',
      password: 'Asdf1234!'
    }
  }));

  req.end();
}


module.exports = function (zoom) {


};