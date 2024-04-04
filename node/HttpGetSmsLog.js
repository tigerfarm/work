var request = require('request');
// var basicAuth = "Basic " + new Buffer(process.env.ACCOUNT_SID + ":" + process.env.AUTH_TOKEN).toString("base64");
accountSid = process.env.ACCOUNT_SID;
var basicAuth = "Basic " + Buffer.from(accountSid + ":" + process.env.AUTH_TOKEN).toString("base64");
//
// Get a single message log:
let theMessageSid = 'SM6fcbde09b8af465ab69127bdc11bbba3';
var theRequestUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages/' + theMessageSid + '.json';
var theFormData = {
    From: process.env.PHONE_NUMBER3,
    To: process.env.PHONE_NUMBER4,
    Body: 'Twilio support'
};
// console.log('+ URL request: ' + theRequestUrl + " : " + JSON.stringify(theFormData));
console.log('+ URL request: ' + theRequestUrl);
request({
    method: "GET",
    headers: {
        "Authorization": basicAuth,
        'content-type': 'application/x-www-form-urlencoded'
    },
    url: theRequestUrl
    // , formData: theFormData
}, function (error, response, body) {
    console.log(body);
});

// eof