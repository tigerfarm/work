console.log("++ Send SMS message.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
// theFrom = "whatsapp:" + process.env.MAIN_PN_7002;        // MAIN_PN_8003: registered.
// theTo = "whatsapp:" + process.env.MY_PHONE_NUMBER;
theFrom = process.env.MAIN_PN_7002;        // MAIN_PN_8003: registered.
theTo = process.env.MY_PHONE_NUMBER;
theMsg = "Hello from Dave 5";
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", from: " + theFrom
        + ", to: " + theTo
        + ", MSG: " + theMsg);
//
// Webhooks:
// https://www.twilio.com/docs/proxy/api/webhooks
// theWebhookURL = process.env.ECHO_REQUEST_URL;
//
// theWebhookURL = 'https://statuscallback-2357.twil.io/echoRequestTest';
//
client.messages.create({
    from: theFrom,
    to: theTo,
    body: theMsg
    // , statusCallback: theWebhookURL
    // , OutOfSessionCallbackUrl: theWebhookURL
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
        });
