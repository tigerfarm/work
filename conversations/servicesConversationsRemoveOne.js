console.log("++ Remove a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = 'CH56053c069586435795bf7c14417cead9';
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;


client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Remove conversation, SID: " + conversation.sid
                    + " " + conversation.friendlyName
                    );
            client.conversations.services(serviceSid).conversations(conversationSid).remove();
        });

