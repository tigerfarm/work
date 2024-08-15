console.log("+++ Create verification.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
// theTo = process.env.MY_PHONE_NUMBER;
// theChannel = 'sms';
theTo = process.env.EMAIL_DT;   // EMAIL_DT EMAIL_TF
theChannel = 'email';
//
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + "\n+ verifyServiceSID: " + verifyServiceSID
        + "\n+ theChannel: " + theChannel
        + "\n+ to: " + theTo
        );

async function createVerification() {
    const verification = await client.verify.v2
            .services(verifyServiceSID)
            .verifications.create({
                channel: theChannel,
                to: theTo
            }).catch(function (err) {
        console.error("-- Error: " + err.message + ", code: " + err.code);
        console.log("--- Exit.");
    });
    if (verification === undefined) {
        return;
    }
    console.log("++ verification.sid: " + verification.sid);
    console.log("++ verification.sid: " + JSON.stringify(verification));
}
createVerification();
