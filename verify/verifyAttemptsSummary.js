console.log("+++ Fetch a Verification Attempt.");
// https://www.twilio.com/docs/verify/api/attempts
// supports SMS, WhatsApp, and Voice channels.
// See query parameters:
//  https://www.twilio.com/docs/verify/api/verification-attempts-summary#query-parameters
//
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
theAttempt = "VL0318935e345a9016d5a78f55e6838dda";
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + "\n+ verifyServiceSID: " + verifyServiceSID
        );
async function fetchVerificationAttemptsSummary() {
    const verificationAttemptsSummary = await client.verify.v2
            .verificationAttemptsSummary()
            .fetch({
                country: "US",
                verifyServiceSid: verifyServiceSID
            })
            .catch(function (err) {
                console.error("-- Error: " + err.message + ", code: " + err.code);
            });
    if (verificationAttemptsSummary === undefined) {
        return;
    }
    console.log("++ totalAttempts:              " + verificationAttemptsSummary.totalAttempts
            + "\n++ totalConverted:             " + verificationAttemptsSummary.totalConverted
            + "\n++ totalUnconverted:           " + verificationAttemptsSummary.totalUnconverted
            + "\n++ conversionRatePercentage:   " + verificationAttemptsSummary.conversionRatePercentage
            );
    // console.log("++ verification JSON data: " + JSON.stringify(verificationAttemptsSummary));
}
fetchVerificationAttemptsSummary();
