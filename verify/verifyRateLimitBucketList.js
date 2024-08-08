console.log("+++ Create a RateLimit with a bucket.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA706b554a11dca4066e71ed8ce66749cf";
theRateLimitSid = "RK0669f564c2401802a2b1aa696a76e529";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", verifyServiceSID: " + verifyServiceSID
        + ", theRateLimitSid: " + theRateLimitSid
        );
async function listBuckets() {
    console.log("+ createBucket()");
    const buckets = await client.verify.v2
            .services(verifyServiceSID)
            .rateLimits(theRateLimitSid)
            .buckets.list({limit: 20});
    console.log("+ List Rate Limit Sids: ");
    buckets.forEach((r) => {
        console.log("++ bucket Sid: " + r.sid);
        console.log("++ bucket Sid: " + JSON.stringify(r));
    });
    console.log("+ EOL");
}
listBuckets();
