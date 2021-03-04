const { default: fetch } = require("node-fetch");
const {hostname, token} = require('./zoomAPIUtils');

/**
 * @param {string} mail;
 * @param {string} name;
*/

const createZoomUser = async (email, name) => {
    console.log('createZoomUser');

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            action: 'create',
            user_info:
            {
                email,
                type: 2,
                first_name: name,
                last_name: 'ממתחברים וזוכרים',
            }
        }),
    };

    const res = await fetch(`https://${hostname}/v2/users`, options);
    const data = await res.json();
    if (data.code && data.code !== 1005) { // 1005 = User already in the account
        return [`[${data.code}] ${data.message}`];
    }
    return [null];
}

module.exports = createZoomUser;

