console.log("++ Send SMS message with a media attachment.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
sendTo = process.env.MY_PHONE_NUMBER;
sendFrom = process.env.MAIN_PHONE_NUMBER_1;
theMsg = "Hello with media.";
theMediaUrl = 'https://unnatural-seat-1873.twil.io/assets/vcardSample1.vcf';
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

