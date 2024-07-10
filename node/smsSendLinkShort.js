console.log("++ Send SMS message using shortened URL.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
// The messaging service was setup using: smsSendLinkShortSetup.js
theLinkMsgService = "MG634319110a48b2e82f1a08247cd8f0ba";
theTo = process.env.MY_PHONE_NUMBER;
theMsg = "Hello 2";
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", theLinkMsgService: " + theLinkMsgService
        + ", to: " + theTo
        + ", MSG: " + theMsg);
client.messages.create({
    shortenUrls: true,
    messagingServiceSid: theLinkMsgService,
    // body: 'Welcome to the machine: https://tfpbooks.herokuapp.com/pages/images/Tesseract_With_Hidden_Dash_Lines.jpg',
    body: 'Welcome to the machine: tfpbooks.herokuapp.com/abc',
    to: theTo
})
        .then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
        });
