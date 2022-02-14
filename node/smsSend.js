console.log("++ Send SMS message.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
theMsg = "Hello 3";
console.log("+ SID: " + process.env.MASTER_ACCOUNT_SID
        + ", from: " + process.env.MASTER_PHONE_NUMBER_1
        + ", to: " + process.env.MY_PHONE_NUMBER
        + ", MSG: " + theMsg);
client.messages.create({
    from: process.env.MASTER_PHONE_NUMBER_1,
    to: process.env.MY_PHONE_NUMBER,
    body: theMsg
}, function (err) {
    if (err) {
        console.error("- Error: " + err.message + ", code: " + err.code);
        console.log("--- Exit.");
    }
}).then((message) => console.log("+ Message sent, SID: " + message.sid));

