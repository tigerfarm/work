console.log("++ Remove a conversation's webhook configration.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
// var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN, {logLevel: 'debug'});
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
webhookSid = 'WHe51bf17f12814afcaaf8eedb56e2dd26';
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
      