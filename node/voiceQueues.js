console.log('+++ Start.');

const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
var makeRequest = require('request');

theRequest = "http://tigerfarmpress.com/hello.txt";
console.log('+ URL request: ' + theRequest);

console.log("++ Get Client token.");
// https://ACCOUNT_SID:AUTH_TOKEN@api.twilio.com/2010-04-01/Accounts/ACCOUNT_SID/Queues.json
theRequest = "https://" + ACCOUNT_SID + ":" + AUTH_TOKEN + "@" + "api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Queues.json";
console.log('+ theRequest:', theRequest);
makeRequest(theRequest, function (theError, theResponse, theText) {
    theResponseStatusCode = theResponse && theResponse.statusCode;
    if (theResponseStatusCode === 200) {
        is = theText.indexOf("friendly_name");
        while (is >= 0) {
            theText = theText.substring(is + 17);
            qName = theText.substring(0, theText.indexOf(",") - 1);
            theText = theText.substring(theText.indexOf("current_size") + 15);
            qSize = theText.substring(0, theText.indexOf(","));
            console.log("++ qSize: " + qSize + " qName: " + qName);
            is = theText.indexOf("friendly_name");
        }
    } else {
        console.log('- Error:', theError);
        console.log('- Status code: ' + theResponseStatusCode);
    }
});