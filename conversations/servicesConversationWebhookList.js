console.log("++ List a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
// var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN, {logLevel: 'debug'});
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .webhooks
        .list({limit: 20})
        .then(webhooks => webhooks.forEach(w => {
                console.log("++ SID: " + w.sid );
                console.log("+++ filters: " + w.configuration.filters );
                console.log("+++ URL: " + w.configuration.url );
                console.log("+++ preWebhookUrl: " + w.configuration.preWebhookUrl );
        }));
      