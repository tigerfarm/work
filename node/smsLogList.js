console.log("++ Send SMS message.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
theMsg = "Hello 3";
console.log("+ SID: " + process.env.ACCOUNT_SID
        + ", from: " + process.env.PHONE_NUMBER_1
        + ", to: " + process.env.PHONE_NUMBER_3
        + ", MSG: " + theMsg);

client.messages.list({
    dateSentBefore: new Date(Date.UTC(2019, 2, 1, 0, 0, 0)),
    dateSentAfter: new Date(Date.UTC(2019, 0, 1, 0, 0, 0)),
    limit: 20
}).then(messages =>
    messages.forEach(
            m => console.log(m.sid)
    ));


