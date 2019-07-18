console.log('+++ Start.');

var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);

var callSid = process.argv[2] || "";
if (callSid !== "") {
    console.log("+ Call SID required: " + callSid);
}
console.log("+ Get call data for the call SID: " + callSid);
// Properties available: https://www.twilio.com/docs/voice/api/call#call-properties
client.calls(callSid)
      .fetch()
      .then(call => console.log(
      '++ Call From: ' + call.from
      + ' status: ' + call.status
      ));
      
  
