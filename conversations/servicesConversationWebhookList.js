console.log("++ List a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
// var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN, {logLevel: 'debug'});
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
serviceSid = "IS5c86b7d0d6e44133acb09734274f94f6";       // Testing
// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CHe02e49468eb64f8aaa92a845f10ece78";
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
      