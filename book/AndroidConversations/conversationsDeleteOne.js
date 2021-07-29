console.log("++ Delete a Conversation.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = 'CH11ef5af9b0f84af280deb7dccdc0d8ad';

client.conversations.conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Delete conversation, SID: " + conversation.sid
                    + " " + conversation.friendlyName
                    );
            client.conversations.conversations(conversationSid).remove();
        });
