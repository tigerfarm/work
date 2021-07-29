console.log("++ Create a webhook filter list for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
filterList = ['onMessageAdded', 'onParticipantAdded', 'onParticipantRemoved'];
console.log("+ Conversation SID: " + conversationSid
        + "\n+ filterList: " + filterList
        + "\n+ Webhook URL: " + process.env.ECHO_REQUEST_URL
        );
client.conversations.conversations(conversationSid)
        .webhooks
        .create({
            'configuration.filters': filterList,
            'configuration.url': process.env.ECHO_REQUEST_URL,
            'configuration.method': 'GET',
            target: 'webhook'
        })
        .then(webhook => console.log(
                    "+ Created webhook, SID: " + webhook.sid
                    ));
            
// Each individual Conversation can have as many as five such webhooks, as needed for your use case.
// https://www.twilio.com/docs/conversations/api/conversation-scoped-webhook-resource?code-sample=code-create-attach-a-new-conversation-scoped-webhook&code-language=Node.js&code-sdk-version=3.x
// 
// target: The target of this webhook: webhook, studio, trigger
// "filters" 
// https://www.twilio.com/docs/conversations/api/webhook-configuration-resource
// "filters": The list of webhook event triggers that are enabled for this Service:
//   onConversationUpdated, onConversationRemoved, 
//   onParticipantAdded, onParticipantUpdated, onParticipantRemoved
//   onMessageAdded, onMessageUpdated, onMessageRemoved, 

