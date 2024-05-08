console.log("+++ Start.");
// Documentation:
// https://www.twilio.com/docs/iam/api/subaccounts, getting subaccount info.

// Use subaccount:
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN,
        {accountSid: process.env.MACHINE_ACCOUNT_SID});
// Use main account:
// var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

theMsg = "Hello 5";
// fromPn=process.env.MAIN_PHONE_NUMBER_1;
fromPn = process.env.PHONE_NUMBER1;
client.messages.create({
    from: fromPn,
    to: process.env.MY_PHONE_NUMBER,
    body: theMsg
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
            exit();
        });
