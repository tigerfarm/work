console.log("++ Send SMS message using API key.");
// var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
// var client = require('twilio')(process.env.MAIN_API_KEY, process.env.MAIN_API_KEY_SECRET, {accountSid: process.env.MAIN_ACCOUNT_SID});
var client = require('twilio')(process.env.MAIN_API_KEYR, process.env.MAIN_API_KEY_SECRETR, {accountSid: process.env.MAIN_ACCOUNT_SID});
//
theFrom = process.env.MAIN_PN_7002;        // MAIN_PN_8003: registered.
theTo = process.env.MY_PHONE_NUMBER;
theMsg = "Hello from Dave 6a";
// theTo = '+';
// theMsg = "Test message from Stacy of Twilio support, test: 1.";
// 
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", from: " + theFrom
        + ", to: " + theTo
        + ", MSG: " + theMsg
        );
client.messages.create({
    from: theFrom,
    to: theTo,
    body: theMsg
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
        });
