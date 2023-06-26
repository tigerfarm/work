console.log("++ Send SMS message.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
theMsg = "Hello 2";
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", from: " + process.env.MAIN_PHONE_NUMBER_1
        + ", to: " + process.env.MY_PHONE_NUMBER
        + ", MSG: " + theMsg);
client.messages.create({
    from: process.env.MAIN_PHONE_NUMBER_1,
    to: process.env.MY_PHONE_NUMBER,
    body: theMsg
    , statusCallback: process.env.ECHO_REQUEST_URL
}, function (err) {
    if (err) {
        console.error("- Error: " + err.message + ", code: " + err.code);
        console.log("--- Exit.");
    }
}).then((message) => console.log("+ Message sent, SID: " + message.sid));

