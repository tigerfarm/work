console.log("+++ TOTP: list factors for an ID.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
theIdentitySID = "ffiddv1a";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + "\n+ verifyServiceSID: " + verifyServiceSID
        + "\n+ theIdentitySID: " + theIdentitySID
        );
async function listFactors() {
    const factors = await client.verify.v2
            .services(verifyServiceSID)
            .entities(theIdentitySID)
            .factors.list({
                limit: 20
            }).catch(function (err) {
        console.error("-- Error: " + err.message + ", code: " + err.code);
    });
    if (factors === undefined) {
        return;
    }
    factors.forEach((factor) => {
        console.log("++ factor.status:       " + factor.status);
        console.log("++ factor.friendlyName: " + factor.friendlyName);
        console.log("++ factor.sid:          " + factor.sid);
        // console.log("++ factor JSON: " + JSON.stringify(factor));
    });
}
listFactors();
