var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
client.calls.create({
    from: process.env.PHONE_NUMBER_1,
    to: "client:stacyhere",
    url: "https://handler.twilio.com/twiml/EH45f92ef40a7ecb36dc2873106e6933fb?conferenceid=support"
}, function (err, call) {
    console.log(call.sid);
});

client.calls.create({
    from: process.env.PHONE_NUMBER_1,
    to: "sip:zoiper@machine.sip.us1.twilio.com",
    url: "https://handler.twilio.com/twiml/EH45f92ef40a7ecb36dc2873106e6933fb?conferenceid=support"
}, function (err, call) {
    console.log(call.sid);
});
