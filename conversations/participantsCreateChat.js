console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CH52652cb27e81490bbb5cc67c223b857a";
participantIdentity = 'dave2';
console.log("+ Conversation SID: " + conversationSid
        + " Participant Identity: " + participantIdentity
        );
client.conversations.conversations(conversationSid)
        .participants
        .create({
            identity: participantIdentity,
            attributes: JSON.stringify({name: participantIdentity})
        })
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ));

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource
