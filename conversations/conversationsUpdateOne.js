console.log("++ Update a Conversation resource.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CHeae275b5ee0145ea9ffadd40ac0ec377";
theName = 'studio1f';
console.log('+ Update, conversation SID: ' + conversationSid + " Name: " + theName);
client.conversations.conversations(conversationSid)
        .update({friendlyName: theName})
        // .update({uniqueName: theName})
        .then(conversation => console.log('+ Conversation updated: ' + conversation.sid))
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });


      