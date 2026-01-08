console.log("+++ TOTP: Validate a factor token (authentication code).");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
factorSID = "YF0266bd3b0da405139cded5ad732c7229";
theIdentitySID = "ffiddv1a";
authenticationCode = "116202";
console.log("+ Twilio account SID:    " + process.env.MAIN_ACCOUNT_SID
        + "\n+ verifyServiceSID:      " + verifyServiceSID
        + "\n+ factorSID:             " + factorSID
        + "\n+ theIdentitySID:        " + theIdentitySID
        + "\n+ authenticationCode:    " + authenticationCode
        );
async function createChallenge() {
    const challenge = await client.verify.v2
            .services(verifyServiceSID)
            .entities(theIdentitySID)
            .challenges.create({
                factorSid: factorSID,
                authPayload: authenticationCode
            }).catch(function (err) {
        console.error("-- Error: " + err.message + ", code: " + err.code);
    });
    if (challenge === undefined) {
        return;
    }
    console.log("++ challenge.status: " + challenge.status);    // pending: failed, approved: success/matched
    console.log("++ challenge JSON:   " + JSON.stringify(challenge));
}
createChallenge();
