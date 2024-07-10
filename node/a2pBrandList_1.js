console.log("++ List account brands.");
// https://www.twilio.com/docs/messaging/api/brand-registration-resource#list-an-accounts-brandregistration-resources
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
        );
const brandRegistrations = await client.messaging.v1.brandRegistrations.list({
    limit: 20,
});

brandRegistrations.forEach((b) => console.log(b.sid));

client.messages.create({
    from: theFrom,
    to: theTo,
    body: theMsg
    , statusCallback: theStatusCallbackURL
}).then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
            console.log("--- Exit.");
            exit();
        });
