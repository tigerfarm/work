console.log("++ Remove a Participants from a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CHeae275b5ee0145ea9ffadd40ac0ec377";
console.log("+ Conversation SID: " + conversationSid);

client.conversations.conversations(conversationSid)
        .participants('MB9da8877772a140bf87d563fcb37c54e6')
        .remove();
