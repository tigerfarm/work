console.log("++ Send scheduled SMS message.");
// After the send reques, the logs show:
//      Status: SCHEDULED
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
theMsg = "Scheduled hello 2";
theFromMsgService = "MG9abb26060f3b4b8ff952eb775544789a";
theTo = process.env.MY_PHONE_NUMBER
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", theFromMsgService: " + theFromMsgService
        + ", to: " + theTo
        + ", MSG: " + theMsg);
// theStatusCallbackURL = process.env.ECHO_REQUEST_URL;
theStatusCallbackURL = 'https://statuscallback-8821.twil.io/echoRequestTest';
client.messages.create({
    scheduleType: "fixed",
    sendAt: new Date("2025-03-19 12:21:00"),    // Using my timezone PT. Not using UTC.
    // , statusCallback: theStatusCallbackURL   // Add statusCallback here or in the messaging service.
    messagingServiceSid: theFromMsgService,     // This adds the messaging service features and functionality.
    // from: process.env.MAIN_PN_7002,          // "from" can be used to override the numbers in the messaging pool.
    to: theTo,                                  // Destination is required.
    body: theMsg                                // Message text is required.
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
        });
