import Auth from '../../auth/Auth'
import { notifications } from "../../../consts/ModulesConfig";

var SWNtfFactory = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {
        // Singleton
        console.log("init")
        // Private methods and variables
        var subsList = [];
        if ("serviceWorker" in navigator) {
            registerAndSubscribe().catch(err => console.error("err ntf", err));

            // this.subsList = [];

            navigator.serviceWorker.addEventListener('message', function (event) {
                console.log("Client 1 Received Message: " + event.data);
                console.log("subs list:", subsList);
                subsList.forEach(sub => {
                    if (event.data.model.toLowerCase() == sub.model.toLowerCase()) {
                        event.data.data = JSON.parse(event.data.data)
                        sub.callback(event.data);
                    }
                });
                //event.ports[0].postMessage("Client 1 Says 'Hello back!'");
            });
        }


        // Register SW, Register Push, Send Push
        async function registerAndSubscribe() {
            // Register Service Worker
            // console.log("Registering service worker...");
            const register = await navigator.serviceWorker.register("/worker.js", {
                scope: "/"
            });
            //  console.log("Service Worker Registered...");

            // Register Push
            // console.log("Registering Push...");
            if (Auth.isAuthenticated()) {
                const subscription = await register.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                });
                //  console.log("Push Registered...");

                // Send Push Notification
                //  console.log("subs", subscription);
                let [resp, err] = await Auth.superAuthFetch("/swsubscribe", {
                    method: "POST",
                    body: JSON.stringify({ subscription }),
                    headers: {
                        "content-type": "application/json",
                    }
                });
                console.log("RESP!", resp);
            }
        }

        async function unsubscribe() {
            return new Promise(async (resolve, reject) => {
                if ("serviceWorker" in navigator)
                    navigator.serviceWorker.ready
                        .then(function (registration) {
                            return registration.pushManager.getSubscription();
                        }).then(function (subscription) {
                            return subscription.unsubscribe()
                                .then(function () {
                                    // console.log('Unsubscribed', subscription.endpoint);
                                    return Auth.superAuthFetch('/unsubscribe', {
                                        method: 'post',
                                        headers: {
                                            'Content-type': 'application/json'
                                        },
                                        body: JSON.stringify({ subscription })
                                    });
                                });
                        }).then(data => {
                            resolve({ success: 1 });
                        }).catch(err => {
                            console.log('err:', err)
                            reject({ success: 0 });
                        });
            });
        }

        function urlBase64ToUint8Array(base64String) {
            const padding = "=".repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, "+")
                .replace(/_/g, "/");

            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

        var publicVapidKey =
            notifications.publicVapidKey;

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

            subscribeModel: function (modelName, callback, key = null) {
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

export default SWNtfFactory;




