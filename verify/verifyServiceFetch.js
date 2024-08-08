console.log("+++ Fetch Verify service data.");
//
// https://www.twilio.com/docs/verify/api/service#fetch-a-service
//
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", verifyServiceSID: " + verifyServiceSID
        );
async function fetchService() {
    const service = await client.verify.v2
            .services(verifyServiceSID)
            .fetch()
            .catch(function (err) {
                console.error("-- Error code: " + err.code + "\n-- message: " + err.message);
            });
    if (service === undefined) {
        console.log("-- service not found.");
        return;
    }
    console.log("++ " + service.sid + " " + service.friendlyName);
    console.log("+++ codeLength: " + service.codeLength + ", defaultTemplateSid: " + service.defaultTemplateSid);
    // console.log("++ service: " + JSON.stringify(service));
}
fetchService();
