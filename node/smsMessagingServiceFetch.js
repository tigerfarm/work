// twilio api:core:messages:fetch --sid SM2feb3243087344fcae1652e603fa5462

console.log("++ Fetch SMS message log information.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
let theMessageServiceSid = 'MG3abf3add377453934bcf2aa95e8fcc86';
console.log("+ Account SID: " + process.env.MAIN_ACCOUNT_SID + " Message SID: " + theMessageServiceSid);
client.messaging.v1.services(theMessageServiceSid)
        .fetch()
        .then(ms => {
            console.log(
                    '++ friendlyName: ' + ms.friendlyName
                    , '\n++ links phone numbers: ' + ms.links.phone_numbers
                    , '\n++ UseInboundWebhookOnNumber: ' + ms.UseInboundWebhookOnNumber
                    , '\n++ links: ' + JSON.stringify(ms.links)
                    );
        });
           