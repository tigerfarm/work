console.log("++ Create a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
conversationFriendlyName = 'Hello3';
console.log("+ Messaging Service SID: default configured service."
        + ", Friendly Name: " + conversationFriendlyName);

client.conversations.conversations
        .create({
            messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
            friendlyName: conversationFriendlyName
        })
        .then(conversation => {
            console.log(
                    "+ Conversation SID: " + conversation.sid
                    + " " + conversation.friendlyName
                    );
        });
        