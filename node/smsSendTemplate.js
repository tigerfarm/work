console.log("++ Send SMS message using a template.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
theMsgService = "MGf0df9883c5d0720e89ad6c14e2a76f9f";
HxTemplate = "HX919e747ae34b794c918f96614ff85ac9";
theMsg = "Hello 1";
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", from: " + theMsgService
        + ", to: " + process.env.MY_PHONE_NUMBER
        + ", MSG: " + theMsg);
client.messages.create({
    from: theMsgService,
    to: process.env.MY_PHONE_NUMBER,
    contentSid: HxTemplate,
    contentVariables: JSON.stringify({'1': theMsg})
    // , body: "okay1"
    // , statusCallback: process.env.ECHO_REQUEST_URL
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
            exit();
        });
