console.log("+++ Update a RateLimit bucket.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA706b554a11dca4066e71ed8ce66749cf";
theRateLimitSid = "RK0669f564c2401802a2b1aa696a76e529";
theBucketSid = "BL5e9b5c3bf733fe4b4a603ee999e3c7a7";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID + "\n"
        + "+ verifyServiceSID: " + verifyServiceSID + "\n"
        + "+ theRateLimitSid: " + theRateLimitSid + "\n"
        + "+ theBucketSid: " + theBucketSid
        );
async function updateBucket() {
    console.log("+ updateBucket()");
    const bucket = await client.verify.v2
            .services(verifyServiceSID)
            .rateLimits(theRateLimitSid)
            .buckets(theBucketSid)
            .update({
                interval: 120,           // Number of seconds that the rate limit will be enforced over.
                max: 6                  // Maximum number of requests permitted in during the interval.
            });
    console.log("++ bucket.sid: " + bucket.sid);
}
updateBucket();
