console.log("++ Update Messaging Service information.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
let theMessageServiceSid = 'MG9abb26060f3b4b8ff952eb775544789a';
console.log("+ Account SID: " + process.env.MAIN_ACCOUNT_SID + " Message SID: " + theMessageServiceSid);
client.messaging.v1.services(theMessageServiceSid)
        // .update({friendlyName: 'test2'})
        .update({useInboundWebhookOnNumber: true})    // Use Incoming Messages option: Defer to sender’s webhook
        .then(ms => {
            console.log(
                    '++ friendlyName: ' + ms.friendlyName
                    , '\n++ links phone numbers: ' + ms.links.phone_numbers
                    , '\n++ useInboundWebhookOnNumber: ' + ms.useInboundWebhookOnNumber
                    , '\n++ links: ' + JSON.stringify(ms.links)
                    );
        });
