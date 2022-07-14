// -----------------------------------------------------------------------------
console.log("+++ Start sending notifications to an identity.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
// const notifyServiceSid = process.env.MASTER_NOTIFY_SERVICE_SID;
// const notifyServiceSid = "IS6b86eea51935a036f0ae440652761e8a";      // Notify: p1Android
const notifyServiceSid = "IS0e9b3863450252891f81f312a6e3a7d7";      // Notify: tignotifyweb
// const notifyServiceSid = "IS186702e405b74452a449d67b9265669f";   // Frontline
const theIdentity = "daves";
console.log("+ notifyServiceSid: " + notifyServiceSid + " to theIdentity: " + theIdentity)
client.notify.services(notifyServiceSid).notifications.create({
    DeliveryCallbackUrl: 'https://example.com/notify',
    identity: theIdentity,
    title: 'Notify title 1',
    body: 'Hello there 1'
    // , fcm: {notification: {title: 'Newalert', body: 'Hello Bob!'}}
}).then(notification => console.log("+ Sent: " + notification.sid))
        .catch(error => console.log(error));
