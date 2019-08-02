console.log('+++ Start.');

var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
client.calls.create({
    url: "https://handler.twilio.com/twiml/EHf4e4ee7a3b57c3d4ecf943281d23c2ba",
    from: process.env.PHONE_NUMBER1,
    to: "client:david"
    // to: process.env.MY_PHONE_NUMBER
}, function (err, call) {
    console.log(call.sid);
});
