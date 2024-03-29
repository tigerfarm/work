console.log("++ Create a conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55'; // Default
serviceSid = 'IS186702e405b74452a449d67b9265669f'; // Frontline
// serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6'; // Testing

conversationFriendlyName = 'Notifications';
console.log("+ Messaging Service SID: " + serviceSid
        + ", Friendly and unique Name: " + conversationFriendlyName
        );
client.conversations.services(serviceSid).conversations
        .create({
            messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
            friendlyName: conversationFriendlyName,
            uniqueName: conversationFriendlyName
        })
        .then(conversation => {
            console.log(
                    "+ Conversation SID: " + conversation.sid
                    + " " + conversation.friendlyName
                    );
        });