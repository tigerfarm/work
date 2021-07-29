console.log("++ Update a Conversation resource.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
conversationFriendlyName = 'ReadyP1';
client.conversations.conversations(conversationSid)
        .update({friendlyName: conversationFriendlyName})
        .then(conversation => console.log('+ Conversation updated: ' + conversation.sid));

      