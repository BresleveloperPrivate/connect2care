'use strict';
const fcm = require('./fcmhandler');
const DbManager = require('./../lib/DbManager');

module.exports = app => {
    const dbManager = new DbManager(app);

    // save FCM subscription
    app.post("/fcmsubscribe", (req, res) => {
        // console.log("RREQ", req.body, req.accessToken)
        const { subscription, uniqueId } = req.body;
        if (!subscription || !req.accessToken) {
            res.send("fail");
            return;
        }
        if (!uniqueId) {
            res.send("fail");
            return;
        }
        const userId = req.accessToken.userId;
        const payload = { subscription, uniqueId, userId, isFcm: true };
        dbManager.saveToDatabase(payload, res); //Method to save the subscription to Database
    });

    // save SW subscription
    app.post("/swsubscribe", (req, res) => {
        const { subscription } = req.body;
        if (!subscription || !req.accessToken) {
            res.send("fail");
            return;
        }
        const { userId } = req.accessToken;
        const payload = { subscription, userId };
        dbManager.saveToDatabase(payload, res); //Method to save the subscription to Database
    });

    app.post('/unsubscribe', (req, res) => {
        try {
            const { subscription } = req.body;
            const { userId } = req.accessToken;
            const payload = { subscription, userId }
            if (subscription)
                dbManager.deleteFromDatabase(payload, res)
        }
        catch (er) {
            console.log("error in /unsubscribe: ", er)
            res.send("fail");
        }
    });

    fcm(app);
}