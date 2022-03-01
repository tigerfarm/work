console.log("++ Remove a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = 'CHc97669141a784c92a74c296c84850d25';

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS186702e405b74452a449d67b9265669f'; // Frontline

client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Remove conversation, SID: " + conversation.sid
                    + " " + conversation.friendlyName
                    );
            client.conversations.services(serviceSid).conversations(conversationSid).remove();
        });

