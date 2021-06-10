console.log("++ Update a Conversation resource.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationFriendlyName = 'ReadyP1';
conversationSid = 'CH8d7417553a9d4b1d801ca278787699c6';
client.conversations.conversations(conversationSid)
        .update({friendlyName: conversationFriendlyName})
        .then(conversation => console.log('+ Conversation updated: ' + conversation.sid));

      