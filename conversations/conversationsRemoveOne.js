console.log("++ Delete a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = 'CHd869e1a5de294e68843aca67947dcfd5';

client.conversations.conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Remove conversation, SID: " + conversation.sid
                    + " " + conversation.friendlyName
                    );
            client.conversations.conversations(conversationSid).remove();
        });
