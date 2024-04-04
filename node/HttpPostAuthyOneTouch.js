var request = require('request');
API_KEY = process.env.AUTHY_API_KEY;
param_AuthyId = process.env.AUTHY_ID;
theRequest = "https://api.authy.com/onetouch/json/users/" + param_AuthyId + "/approval_requests?api_key=" + API_KEY;
var theParameters = 'message=Tiger Farm Press approval requested.';
console.log('+ URL request: ' + theRequest);
request({
    url: theRequest + "&" + theParameters,
    method: "POST"
}, function (error, response, body) {
    console.log(body);
});

console.log("++ Make the request.");

// eof