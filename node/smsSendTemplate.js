console.log("++ Send SMS message using a template.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
theMsgService = "MGf0df9883c5d0720e89ad6c14e2a76f9f";   // Has my Twilio WhatsApp sender id
HxTemplate = "HX9eddf30c9a69ac1cbe024155d218b4ff";
theTo = "whatsapp:" + process.env.MY_PHONE_NUMBER;
//
theParameter = "Dave4";
theTemplateMsg = JSON.stringify({'1': theParameter});
//
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", from: " + theMsgService
        + ", to: " + theTo
        + ", Template parameter: " + theTemplateMsg);
client.messages.create({
    from: theMsgService,
    to: theTo,
    contentSid: HxTemplate,
    contentVariables: theTemplateMsg     // Without, sends: "Welcome to the machine." Because, "the machine" is a sample value.
    // , statusCallback: process.env.ECHO_REQUEST_URL
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
            exit();
        });
