console.log("++ Send SMS message using an API key and messaging service.");
var client = require('twilio')(process.env.MAIN_API_KEYR, process.env.MAIN_API_KEY_SECRETR, {accountSid: process.env.MAIN_ACCOUNT_SID});
theMsg = "Hello 3";
theFromMsgService = "MG634319110a48b2e82f1a08247cd8f0ba";
theTo = process.env.MY_PHONE_NUMBER
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", theFromMsgService: " + theFromMsgService
        + ", to: " + theTo
        + ", MSG: " + theMsg);
client.messages.create({
    messagingServiceSid: theFromMsgService,
    to: theTo,
    body: theMsg
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
        });
