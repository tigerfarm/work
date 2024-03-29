console.log('+++ Start.');

var accountSid = process.env.MASTER_ACCOUNT_SID;
var authToken = process.env.MASTER_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
// TwiML Bin, Say poem: https://handler.twilio.com/twiml/EH83382136170f8b9fa841074a99eab808
// TwiML Bin, Say message: https://handler.twilio.com/twiml/EH9e38aeacae211a78a911357b4c444849
// TwiML Bin, Dial SIP id: https://handler.twilio.com/twiml/EH830cc014780edb221be252c3a0902bb6
// TwiML Bin, Confernce call template: https://handler.twilio.com/twiml/EH45f92ef40a7ecb36dc2873106e6933fb?conferenceid=support
// TwiML Bin, Dial support queue: https://handler.twilio.com/twiml/EH5fcbab2a898d542c8e28c3e4d458c9fa
// TwiML Bin, Dial home phone number: https://handler.twilio.com/twiml/EHbf385249d1463893db058702529c684e
client.calls.create({
    machineDetection: 'Enable',
    url: "https://handler.twilio.com/twiml/EH92a1cf781574e781b22e618f65d7712f",
    // url: "https://handler.twilio.com/twiml/EHbf385249d1463893db058702529c684e",
    // from: "abc",
    from: process.env.MASTER_PHONE_NUMBER_1,
    // to: process.env.PHONE_NUMBER_HOME
    // to: "sip:zoiper@machine.sip.us1.twilio.com"
    to: "client:david"
    // to: process.env.MY_PHONE_NUMBER
}, function (err, call) {
    console.log(call.sid);
});
