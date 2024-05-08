console.log('+++ Start.');
// API doc: https://www.twilio.com/docs/voice/api/call#create-a-call-resource
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
var callbackUrl='https://' + process.env.FUNCTIONS_HOST + '/echojsonvalue';
client.calls.create({
    method: 'GET',
    statusCallback: callbackUrl,
    statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    statusCallbackMethod: 'POST',
    timeout: 9,
    //
    url: "https://handler.twilio.com/twiml/EH83382136170f8b9fa841074a99eab808",
    from: process.env.PHONE_NUMBER1,
    to: process.env.MY_PHONE_NUMBER
}, function (err, call) {
    console.log(call.sid);
});
