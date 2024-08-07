console.log("+++ List all Rate Limits.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA706b554a11dca4066e71ed8ce66749cf";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", verifyServiceSID: " + verifyServiceSID
        );
theRateLimitSid = "";
async function listAllRateLimits() {
    console.log("+ listAllRateLimits()");
    const rateLimits = await client.verify.v2
            .services(verifyServiceSID)
            .rateLimits.list({limit: 20})
            .catch(function (err) {
                console.error("-- Error: " + err.message + ", code: " + err.code);
                console.log("--- Exit.");
            });
    if (rateLimits === undefined) {
        console.log("- rateLimits undefined.");
        return;
    }
    console.log("+ List Rate Limit Sids: ");
    rateLimits.forEach((r) =>
        console.log("++ RateLimitSid: " + r.sid)
    );
    console.log("+ EOL");
}

listAllRateLimits();
