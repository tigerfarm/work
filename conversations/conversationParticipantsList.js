console.log("++ List Participants for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CH0269d9f270744259977cff1ae19d5a5f";
console.log("+ Conversation SID: " + conversationSid);
client.conversations.conversations(conversationSid)
        .participants
        .list({limit: 20})
        .then(participants => participants.forEach(p => {
                if (p.identity !== null) {
                    console.log("+ Participant SID: " + p.sid + " identity, Chat: " + p.identity);
                } else {
                    console.log("+ Participant SID: " + p.sid + " identity, SMS:  " + JSON.parse(p.attributes).name);
                }
            })
        );
