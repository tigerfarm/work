console.log("++ Remove a Participants from a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CHe5581f6e4299402aa77ef237a44c3c40";
console.log("+ Conversation SID: " + conversationSid);

client.conversations.conversations(conversationSid)
        .participants('MBee076b03fcb2482d868f9489a33283d7')
        .remove();
