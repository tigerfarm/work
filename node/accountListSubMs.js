console.log("+++ Start.");
// Documentation:
// https://www.twilio.com/docs/iam/api/subaccounts, getting subaccount info.

// Use subaccount:
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN,
        {accountSid: process.env.MACHINE_ACCOUNT_SID});
// Use main account:
// var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

client.messaging.v1.services('MG634319110a48b2e82f1a08247cd8f0ba').fetch()
        .then(service => console.log(service.friendlyName));
