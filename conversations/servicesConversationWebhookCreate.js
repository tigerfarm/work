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
        .create({
            'configuration.filters': ['onMessageAdded', 'onMessageUpdated'],
            'configuration.url': 'https://samplefunctions-3239.twil.io/conversationMsgModify',
            'preWebhookUrl': 'https://samplefunctions-3239.twil.io/conversationMsgModify',
            target: 'webhook'
        })
        .then(webhook => console.log("++ Created: " + webhook.sid));


