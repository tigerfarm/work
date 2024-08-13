console.log("+++ Update a verification status.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
theVerificationSID = 'VE14ce322c3368176761abfe976a430dd1';
//
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + "\n+ verifyServiceSID: " + verifyServiceSID
        + "\n+ theVerificationSID: " + theVerificationSID
        );

async function updateVerification() {
    const verification = await client.verify.v2
            .services(verifyServiceSID)
            .verifications(theVerificationSID)
            .update(
                    {status: "canceled"}    // approved canceled pending(not an option)
            ).catch(function (err) {
        console.error("-- Error: " + err.message + ", code: " + err.code);
        console.log("--- Exit.");
    });
    if (verification === undefined) {
        return;
    }
    console.log("++ Status set to: " + verification.status
            + "\n++ Channel: " + verification.channel
            + "\n++ To: " + verification.to
            + "\n++ dateCreated: " + verification.dateCreated
            + "\n++ dateUpdated: " + verification.dateUpdated
            );
    // console.log("++ verification JSON: " + JSON.stringify(verification));
}
updateVerification();
