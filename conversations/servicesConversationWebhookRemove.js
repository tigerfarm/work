console.log("++ Remove a conversation's webhook configration.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
// var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN, {logLevel: 'debug'});
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
webhookSid = 'WH607319f4999b40c796a4402f5d22ff2f';
client.conversations.services(serviceSid).conversations(conversationSid)
        .webhooks(webhookSid)
        .remove()
        .then(webhook => {
            console.log("++ Removed.");
        })
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });
      