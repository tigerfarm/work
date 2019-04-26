console.log("+++ Start.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
VERIFY_SID = process.env.VERIFY_SID;
verifyChannel = "sms";
sendTo = process.env.PHONE_NUMBER3;
console.log(
        "++ Request a verification code"
        + ", to: " + sendTo
        + ", channel: " + verifyChannel
        + ", VERIFY_SID: " + VERIFY_SID
        );
client.verify.services(VERIFY_SID).verifications
        .create({to: sendTo, channel: verifyChannel}).then(
        verification =>
    console.log(
            // Properties: https://www.twilio.com/docs/verify/api-beta/verification-beta#verification-response-properties
            "+ Sent, SID: " + verification.sid
            + " Status: " + verification.status
            + " Time sent: " + verification.dateCreated
            + " Time updated: " + verification.dateUpdated
            )).catch(function (err) {
    if (err) {
        console.error("- Error: ", err.message);
        exit();
    }
});

