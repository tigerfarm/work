console.log("++ Delete a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = 'CHf231522f87974852a218e165e61768dc';

client.conversations.conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Remove conversation, SID: " + conversation.sid
                    + " " + conversation.friendlyName
                    );
            client.conversations.conversations(conversationSid).remove();
        });
