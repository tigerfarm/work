console.log("++ Send RCS text message.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
theFrom = "rcs:" + process.env.MAIN_PN_7002;
theTo = "rcs:" + process.env.MY_PHONE_NUMBER;
// theTo = process.env.MAIN_PN_8003;
theMsg = "Hello from Dave 1a";
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", from: " + theFrom
        + ", to: " + theTo
        + ", MSG: " + theMsg
        + ", StatusCallback: " + thestatusCallbackUrl
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
