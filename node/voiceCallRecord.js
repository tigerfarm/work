var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
// TwiML to dial "client:stacywork": https://handler.twilio.com/twiml/EH75e6aa29c61818a8fd6c22a52329ae51
client.calls.create({
    record: true,
    recordingChannels: "dual",
    recordingStatusCallbackMethod: "GET", 
    recordingStatusCallback: "http://tigerfarmpress.com/cgi/echo.php",
    url: "https://handler.twilio.com/twiml/EH75e6aa29c61818a8fd6c22a52329ae51",
    from: process.env.PHONE_NUMBER_1,
    to: "client:david"
}, function (err, call) {
    console.log(call.sid);
});
