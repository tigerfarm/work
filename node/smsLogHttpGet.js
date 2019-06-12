// Documents:
//  https://www.npmjs.com/package/request
//  https://www.twilio.com/docs/sms/api/message-resource

var request = require('request');

console.log('+++ Start.');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

// Get all logs:
// https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json
// request('https://' + accountSid + ':' + authToken + '@api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json',
//
// Get a single message log:
let theMessageSid = 'SMbb2b59ffc26d9ec0ff1da00ed5207f3b';
// https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
request('https://' + accountSid + ':' + authToken + '@api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages/' + theMessageSid + '.json',
        function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            console.log('+++ Exit.');
        });
