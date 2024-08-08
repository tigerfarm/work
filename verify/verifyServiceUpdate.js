console.log("+++ Update Verify service default template value.");
// Getting Started with Verification Templates:
// https://www.twilio.com/docs/verify/verification-templates
//
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
templateSID = "HJ152393dff43d3a2c1554ab0f28291dbe";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", verifyServiceSID: " + verifyServiceSID
        + ", templateSID: " + templateSID
        );
async function updateServiceDefaultTemplate() {
    const updated = await client.verify.v2
            .services(verifyServiceSID)
            .update({
                defaultTemplateSid: null    // Use "null" to set to default.
                // , friendlyName: "My Verify Service",
            })
            .catch(function (err) {
                console.error("-- Error code: " + err.code + "\n-- message: " + err.message);
            });
    if (updated !== undefined) {
        console.log("++ Service udpated.");
    }
}
updateServiceDefaultTemplate();
