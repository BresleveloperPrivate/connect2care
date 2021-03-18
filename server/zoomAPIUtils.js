

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

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Img5UEUxU2I2VDh1U21WN1JjR0YybnciLCJleHAiOjE2MjE0NTA4MDAsImlhdCI6MTYxNjA1NjY2OH0.bUHqNEo7my2nH52J63tAOmCk89FxlHh6vfa3CyN5x4o';
const hostname = 'api.zoom.us';

module.exports = {
    hostname,
    token
}