console.log("+++ Start, list messaging service information for a subaccount.");
// Documentation:
//      https://www.twilio.com/docs/iam/api/subaccounts, getting subaccount info.
// Messaging service:
//      https://www.twilio.com/docs/messaging/services/api

// Using subaccount account SID and auth token to confirm:
// var client = require('twilio')(process.env.MACHINE_ACCOUNT_SID, process.env.MACHINE_AUTH_TOKEN);

// Use subaccount API Key and secret string:
const accountSid = process.env.MACHINE_ACCOUNT_SID; // Must use a variable.
const client = require('twilio')(process.env.MACHINE_API_KEY, process.env.MACHINE_API_KEY_SECRET, {accountSid});

client.messaging.v1.services('MG507899be5f0b346466b088f148b94104')
        .fetch()
        .then(service => {
            var theFriendlyName = service.friendlyName;
            console.log(
                    '++ Messaging service friendlyName: ' + theFriendlyName
                    );
            client.messaging.v1.services('MG507899be5f0b346466b088f148b94104')
                    .update({friendlyName: theFriendlyName + ""})
                    .then(service => {
                        console.log(
                                '++ Messaging service friendlyName: ' + service.friendlyName
                                );
                    });
        });

