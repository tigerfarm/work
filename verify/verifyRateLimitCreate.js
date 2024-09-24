console.log("+++ Create a RateLimit.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA706b554a11dca4066e71ed8ce66749cf";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + "\n+ MAIN_AUTH_TOKEN:    " + process.env.MAIN_AUTH_TOKEN
        + "\n+ verifyServiceSID:   " + verifyServiceSID
        );
async function createRateLimit() {
    console.log("+ createRateLimit()");
    const rateLimit = await client.verify.v2
            .services(verifyServiceSID)
            .rateLimits.create({
                description: "Limit verifications by End User IP Address", // Limit on interval and max
                uniqueName: "end_user_ip_address8e"                         // interval_and _max
            })
            .catch(function (err) {
                console.error("-- Error: " + err.message + ", code: " + err.code);
            });
    if (rateLimit !== undefined) {
        console.log("++ rateLimit information");
        console.log("++ theRateLimitSid: " + rateLimit.sid);  // Starts with RK.
    }
    console.log("+ Program will exit.");
}
createRateLimit();

// eof