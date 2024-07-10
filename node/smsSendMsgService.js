console.log("++ Send SMS message.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
theMsg = "Hello 2";
theFromMsgService = "MG634319110a48b2e82f1a08247cd8f0ba";
theTo = process.env.MY_PHONE_NUMBER
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", theFromMsgService: " + theFromMsgService
        + ", to: " + theTo
        + ", MSG: " + theMsg);
// theStatusCallbackURL = process.env.ECHO_REQUEST_URL;
theStatusCallbackURL = 'https://statuscallback-8821.twil.io/echoRequestTest';
client.messages.create({
    messagingServiceSid: theFromMsgService,
    to: theTo,
    body: theMsg
    , statusCallback: theStatusCallbackURL
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
            exit();
        });
