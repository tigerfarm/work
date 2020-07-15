var request = require('request');
// var basicAuth = "Basic " + new Buffer(process.env.ACCOUNT_SID + ":" + process.env.AUTH_TOKEN).toString("base64");
var basicAuth = "Basic " + Buffer.from(process.env.MASTER_ACCOUNT_SID + ":" + process.env.MASTER_AUTH_TOKEN).toString("base64");
var theRequestUrl = "https://api.twilio.com/2010-04-01/Accounts/" + process.env.MASTER_ACCOUNT_SID + "/Messages." + "json";
var theFormData = {
    From: process.env.MASTER_PHONE_NUMBER_1,
    To: process.env.MASTER_PHONE_NUMBER_2,
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