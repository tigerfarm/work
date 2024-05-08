console.log("++ List Participants for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CHeae275b5ee0145ea9ffadd40ac0ec377";
console.log("+ Conversation SID: " + conversationSid);
client.conversations.conversations(conversationSid)
        .webhooks
        .list({limit: 20})
        .then(webhooks => webhooks.forEach(w => {
                console.log("+ Webhooks SID: " + w.sid);
            })
        );
