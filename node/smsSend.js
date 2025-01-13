console.log("++ Send SMS message.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
theFrom = process.env.MAIN_PN_7002;        // MAIN_PN_8003: registered.
theTo = process.env.MY_PHONE_NUMBER;
// theTo = process.env.MAIN_PN_8003;
theMsg = "Hello from Dave 6a";
// theTo = '+';
// theMsg = "Test message from Stacy of Twilio support, test: 1.";
// 
// thestatusCallbackUrl = "https://tfpbooks.herokuapp.com/echo";
// thestatusCallbackUrl = "https://statuscallback-8821.twil.io/echoRequestTestx?#rc=5&rp=all";
// thestatusCallbackUrl = "https://statuscallback-8821.twil.io/echoRequestTest?#rp=all&rc=3";
thestatusCallbackUrl = "https://statuscallback-8821.twil.io/echoRequestTest?#rp=all&rt=15000";
//
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
    , statusCallback: thestatusCallbackUrl
    // , statusCallbackMethodx: "GET" // this option doesn't seem to work anymore and I could not find it in the docs anymore.
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
        });
