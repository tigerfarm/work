// -----------------------------------------------------------------------------
console.log("+++ Start sending notifications to a list.");

const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

const notifyServiceSid = process.env.MASTER_NOTIFY_SERVICE_SID;
const phoneNumber1 = process.env.MY_PHONE_NUMBER;
console.log("+ notifyServiceSid: " + notifyServiceSid + " Send to: " + phoneNumber1);
// Doesn't work to send the image:
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there from Notify 3',
    sms: { 'media_urls':['https://www.tigerfarmpress.com/StacyDavid/netscape-fountain2a.jpg']},
    toBinding: [
        JSON.stringify({
            "binding_type": "sms", 
            "address": phoneNumber1
        })
    ]
}).then(notification => console.log(notification.sid))
        .catch(error => console.log(error));
