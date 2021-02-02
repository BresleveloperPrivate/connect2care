require('dotenv').config()
const webpush = require('web-push') //requiring the web-push module
const bodyParser = require("body-parser");
var admin = require('firebase-admin');
const DbManager = require('../lib/DbManager') //requiring the web-push module

module.exports = function(app) {
    const keys = app.get('modules').notifications;
    var serviceAccount = keys.serviceAccount;
    const modelsToListen = keys.modelsToListen;
    const vapidKeys = keys.vapidKeys;
    var messaging = null;
    app.use(bodyParser.json())
    if (serviceAccount && serviceAccount.private_key !== "") {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        messaging = admin.messaging();
    }
    //setting our previously generated VAPID keys
    if (vapidKeys && vapidKeys.publicKey !== "")
        webpush.setVapidDetails(
            process.env.REACT_APP_DOMAIN,
            vapidKeys.publicKey,
            vapidKeys.privateKey
        );

    const dbManager = new DbManager(app);

    const sendFcmNotification = async(subObj, payload) => {
        const subscription = subObj.subscription;
        if (serviceAccount && messaging)
            return messaging.send(payload).then((result) => {}).catch((error) => {
                if (error.code === 'messaging/invalid-registration-token' ||
                    error.code === 'messaging/registration-token-not-registered') {
                    console.log('Token has expired or is no longer valid: ', error);
                    // TODO: remove the token from your registry/database
                    dbManager.deleteFromDatabase({ subscription, userId: subObj.userId });
                } else throw error;
            })
        else {
            console.warn("if you want to use notifications on cordova, make sure to configure serviceAccount.")
            return Promise.resolve();
        }
    }

    const sendWpNotification = async(subObj, data) => {
        const subscription = subObj.subscription;

        if (vapidKeys && vapidKeys.publicKey !== "")
            return webpush.sendNotification(subscription, data).then(response => {}).catch((err) => {
                if (err.statusCode === 404 || err.statusCode === 410 || err.statusCode === 403) {
                    console.log('Subscription has expired or is no longer valid: ', err);
                    dbManager.deleteFromDatabase({ subscription, userId: subObj.userId });

                } else {
                    console.log('??ERR: ', subscription, err);
                    throw err;
                }
            });
        else {
            console.warn("if you want to use notifications using service worker, make sure to configure vapid-keys.")
            return Promise.resolve();
        }
    }

    const createNotificationsAndSend = (users, payload) => {
        if (!users.length) return;
        let subscrObj = null;
        try {
            app.models.Subscriptions.getSubscriptionsByUserId(users, async(subscriptions) => {
                for (let i = 0; i < subscriptions.length; i++) {
                    subscrObj = JSON.parse(subscriptions[i].subscription);
                    if (subscriptions[i].isFcm != 0) {
                        payload.token = subscrObj;
                        await sendFcmNotification({ subscription: subscrObj, userId: subscriptions[i].userId }, payload);
                    } else {
                        const ntf = {...payload.notification, data: payload.data }
                        await sendWpNotification({ subscription: subscrObj, userId: subscriptions[i].userId }, JSON.stringify(ntf));
                    }
                }
            })
        } catch (err) {
            console.log("err geting subscriptions", err);
        }
    }

    var { models } = app;
    const modelNames = Object.keys(models);
    let NtfModel = models['Notification'];
    modelNames.forEach(modelName => {
        const index = modelsToListen.findIndex(model => model === modelName);
        if (index !== -1) {
            models[modelName].createNotification = ((ntf, users) => {
                const data = { data: ntf.data && JSON.stringify(ntf.data) || "{}", model: modelName };
                const notification = { title: ntf.title, body: ntf.body }
                NtfModel.newActivity({...ntf, data }, users, (err, res) => {
                    if (res.id) data.ntfId = res.id.toString();
                    createNotificationsAndSend(users, { notification, data })
                })
            })
            models[modelName].observe('after save', function(ctx, next) {
                if (ctx.options.archivesChanges || ctx.instance || ctx.hookState.data || (ctx.options && ctx.options.ntfInfo)) {
                    models[modelName].afterSaveWebpush && models[modelName].afterSaveWebpush(ctx, (ntf, users) => {
                        //! notice this change- all ntf data is sent as string because of FCM.
                        const data = { data: ntf.data && JSON.stringify(ntf.data) || "{}", model: modelName };
                        const notification = { title: ntf.title, body: ntf.body }
                        NtfModel.newActivity({...ntf, data }, users, (err, res) => {
                            if (res.id) data.ntfId = res.id.toString();
                            createNotificationsAndSend(users, { notification, data })
                        })
                    })
                }
                next();
            });

            models[modelName].observe('after delete', function(ctx, next) {
                models[modelName].afterDeleteWebpush && models[modelName].afterDeleteWebpush(ctx, (data, users) => {
                    const ntf = {
                        data: { model: modelName, data: data && JSON.stringify(data) || "{}", deleted: true },
                        notification: { title: data.title, body: data.body }
                    }
                    createNotificationsAndSend(users, ntf);
                })
                next();
            })
        }
    });
};