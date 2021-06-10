console.log("++ Delete a Conversation.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = 'CHe443addf201f4003aa5890f953c8037e';

client.conversations.conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Delete conversation, SID: " + conversation.sid
                    + " " + conversation.friendlyName
                    );
            client.conversations.conversations(conversationSid).remove();
        });
