console.log("+++ Fetch a Verification Attempt.");
// https://www.twilio.com/docs/verify/api/attempts
// supports SMS, WhatsApp, and Voice channels.
//
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
theAttempt = "VL0318935e345a9016d5a78f55e6838dda";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", theAttempt: " + theAttempt
        );

async function fetchVerificationAttempt() {
    const verificationAttempt = await client.verify.v2
            .verificationAttempts(theAttempt)
            .fetch()
            .catch(function (err) {
                console.error("-- Error: " + err.message + ", code: " + err.code);
            });
    if (verificationAttempt === undefined) {
        return;
    }
    console.log("++ verification.conversionStatus:  " + verificationAttempt.conversionStatus
            + "\n++ verification.channel:           " + verificationAttempt.channel
            + "\n++ verification.to:                " + verificationAttempt.channelData.to
            + "\n++ verification.carrier:           " + verificationAttempt.channelData.carrier
            + "\n++ verification.message_status:    " + verificationAttempt.channelData.message_status
            + "\n++ verification.serviceSid:        " + verificationAttempt.serviceSid
            );
    console.log("++ verification JSON data: " + JSON.stringify(verificationAttempt));
}
fetchVerificationAttempt();
