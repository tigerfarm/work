console.log("++ Remove a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// conversationSid = process.env.CONVERSATION_SID;
serviceSid = 'IS186702e405b74452a449d67b9265669f';
conversationSid = 'CHd683f9afefff4affaf89ed28b371a325';
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

