console.log("++ Send SMS message using a messaging service.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
theMsg = "Hello 2";
theFromMsgService = "MG9abb26060f3b4b8ff952eb775544789a";
theTo = process.env.MY_PHONE_NUMBER
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", theFromMsgService: " + theFromMsgService
        + ", to: " + theTo
        + ", MSG: " + theMsg);
// theStatusCallbackURL = process.env.ECHO_REQUEST_URL;
theStatusCallbackURL = 'https://statuscallback-8821.twil.io/echoRequestTest';
//
// theFrom = "+13038003875";
client.messages.create({
    // , statusCallback: theStatusCallbackURL   // Add statusCallback here or in the messaging service.
    messagingServiceSid: theFromMsgService,     // This adds the messaging service features and functionality.
    // from: theFromMsgService,                 // "from" can be the messaging service SID.
    // from: process.env.MAIN_PN_7002,          // "from" can be used to override the messaging service selection from the pool of numbers.
    // from: "3038003875",                      // Fails because need "+1".
    to: theTo,                                  // Destination is required.
    body: theMsg                                // Message text is required.
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
            exit();
        });
