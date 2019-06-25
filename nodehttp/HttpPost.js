var request = require('request');
var basicAuth = "Basic " + Buffer.from(process.env.ACCOUNT_SID + ":" + process.env.AUTH_TOKEN).toString("base64");
// var theRequestUrl = "https://api.twilio.com/2010-04-01/Accounts/" + process.env.ACCOUNT_SID + "/Messages." + "json";
var theRequestUrl = "http://localhost:8000/2010-04-01/Accounts/" + process.env.ACCOUNT_SID + "/Messages." + "json";
var theFormData = {
    From: process.env.PHONE_NUMBER3,
    To: process.env.PHONE_NUMBER4,
    Body: 'Twilio support'
};
console.log('+ URL request: ' + theRequestUrl + " : " + JSON.stringify(theFormData));
request({
    method: "POST",
    headers: {
        "Authorization": basicAuth,
        'content-type': 'application/x-www-form-urlencoded'
    },
    url: theRequestUrl,
    formData: theFormData
}, function (error, response, body) {
    console.log(body);
});

// eof