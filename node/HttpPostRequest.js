// To Run:
// $ node HttpRequest.js 
// Sample: https://stackoverflow.com/questions/6158933/how-to-make-an-http-post-request-in-node-js?rq=1
// Hello there.

var http = require('http');

var ACCOUNT_SID = process.env.ACCOUNT_SID;
var AUTH_TOKEN = process.env.AUTH_TOKEN;
var theType = "json";
var theRequest = "https://api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages." + theType;

basicAuth = "Basic " + new Buffer(ACCOUNT_SID + ":" + AUTH_TOKEN).toString("base64");
var options = {
    'hostname': 'api.twilio.com',
    'path': theRequest,
    // 'path': "/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages." + theType,
    // 'auth': ACCOUNT_SID + ':' + AUTH_TOKEN,
    // 'auth' : basicAuth,
    headers: {
        "Authorization": basicAuth
    },
    From: process.env.PHONE_NUMBER3,
    To: process.env.PHONE_NUMBER4,
    Body: 'Twilio support'
};
callback = function (response) {
    console.log('STATUS: ' + response.statusCode);
    console.log('HEADERS: ' + JSON.stringify(response.headers));
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
};
http.request(options, callback).end();

console.log("++ Make the request.");

// eof