// Sample: https://github.com/request/request

var ACCOUNT_SID = process.env.ACCOUNT_SID;
var AUTH_TOKEN = process.env.AUTH_TOKEN;
var theType = "json";
var theRequest = "https://api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages." + theType;
var basicAuth = "Basic " + new Buffer(ACCOUNT_SID + ":" + AUTH_TOKEN).toString("base64");
var options = {
    method: 'POST',
    'uri': theRequest,
    headers: {
        "Authorization": basicAuth
    },
    formData: {
        From: process.env.PHONE_NUMBER_3,
        To: process.env.PHONE_NUMBER_4,
        Body: 'Twilio support'
    }
};
var request = require('request');
console.log('+ URL request: ' + theRequest);
function callback(error, response, body) {
    console.log("++ response.statusCode: " + response.statusCode);
    if (!error) {
        const jsonData = JSON.parse(body);
        console.log("++ jsonData.status = " + jsonData.status);
        console.log("++ jsonData: " + body);
    } else {
        console.log("++ error: " + error);
    }
}
console.log("++ Make the request.");
request(options, callback);

// eof