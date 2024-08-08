console.log("+++ Fetch a RateLimit bucket.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA706b554a11dca4066e71ed8ce66749cf";
theRateLimitSid = "RK0669f564c2401802a2b1aa696a76e529";
theBucketSid = "BLf4d63312a63481c88b448373584b5f2c";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID + "\n"
        + "+ verifyServiceSID: " + verifyServiceSID + "\n"
        + "+ theRateLimitSid: " + theRateLimitSid + "\n"
        + "+ theBucketSid: " + theBucketSid
        );
async function fetchBucket() {
    console.log("+ fetchBucket()");
    const bucket = await client.verify.v2
            .services(verifyServiceSID)
            .rateLimits(theRateLimitSid)
            .buckets(theBucketSid)
            .fetch()
            .catch(function (err) {
                console.error("-- Error code: " + err.code + "\n-- message: " + err.message);
            });
    if (bucket === undefined) {
        console.log("-- bucket.sid not found.");
        return;
    }
    console.log("++ bucket.sid: " + bucket.sid);
    console.log("++ bucket Sid: " + JSON.stringify(bucket));
}
fetchBucket();
