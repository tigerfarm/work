theFriendlyName = "test1c";
console.log("++ Create a Messaging Service, theFriendlyName: " + theFriendlyName);
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Account SID, MAIN_ACCOUNT_SID: " + process.env.MAIN_ACCOUNT_SID);
client.messaging.v1.services
        .create({
            friendlyName: theFriendlyName
            , useInboundWebhookOnNumber: true  // Use Incoming Messages option: Defer to sender’s webhook
        })
        .then(service => console.log(
                    '++ Service SID: ' + service.sid
                    ));
           