var request = require('request');
//
var ACCOUNT_SID = process.env.ACCOUNT_SID;
var AUTH_TOKEN = process.env.AUTH_TOKEN;
var basicAuth = "Basic " + new Buffer(ACCOUNT_SID + ":" + AUTH_TOKEN).toString("base64");
//
var theType = "json";
var theRequestUrl = "https://api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages." + theType;
//
console.log('+ URL request: ' + theRequestUrl + " : " + theFormData);
request({
    // Options
    method: "POST",
    headers: {
        "Authorization": basicAuth,
        'content-type': 'application/x-www-form-urlencoded'
    },
    url: theRequestUrl,
    formData: {
        From: process.env.PHONE_NUMBER3,
        To: process.env.PHONE_NUMBER4,
        Body: 'Twilio support'
    }},
        function (error, response, body) {
            // Call back
            console.log(body);
        }
);

// eof