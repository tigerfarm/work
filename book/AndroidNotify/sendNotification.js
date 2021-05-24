// -----------------------------------------------------------------------------
console.log("+++ Start sending notifications to an identity.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SERVICE_SID;
client.notify.services(notifyServiceSid).notifications.create({
    DeliveryCallbackUrl: 'http://www.tigerfarmpress.com/echo',
    identity: 'davea',
    body: 'Hello there'
}).then(notification => console.log("+ Sent: " + notification.sid))
        .catch(error => console.log(error));
