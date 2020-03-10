exports.handler = function(context, event, callback) {
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
        From: "+16505551111",
        To: "+16505552222",
        Body: 'Twilio support 2'
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
    callback(null, "okay now?");
}
request(options, callbackthis);
	
};