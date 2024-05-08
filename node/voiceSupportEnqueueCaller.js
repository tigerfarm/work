console.log('+++ Start.');

var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
// TwiML Bin, Enqueue a caller: support: https://handler.twilio.com/twiml/EH178a08996de934d625b6e493e2e4a19f
client.calls.create({
    url: "https://handler.twilio.com/twiml/EH178a08996de934d625b6e493e2e4a19f",
    from: process.env.PHONE_NUMBER1,
    to: "client:david"
    // to: process.env.MY_PHONE_NUMBER
}, function (err, call) {
    console.log(call.sid);
});
