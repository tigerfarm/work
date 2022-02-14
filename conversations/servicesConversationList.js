console.log("++ List a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
// var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN, {logLevel: 'debug'});
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS186702e405b74452a449d67b9265669f'; // Frontline

client.conversations.services(serviceSid).conversations.list({limit: 20})
        .then(conversations => conversations.forEach(c => {
                console.log(
                        "+ Conversation SID: " + c.sid
                        + " " + c.friendlyName
                        );
            }));