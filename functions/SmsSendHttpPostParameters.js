/*
    Requires 2 HTTP parameters: To and Body.
    Requires Environment Variables (key value pair) defined:
        https://www.twilio.com/console/functions/configure
        TPN = your Twilio phone number.
 */
exports.handler = function(context, event, callback) {
    let msgTo = event.To || null;
    if (msgTo === null) {
        console.log("-- Required parameter: To.");
        callback(null, "-- Required parameter: To.");
        return;
    }
    let msgBody = event.Body || null;
    if (msgBody === null) {
        console.log("-- Required parameter: Body.");
        callback(null, "-- Required parameter: Body.");
        return;
    }
var theType = "json";
var theRequest = "https://api.twilio.com/2010-04-01/Accounts/" + context.ACCOUNT_SID + "/Messages." + theType;
var basicAuth = "Basic " + new Buffer(context.ACCOUNT_SID + ":" + context.AUTH_TOKEN).toString("base64");
var options = {
    method: 'POST',
    'uri': theRequest,
    headers: {
        "Authorization": basicAuth
    },
    formData: {
        From: context.TPN,
        To: event.To,
        Body: event.Body
    }
};
var request = require('request');
console.log('+ URL request: ' + theRequest);

console.log("++ Make the request.");
function callbackthis(error, response, body) {
    console.log("++ response.statusCode: " + response.statusCode);
    if (!error) {
        const jsonData = JSON.parse(body);
        console.log("++ jsonData.status = " + jsonData.status);
        console.log("++ jsonData: " + body);
    } else {
        console.log("++ error: " + error);
    }
    callback(null, "Requested message send.");
}
request(options, callbackthis);
	
};