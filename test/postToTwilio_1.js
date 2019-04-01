// -----------------------------------------------------------------------------
console.log("+++ Start echo.");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const syncServiceSid = process.env.SYNC_SERVICE_SID;
// const syncMap = process.env.SYNC_MAP_NAME;
const syncMap = "service1";
console.log("+ ACCOUNT_SID      :" + accountSid + ":");
console.log("+ AUTH_TOKEN       :" + authToken + ":");
console.log("+ SYNC_SERVICE_SID :" + syncServiceSid + ":");
console.log("+ SYNC_MAP_NAME    :" + syncMap + ":");
theRequest = "https://sync.twilio.com/v1/Services/" + syncServiceSid + "/Maps";
console.log('+ theRequest: ' + theRequest);
AuthorizationSidToken = "Basic " + new Buffer(accountSid + ":" + authToken).toString("base64");
var got = require('got');

var querystring = require("querystring");
var twilioPayload = querystring.stringify({
    "Ttl": 0,
    "UniqueName": syncMap
});
got.post(theRequest,
        {headers: {
                "Authorization": AuthorizationSidToken,
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(twilioPayload)
            },
            twilioPayload}
).catch(function (error) {
    console.log(error);
    // callback("- Error posting message: " + error);
});

var options = {
    headers: {
        "Authorization": AuthorizationSidToken
    },
    Ttl: 0,
    UniqueName: syncMap
};
// got.post(theRequest, options).then(function (response) {
//     console.log(response.body);
// callback("+ Message posted.");
// });
// -----------------------------------------------------------------------------

