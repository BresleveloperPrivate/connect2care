import Auth from '../../auth/Auth'

var FCMFactory = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {
        // Singleton
        console.log("init fcm")
        // Private methods and variables
        var subsList = [];


        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {

            if (window.FCMPlugin == null && (!window.cordova || window.cordova.plugins.firebase.messaging == null)) {
                console.log("FCMPlugin is null")
                return;
            }
            if (!window.device.uuid) {
                console.log("no device uuid detected is null")
                return;
            }
            const uniqueId = window.device.uuid;
            if (window.FCMPlugin) {
                window.FCMPlugin.getToken(function (token) {
                    //”token” received from FCM server.
                    //It will get automatically registered in you device.No extra code is needed.
                    if (token == null) {
                        console.log("token is null");
                        return;
                    }
                    console.log("token received from FCM", token);
                    postToken(token, uniqueId);

                }, function (err) {
                    console.log('error retrieving token: ' + err);
                    return;
                });

                window.FCMPlugin.onTokenRefresh(async function (token) {
                    postToken(token, uniqueId)
                });

                window.FCMPlugin.onNotification(
                    function (data) {
                        //Notification was received on device tray and tapped by the user.
                        console.log("Client Received Message: " + data);
                        subsList.forEach(sub => {
                            if (data.model.toLowerCase() == sub.model.toLowerCase())
                                sub.callback(data);
                        });
                    },
                    function (msg) {
                        console.log('onNotification callback successfully registered: ' + msg);
                        subsList.forEach(sub => {
                            if (msg.model && msg.model.toLowerCase() == sub.model.toLowerCase())
                                sub.callback(msg);
                        });
                    },
                    function (err) {
                        console.log('Error registering onNotification callback: ' + err);
                    }
                );
            }

            else if (window.cordova && window.cordova.plugins.firebase.messaging) {
                const FCMPlugin = window.cordova.plugins.firebase.messaging;
                FCMPlugin.getToken().then(function (token) {
                    //”token” received from FCM server.
                    //It will get automatically registered in you device.No extra code is needed.
                    if (token == null) {
                        console.log("token is null");
                        return;
                    }
                    console.log("token received from FCM", token);
                    postToken(token, uniqueId);

                }
                    // , function (err) {
                    //     console.log('error retrieving token: ' + err);
                    //     return;
                    // }
                );

                FCMPlugin.onTokenRefresh(async function () {
                    console.log("in here")
                    FCMPlugin.getToken().then(function (token) {
                        //”token” received from FCM server.
                        //It will get automatically registered in you device.No extra code is needed.
                        if (token == null) {
                            console.log("token is null");
                            return;
                        }
                        console.log("token received from FCM", token);
                        postToken(token, uniqueId);

                    });
                });

                FCMPlugin.onMessage(
                    function (data) {
                        if (data == null) {
                            console.log("data is null");
                            return;
                        }
                        //Notification was received on device tray and tapped by the user.
                        console.log("Client Received Message: " + data);
                        subsList.forEach(sub => {
                            if (data.model.toLowerCase() == sub.model.toLowerCase())
                                sub.callback(data);
                        });
                    }
                );


                FCMPlugin.onBackgroundMessage(
                    function (data) {
                        if (data == null) {
                            console.log("data is null");
                            return;
                        }
                        //Notification was received on device tray and tapped by the user.
                        console.log("Client Received Message: " + data);
                        subsList.forEach(sub => {
                            if (data.model.toLowerCase() == sub.model.toLowerCase())
                                sub.callback(data);
                        });
                    }
                );

            }
        }

        async function postToken(subscription, uniqueId) {
            let [resp, err] = await Auth.superAuthFetch("/fcmsubscribe", { //use Auth so you will have the right prefix for this fetch.
                method: "POST",
                body: JSON.stringify({ subscription, uniqueId }),
                headers: {
                    "content-type": "application/json",
                }
            });
        }

        async function unsubscribe() {
            return new Promise((resolve, reject) => {
                if (window.FCMPlugin) {
                    window.FCMPlugin.getToken(async function (token) {
                        if (token) {
                            let [resp, err] = await Auth.superAuthFetch("/unsubscribe", { //use Auth so you will have the right prefix for this fetch.
                                method: "POST",
                                body: JSON.stringify({ subscription: token }),
                                headers: {
                                    "content-type": "application/json",
                                }
                            });
                            resolve({ success: resp });
                        }
                        reject({ success: 1 });
                    });
                }
                else if (window.cordova && window.cordova.plugins.firebase.messaging) {
                    let FCMPlugin = window.cordova.plugins.firebase.messaging
                    FCMPlugin.getToken().then(async function (token) {
                        if (token) {
                            let [resp, err] = await Auth.superAuthFetch("/unsubscribe", { //use Auth so you will have the right prefix for this fetch.
                                method: "POST",
                                body: JSON.stringify({ subscription: token }),
                                headers: {
                                    "content-type": "application/json",
                                }
                            });
                            FCMPlugin.revokeToken().then(function () {
                                console.log("Token revoked successfully");
                                resolve({ success: resp });
                            });
                        }
                        else {
                            reject({ success: 0 });
                        }
                    });
                }
                else reject({ success: 0, meessage: 'no plugin found' });

            });
        }


        return {
            // Public methods and variables
            handleReload: async function () {
                let [response, err] = await Auth.superAuthFetch('/api/NotificationsMaps/getUserNotifications')
                console.log(response)
                try {
                    response.res.forEach(ntf => {
                        let msg = ntf.Notification ? ntf.Notification.htmlmsg : null;
                        if (msg) {
                            msg = JSON.parse(msg);
                            msg.data.ntfMapId = ntf.id;
                            msg.data.ntfId = parseInt(ntf.notificationId);
                            //console.log("msg.data", ntf, msg.data)
                            subsList.forEach(sub => {
                                if (msg.data.model.toLowerCase() == sub.model.toLowerCase()) {
                                    sub.callback(msg.data);
                                }
                            });

                        }

                    })
                }
                catch (err) {
                    console.log("catch parsing msg", err)

                }
            },
            subscribeModel: function (modelName, callback, key=null) {
                 if (subsList.find(sub => (sub.key && sub.key === key && sub.model === modelName))) return;
                subsList.push({ model: modelName, callback: callback, key: key });
            },
            unsubscribe


        };
    };

    return {

        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {

            if (!instance) {
                instance = init();
            }

            return instance;
        }

    };

})();

export default FCMFactory;
