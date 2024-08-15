console.log("+++ TOTP: verify an new factor using update factor with an authentication code.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
theIdentitySID = "ffiddv1a";
factorSID = "YF0266bd3b0da405139cded5ad732c7229";
authenticationCode = "014920";
console.log("+ Twilio account SID:    " + process.env.MAIN_ACCOUNT_SID
        + "\n+ verifyServiceSID:      " + verifyServiceSID
        + "\n+ theIdentitySID:        " + theIdentitySID
        + "\n+ factorSID:             " + factorSID
        + "\n+ authenticationCode:    " + authenticationCode
        );
async function updateNewFactor() {
    const factor = await client.verify.v2
            .services(verifyServiceSID)
            .entities(theIdentitySID)
            .factors(factorSID)
            .update({
                authPayload: authenticationCode
            }).catch(function (err) {
        console.error("-- Error: " + err.message + ", code: " + err.code);
    });
    if (factor === undefined) {
        return;
    }
    console.log("++ factor.status: " + factor.status);
    console.log("++ factor JSON: " + JSON.stringify(factor));
}
updateNewFactor();
