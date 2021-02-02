// console.log("Service Worker Loaded...");

// self.addEventListener("push", e => {
//   let msg = '';
//   try { msg = e.data.json(); }
//   catch (error) { msg = e.data.text(); }

//   let body = msg.body || '';
//   let icon = msg.icon || "http://image.ibb.co/frYOFd/tmlogo.png";
//   let tag = msg.tag || "new-ntf";
//   let data = msg.data || msg;
//   let title = msg.title || '';

//   console.log("Push Recieved...");
//   sendMessageToAllClients(data);
//   self.registration.showNotification(title, { body, icon, tag });
// });

// self.addEventListener('notificationclose', function (e) {
//   console.log("Notification was now closed!", e.notification);
// });

// self.addEventListener('notificationclick', function (e) {
//   console.log("You clicked the notification!", e.notification.data);
// });

// function sendMessageToAllClients(msg) {
//   clients.matchAll().then(clients => {
//     clients.forEach(client => {
//       sendMessageToClient(client, msg)
//         .then(m => console.log("SW Received Message: " + m));
//     })
//   })
// }

// function sendMessageToClient(client, msg) {

//   return new Promise(function (resolve, reject) {
//     var msg_chan = new MessageChannel();
//     msg_chan.port1.onmessage = function (event) {
//       if (event.data.error) {
//         reject(event.data.error);
//       } else {
//         resolve(event.data);
//       }
//     };

//     client.postMessage(msg, [msg_chan.port2]);
//   });
// }

