console.log("++ Use Notify to send SMS messages.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
theMsg = "This is the ship that made the Kessel Run in fourteen parsecs.";
console.log("+ "
        + " to: " + process.env.PHONE_NUMBER_3
        + ", to: " + process.env.PHONE_NUMBER_4
        + ", MSG: " + theMsg);
var service = client.notify.services(process.env.NOTIFY_SERVICE_SID);
service.notifications.create({
    toBinding: [
        JSON.stringify({
            binding_type: 'sms',
            address: process.env.PHONE_NUMBER_3
        }),
        JSON.stringify({
            binding_type: 'sms',
            address: process.env.PHONE_NUMBER_4
        }),
    ],
    body: theMsg
}).then(function (response) {
    console.log("+ Messages sent.");
}).catch(function (err) {
    if (err) {
        console.error("- Error: ", err.message);
        console.log("--- Exit.");
        exit();
    }
});
