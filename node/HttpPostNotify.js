var request = require('request');
var basicAuth = "Basic " + Buffer.from(process.env.MASTER_ACCOUNT_SID + ":" + process.env.MASTER_AUTH_TOKEN).toString("base64");
console.log('+ basicAuth: ' + basicAuth);
var theRequestUrl = "https://notify.twilio.com/v1/Services/" + process.env.MASTER_NOTIFY_SID + "/Notifications";
console.log('+ theRequestUrl: ' + theRequestUrl);
var ToBindings1 = "ToBinding=" + JSON.stringify({ "binding_type": "sms", "address": "+16504837603" });
var ToBindings = ToBindings1 + "&ToBinding=" + JSON.stringify({ "binding_type": "sms", "address": "+16508661366" });
console.log('+ ToBindings: ' + ToBindings);
var theMessage = "Hello there 1";
console.log('+ theMessage: ' + theMessage);
request({
    method: "POST",
    headers: {
        "Authorization": basicAuth,
        'content-type': 'application/x-www-form-urlencoded'
    },
    url: theRequestUrl,
    body: ToBindings + "&Body=" + theMessage
}, function (error, response, body) {
    console.log(body);
});

// eof