console.log("++ Create a chat participant for a Conversation.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
participantIdentity = 'chat3a';
console.log("+ Conversation SID: " + conversationSid
        + " Participant Identity: " + participantIdentity
        );
client.conversations.conversations(conversationSid)
        .participants
        .create({identity: participantIdentity})
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ));
