console.log("++ Send SMS message.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
theMsg = "Hello with media.";
theMediaUrl = 'http://tigerfarmpress.com/images/topImgLeft.jpg';
console.log("+ SID: " + process.env.ACCOUNT_SID
        + ", from: " + process.env.PHONE_NUMBER1
        + ", to: " + process.env.PHONE_NUMBER2
        + ", MSG: " + theMsg
        + ", theMediaUrl: " + theMediaUrl
        );
client.messages.create({
    from: process.env.PHONE_NUMBER1,
    to: process.env.PHONE_NUMBER2,
    body: theMsg,
    mediaUrl: theMediaUrl
}, function (err, message) {
    if (err) {
        console.error("- Error: ", err.message);
        console.log("--- Exit.");
        exit();
    }
    console.log('+ MMS sent, SID: ' + message.sid);
});

