console.log("++ Send SMS message.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
theMsg = "Hello 3";
console.log("+ SID: " + process.env.ACCOUNT_SID
        + ", from: " + process.env.PHONE_NUMBER_1
        + ", to: " + process.env.PHONE_NUMBER_3
        + ", MSG: " + theMsg);
client.messages.create({
    from: process.env.PHONE_NUMBER_1,
    to: process.env.PHONE_NUMBER_3,
    body: theMsg
}, function (err, message) {
    if (err) {
        console.error("- Error: ", err.message);
        console.log("--- Exit.");
        exit();
    }
});
console.log("+ Sent.");
