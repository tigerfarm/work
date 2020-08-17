console.log("++ Send SMS message.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
theMsg = "Hello 3";
console.log("+ SID: " + process.env.ACCOUNT_SID
        + ", from: " + process.env.PHONE_NUMBER1
        + ", to: " + process.env.PHONE_NUMBER3
        + ", MSG: " + theMsg);
client.messages.create({
    from: process.env.PHONE_NUMBER1,
    to: process.env.PHONE_NUMBER3,
    body: theMsg
}, function (err, message) {
    if (err) {
        console.error("- Error: " + err.message + ", code: " + err.code);
        console.log("--- Exit.");
    }
}).then((message) => console.log("+ Message sent, SID: " + message.sid));

