console.log("++ Send SMS message with a media attachment.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
sendTo = process.env.MY_PHONE_NUMBER;
sendFrom = process.env.MAIN_PN_7002;
theMsg = "Hello with media.";
// theMediaUrl = 'https://statuscallback-8821.twil.io/echoRequestTest';
// theMediaUrl = 'https://tfpbooks.herokuapp.com/images/topImgLeft.jpg';
theMediaUrl = 'https://github.com/tigerfarm/work/blob/main/book/rec1a.m4a';
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        + ", from: " + sendFrom
        + ", to: " + sendTo
        + ", MSG: " + theMsg
        + ", theMediaUrl: " + theMediaUrl
        );
client.messages.create({
    from: sendFrom,
    to: sendTo,
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

