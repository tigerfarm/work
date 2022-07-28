console.log("++ Delete a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = 'CHeae275b5ee0145ea9ffadd40ac0ec377';

client.conversations.conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Remove conversation, SID: " + conversation.sid
                    + " " + conversation.friendlyName
                    );
            client.conversations.conversations(conversationSid).remove();
        });
