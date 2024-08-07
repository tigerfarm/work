console.log("+++ Create verification.");
// Check: Enable Custom Verification Code 
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
theTo = process.env.MY_PHONE_NUMBER;
theCustomCode = "abc123";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", verifyServiceSID: " + verifyServiceSID
        + ", to: " + theTo);

async function createVerification() {
    const verification = await client.verify.v2.services(verifyServiceSID)
            .verifications.create({
                channel: "sms",    // Channels: sms whatsapp
                to: theTo,
                customCode: theCustomCode,
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
