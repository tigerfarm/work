// twilio api:core:messages:fetch --sid SM2feb3243087344fcae1652e603fa5462

console.log("++ Fetch SMS message log information.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
let theMessageServiceSid = 'MG634319110a48b2e82f1a08247cd8f0ba';    // Default Conversations Service
console.log("+ Account SID: " + process.env.ACCOUNT_SID + " Message SID: " + theMessageServiceSid);
client.messaging.v1.services(theMessageServiceSid)
        .phoneNumbers
        .each(pn => {
            console.log(
                    '++ phoneNumber: ' + pn.phoneNumber
                    // , '\n++ links phone numbers: ' + ms.links.phone_numbers
                    // , '\n++ links: ' + JSON.stringify(ms.links)
                    );
        });

           