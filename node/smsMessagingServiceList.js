// twilio api:core:messages:fetch --sid SM2feb3243087344fcae1652e603fa5462

console.log("++ Fetch SMS message log information.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
let theMessageServiceSid = 'MG59cd7596af3f40b86bce2052ded6b034';
console.log("+ Account SID: " + process.env.ACCOUNT_SID + " Message SID: " + theMessageServiceSid);
client.messaging.v1.services(theMessageServiceSid)
        .fetch()
        .then(ms => {
            console.log(
                    '++ friendlyName: ' + ms.friendlyName
                    , '\n++ links phone numbers: ' + ms.links.phone_numbers
                    , '\n++ links: ' + JSON.stringify(ms.links)
                    );
        });
           