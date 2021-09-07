// -----------------------------------------------------------------------------
console.log("+++ Start sending notifications to a list.");

const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

const notifyServiceSid = process.env.MASTER_NOTIFY_SERVICE_SID;
const phoneNumber1 = process.env.MY_PHONE_NUMBER;
const phoneNumber2 = process.env.PHONE_NUMBER4;
// Single:   toBinding: JSON.stringify({"binding_type": "sms", "address": yourPhoneNumber})
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there from Notify.',
    toBinding: [
        JSON.stringify({"binding_type": "sms", "address": phoneNumber1})
        // , JSON.stringify({"binding_type": "sms", "address": phoneNumber2})
    ]
    , deliveryCallbackUrl: "https://tfpecho.herokuapp.com/deliveryCallbackUrl"
}).then(notification => console.log(notification.sid))
        .catch(error => console.log(error));
