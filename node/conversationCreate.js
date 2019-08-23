console.log("++ Send SMS message.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
conversationFriendlyName = 'Hello Conversation';
console.log("+ Messaging Service SID: " + process.env.MESSAGING_SERVICE_SID
        + ", Friendly Name: " + conversationFriendlyName);

client.conversations.conversations
        .create({
            messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
            friendlyName: conversationFriendlyName
        })
        .then(conversation => console.log(conversation.sid));