
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
basicAuth = "Basic " + new Buffer(accountSid + ":" + authToken).toString("base64");

var querystring = require("querystring");
var twilioPayload = querystring.stringify({
    "ttl": 0,
    "uniqueName": syncMap
});
var theLength = Buffer.byteLength(twilioPayload);
// twilioPayload :ttl=0&uniqueName=service1: length: 25
//                1234567890123456789012345
console.log("+ twilioPayload :" + twilioPayload + ": length: " + theLength);

var options = {
    headers: {
        "Authorization": basicAuth,
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": theLength
    },
    twilioPayload
};

var got = require('got');
got.post(theRequest,
        options
        ).then(function (response) {
    console.log(response.body);
    // callback("+ Message posted.");
}).catch(function (error) {
    console.log(error);
    // callback("- Error posting message: " + error);
});
// -----------------------------------------------------------------------------

