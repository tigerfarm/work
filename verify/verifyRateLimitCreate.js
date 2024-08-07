console.log("+++ Create a RateLimit.");
// Since this fails, use my Java sample program.

var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA706b554a11dca4066e71ed8ce66749cf";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", verifyServiceSID: " + verifyServiceSID
        );
theRateLimitSid = "";
async function createRateLimit() {
    console.log("+ createRateLimit()");
    const rateLimit = await client.verify.v2
            .services(verifyServiceSID)
            .rateLimits.create({
                description: "Limit on end user IP Address 4.", // Limit on interval and max
                uniquename: "end_user_ip_address4"              // interval_and _max
            })
            .catch(function (err) {
                console.error("-- Error: " + err.message + ", code: " + err.code);
            });
    if (rateLimit === undefined) {
        console.log("- Failed");
        return;
    }
    console.log("++ rateLimit information");
    theRateLimitSid = rateLimit.sid;
    console.log("++ theRateLimitSid: " + theRateLimitSid);  // Starts with RK.
}
createRateLimit();
if (theRateLimitSid === "") {
    console.log("- createRateLimit failed.");
    process.exit(1);
}
console.log("+++ Normal program exit.");
