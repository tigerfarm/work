console.log("++ Remove a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// conversationSid = process.env.CONVERSATION_SID;
serviceSid = 'IS186702e405b74452a449d67b9265669f';
conversationSid = 'CHb3fc5076ca634cc9a595d92de0dffa54';
//
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Removed conversation, SID: " + conversation.sid
                    + " " + conversation.friendlyName
                    );
            client.conversations.services(serviceSid).conversations(conversationSid).remove();
        });

