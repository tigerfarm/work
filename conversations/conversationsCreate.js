console.log("++ Create a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
conversationFriendlyName = 'Starter SMS scenario';
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
        