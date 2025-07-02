console.log("++ Send SMS message using a template.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
// Can use a actual sender id or a messaging service containing the sender id.
// theMsgService = "whatsapp:" + process.env.MAIN_PN_7002;
theMsgService = "MGf0df9883c5d0720e89ad6c14e2a76f9f";   // Has my Twilio WhatsApp sender id
//
theTo = "whatsapp:" + process.env.MY_PHONE_NUMBER;
//
// HxTemplate = "HXa5ea4c10049b1945847a8c4c1777af8";       // No parameters
// theParameters = JSON.stringify({});
HxTemplate = "HX30384be33a0f7d439d011a3d953337a9";       // One parameters
//
// HxTemplate = "HX9eddf30c9a69ac1cbe024155d218b4ff";
theParameter1 = "Dave5a";
theParameters = JSON.stringify({'1': theParameter1});
//
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", from: " + theMsgService
        + ", to: " + theTo
        + ", Template JSON parameters: " + theParameters);
client.messages.create({
    from: theMsgService,
    to: theTo,
    contentSid: HxTemplate,
    contentVariables: theParameters     // Without, sends: uses the template's sample parameter value.
    // , statusCallback: process.env.ECHO_REQUEST_URL
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
        });
