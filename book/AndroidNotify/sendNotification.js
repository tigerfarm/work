// -----------------------------------------------------------------------------
console.log("+++ Start sending notifications to an identity.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
// const notifyServiceSid = process.env.MASTER_NOTIFY_SERVICE_SID;
const notifyServiceSid = "IS6b86eea51935a036f0ae440652761e8a";      // Notify: p1Android
// const notifyServiceSid = "IS186702e405b74452a449d67b9265669f";   // Frontline
client.notify.services(notifyServiceSid).notifications.create({
    DeliveryCallbackUrl: 'https://example.com/notify',
    identity: 'davea',
    body: 'Hello there 3'
}).then(notification => console.log("+ Sent: " + notification.sid))
        .catch(error => console.log(error));
