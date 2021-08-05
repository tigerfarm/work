console.log("++ Create a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
conversationFriendlyName = 'Hello Conversation 2';
console.log("+ Messaging Service SID: " + process.env.MESSAGING_SERVICE_SID
        + ", Friendly Name: " + conversationFriendlyName);

client.conversations.conversations
        .create({
            messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
            friendlyName: conversationFriendlyName
        })
        .then(conversation => {
            console.log(conversation.sid);
        });
        