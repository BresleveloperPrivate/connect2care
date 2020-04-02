'use strict';
const http = require("https");

async function createZoomUser(email = "maayan45633@gmail.com") {
    var options = {
        "method": "POST",
        "hostname": "api.zoom.us",
        "port": null,
        "path": "/v2/users?access_token=<TOKEN>",
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
      
      req.write(JSON.stringify({ action: 'create',
        user_info: 
         { email: 'string',
           type: 1,
           first_name: 'string',
           last_name: 'string',
           password: 'string' } }));
      req.end();
}


module.exports = function (zoom) {


};