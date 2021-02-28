

// TODO generate jwt using Zoom's auth API
/*
const generateJWT() {
    const payload = {
        iss: "bxkoUl94RgOEagOunvJnDA",
        exp: ((new Date()).getTime() + 5000)
    };
    const token = jwt.sign(payload, "KOp8KDqjqW8wuAsi37VWUGnN61KJt7N8Enzy");
    
    console.log("token", token)

    return token;
}
*/

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlhRMFBHSkFHU3ZHTTktdkhoMzZHTVEiLCJleHAiOjE2MjE2MzA4MDAsImlhdCI6MTYxNDUxOTYwM30.ixX6bhgIDmA16y3zZgU0sIHfsjj6jzpf67-fGbmMz0w';

const hostname = 'api.zoom.us';

module.exports = {
    hostname,
    token
}