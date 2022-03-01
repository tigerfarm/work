console.log("++ Remove a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
client.conversations.services(serviceSid).conversations.list({limit: 20})
        .then(conversations => conversations.forEach(c => {
                console.log(
                        "+ Remove conversation SID: " + c.sid
                        + " " + c.friendlyName
                        );
                client.conversations.services(serviceSid)
                        .conversations(c.sid)
                        .remove();
            }));