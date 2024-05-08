console.log('+++ Start.');

var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
// TwiML Bin, Dial Queue: support (agent): https://handler.twilio.com/twiml/EHad08f22a9f3bdef913383ca4247e0eb2
client.calls.create({
    url: "https://handler.twilio.com/twiml/EHad08f22a9f3bdef913383ca4247e0eb2",
    from: process.env.PHONE_NUMBER1,
    // to: "client:david"
    to: process.env.MY_PHONE_NUMBER
}, function (err, call) {
    console.log(call.sid);
});
