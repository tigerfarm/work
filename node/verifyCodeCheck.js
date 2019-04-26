// Documentation: https://www.twilio.com/docs/verify/api-beta/verification-check-beta
console.log("+++ Start.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
VERIFY_SID = process.env.VERIFY_SID;
//
// Use one or the other to match with the verify code:
verifySid = "VE407a5bc6529b474a396c3028465a9897";
sendTo = process.env.PHONE_NUMBER3;
//
verifyCode = "652191x";
console.log(
        "++ Request a verification code check"
        + ", that was sent to: " + sendTo
        + ", code: " + verifyCode
        + ", verify SID: " + verifyCode
        );
client.verify.services(VERIFY_SID).verificationChecks
        .create({
            to: sendTo,
            // verificationSid: verifySid,
            code: verifyCode
        }).then(
        verification_check =>
    console.log(
            "+ Sent, SID: " + verification_check.sid
            + " Status: " + verification_check.status
            + " valid: " + verification_check.valid
            )).catch(function (err) {
    if (err) {
        console.error("- Error: ", err.message);
        exit();
    }
});
