var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
// TwiML Bin, Say poem: https://handler.twilio.com/twiml/EH50ee33d250f3302d012d63f6b7e6b1c4
// TwiML Bin, Dial SIP id: https://handler.twilio.com/twiml/EH830cc014780edb221be252c3a0902bb6
// TwiML Bin, Confernce call template: https://handler.twilio.com/twiml/EH45f92ef40a7ecb36dc2873106e6933fb?conferenceid=support
// TwiML Bin, Dial support queue: https://handler.twilio.com/twiml/EH5fcbab2a898d542c8e28c3e4d458c9fa
// TwiML Bin, Dial a phone number: https://handler.twilio.com/twiml/EHf1c4aa7c2da9224d0ae7e5db0768cd08
client.calls.create({
    from: process.env.PHONE_NUMBER_1,
    // to: process.env.PHONE_NUMBER_3,
    to: "client:david",
    // to: "sip:zoiper@machine.sip.us1.twilio.com",
    url: "https://handler.twilio.com/twiml/EHf1c4aa7c2da9224d0ae7e5db0768cd08"
}, function (err, call) {
    console.log(call.sid);
});
