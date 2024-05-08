console.log("++ Send SMS message.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
theMsg = "Hello 2";
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", from: " + process.env.MAIN_PN_1007         // MAIN_PN_1007: valid number but not registered.
        + ", to: " + process.env.MY_PHONE_NUMBER
        + ", MSG: " + theMsg);
// theStatusCallbackURL = process.env.ECHO_REQUEST_URL;
theStatusCallbackURL = 'https://statuscallback-8821.twil.io/echoRequestTest';
client.messages.create({
    from: process.env.MAIN_PN_1007,
    to: process.env.MY_PHONE_NUMBER,
    body: theMsg
    , statusCallback: theStatusCallbackURL
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
            exit();
        });
