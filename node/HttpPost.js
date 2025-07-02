var request = require('request');
console.log('+ SID token: ' + process.env.MAIN_ACCOUNT_SID + " " + process.env.MAIN_AUTH_TOKEN);
var basicAuth = "Basic " + Buffer.from(process.env.MAIN_ACCOUNT_SID + ":" + process.env.MAIN_AUTH_TOKEN).toString("base64");
var theRequestUrl = "https://api.twilio.com/2010-04-01/Accounts/" + process.env.MAIN_ACCOUNT_SID + "/Messages." + "json";
//
theFrom = process.env.MAIN_PN_7002;
theTo = process.env.MY_PHONE_NUMBER;
var theFormData = {
    From: theFrom,
    To: theTo,
    Body: 'Twilio support 2'
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