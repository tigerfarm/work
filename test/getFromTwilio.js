
// -----------------------------------------------------------------------------
console.log("+++ Start echo.");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const syncServiceSid = process.env.SYNC_SERVICE_SID;
const syncMap = process.env.SYNC_MAP_NAME;
console.log("+ ACCOUNT_SID      :" + accountSid + ":");
console.log("+ AUTH_TOKEN       :" + authToken + ":");
console.log("+ SYNC_SERVICE_SID :" + syncServiceSid + ":");
console.log("+ SYNC_MAP_NAME    :" + syncMap + ":");
theRequest = "https://sync.twilio.com/v1/Services";
console.log('+ theRequest: ' + theRequest);

basicAuth = "Basic " + new Buffer(accountSid + ":" + authToken).toString("base64");
var options = {
    headers : {
        "Authorization" : basicAuth
    }
};
var got = require('got');
got(theRequest,
    options
        ).then(function (response) {
    console.log(response.body);
    callback("+ Message posted.")
}).catch(function (error) {
    console.log(error);
    callback("- Error posting message: " + error);
});
// -----------------------------------------------------------------------------
console.log("+++ Exit.");
