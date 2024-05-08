console.log("+++ Call into a conference call.");
const twilio = require('twilio');
const client = twilio(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN);
//
callerId = "+16503331234";      // Account Twilio phone number.
callTo = "client:stacyhere";    // client:stacyhere or +16503331234
conferenceId = "support";
//
theUrl = "https://handler.twilio.com/twiml/EH45f92ef40a7ecb36dc2873106e6933fb?conferenceid=" + conferenceId;
// Subaccount Machine, TwiML Bin template named: Conference Call, XML:
// <?xml version="1.0" encoding="UTF-8"?>
// <Response>
//     <Dial><Conference>{{conferenceid}}</Conference></Dial>
// </Response>
client.calls.create({
    from: callerId,
    to: callTo,
    url: theUrl
}, function (err, call) {
    console.log("+ Call SID: " + call.sid);
});
