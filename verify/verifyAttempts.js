console.log("+++ List Verification Attempts, with or without filters.");
// https://www.twilio.com/docs/verify/api/attempts
// supports SMS, WhatsApp, and Voice channels.
//
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        );
async function listVerificationAttempts() {
    const verificationAttempts = await client.verify.v2
            .verificationAttempts
            .list({
                // country: "US",
                // status: "converted",  // converted unconverted
                verificationSid: "VEa95dd685dccd723f6ae1541a976f57e1",
                limit: 20})
            .catch(function (err) {
                console.error("-- Error: " + err.message + ", code: " + err.code);
            });
    if (verificationAttempts === undefined) {
        return;
    }
    verificationAttempts.forEach((verificationAttempt) => {
        // console.log("++ verification JSON data: " + JSON.stringify(verificationAttempt));
        console.log("---------------------------------------------------------------------------"
                + "\n++ service SID:        " + verificationAttempt.serviceSid
                + "\n++ verification SID:   " + verificationAttempt.verificationSid
                + "\n++ Attempt SID:        " + verificationAttempt.sid
                + "\n++ conversionStatus:   " + verificationAttempt.conversionStatus
                + "\n++ channel:            " + verificationAttempt.channel
                + "\n++ to:                 " + verificationAttempt.channelData.to
                + "\n++ carrier:            " + verificationAttempt.channelData.carrier
                + "\n++ message_status:     " + verificationAttempt.channelData.message_status
                );
    });
}
listVerificationAttempts();
