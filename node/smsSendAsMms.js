console.log("++ Send SMS message.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
theMsg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
theFrom = process.env.MAIN_PN_8003         // MAIN_PN_8003: registered.
theTo = process.env.MY_PHONE_NUMBER
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", from: " + theFrom
        + ", to: " + theTo
        + ", MSG: " + theMsg);
// theStatusCallbackURL = process.env.ECHO_REQUEST_URL;
theStatusCallbackURL = 'https://statuscallback-8821.twil.io/echoRequestTest';
client.messages.create({
    from: theFrom,
    to: theTo,
    body: theMsg
    , statusCallback: theStatusCallbackURL
    // , sendAsMms: true
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
            exit();
        });
