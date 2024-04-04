console.log("++ List a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
// var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN, {logLevel: 'debug'});
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
webhookSid = 'WH34620dfe45d1469ab9cadb2c6006dbdf';
client.conversations.services(serviceSid).conversations(conversationSid)
        .webhooks(webhookSid)
        .fetch()
        .then(webhook => {
                console.log("++ SID: " + webhook.sid);
                console.log("+++ filters: " + webhook.configuration.filters);
                console.log("+++ URL: " + webhook.configuration.url);
            });
      