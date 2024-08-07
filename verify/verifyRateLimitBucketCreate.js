console.log("+++ Create a RateLimit bucket.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA706b554a11dca4066e71ed8ce66749cf";
theRateLimitSid = "RK0669f564c2401802a2b1aa696a76e529";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", verifyServiceSID: " + verifyServiceSID
        + ", theRateLimitSid: " + theRateLimitSid
        );
async function createBucket() {
    console.log("+ createBucket()");
    const bucket = await client.verify.v2
            .services(verifyServiceSID)
            .rateLimits(theRateLimitSid)
            .buckets.create({
                interval: 60,           // Number of seconds that the rate limit will be enforced over.
                max: 3                  // Maximum number of requests permitted in during the interval.
            });
    console.log("++ bucket.sid: " + bucket.sid);
}
createBucket();
