// -----------------------------------------------------------------------------
console.log("+++ Sending notifications to an identity.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
// const notifyServiceSid = process.env.MASTER_NOTIFY_SERVICE_SID;
const notifyServiceSid = "IS6b86eea51935a036f0ae440652761e8a";       // Notify: Android Notify app
// const notifyServiceSid = "IS186702e405b74452a449d67b9265669f";       // Frontline
// const notifyServiceSid = "IS0e9b3863450252891f81f312a6e3a7d7";      // Notify: tignotifyweb
const theIdentity = "davea";
console.log("+ Notify service SID: " + notifyServiceSid + " to theIdentity: " + theIdentity)
client.notify.services(notifyServiceSid).notifications.create({
    identity: theIdentity,
    title: 'Notify foreground title',
    body: 'Hello from the foreground 1',
    fcm: {
        notification: {
            title: 'Notify background title',
            body: 'Hello from the background 3a',
            priority: "high"
        }
    }
}).then(notification => console.log("+ Sent: " + notification.sid))
        .catch(error => console.log(error));

// Notification with badge value:
//  https://www.twilio.com/docs/notify/send-notifications?code-sample=code-send-a-detailed-notification-with-badge&code-language=Node.js&code-sdk-version=3.x

