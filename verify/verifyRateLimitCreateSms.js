console.log("+++ Create verification.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA706b554a11dca4066e71ed8ce66749cf";
theTo = process.env.MY_PHONE_NUMBER
theRateLimitSid = "RK0669f564c2401802a2b1aa696a76e529";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", verifyServiceSID: " + verifyServiceSID
        + ", to: " + theTo
        + ", theRateLimitSid: " + theRateLimitSid
        );

async function createVerification() {
    const verification = await client.verify.v2
            .services(verifyServiceSID)
            .verifications.create({
                channel: "sms",    // Channels: sms whatsapp
                to: theTo,
                rateLimitSid: theRateLimitSid
            }).catch(function (err) {
        console.error("-- Error: " + err.message + ", code: " + err.code);
        console.log("--- Exit.");
    });
    if (verification === undefined) {
        return;
    }
    console.log("++ verification.sid: " + verification.sid);
}
createVerification();
