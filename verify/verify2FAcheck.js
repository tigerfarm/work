console.log("+++ Create verification.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
// verifyServiceSID = "VA706b554a11dca4066e71ed8ce66749cf";
theTo = process.env.MY_PHONE_NUMBER
// theTo = process.env.EMAIL_DT;
verifyCode = "0373";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", verifyServiceSID: " + verifyServiceSID
        + ", to: " + theTo
        + ", verifyCode: " + verifyCode
        );

async function createVerificationCheck() {
    const verification = await client.verify.v2
            .services(verifyServiceSID)
            .verificationChecks.create({
                code: verifyCode,
                to: theTo
            }).catch(function (err) {
        console.error("-- Error: " + err.message + ", code: " + err.code);
    });
    if (verification === undefined) {
        return;
    }
    console.log("++ verification.status: " + verification.status);
}
createVerificationCheck();
