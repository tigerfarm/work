console.log("++ Delete a participant from a Conversation.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
participantSid = 'MBe61f6a9b04fa4b76829f9fa90c511158';
console.log("+ Conversation SID: " + conversationSid
        + " participant Sid: " + participantSid
        );
client.conversations.conversations(conversationSid)
        .participants(participantSid)
        .fetch()
        .then(participant => {
            console.log(
                    "+ Delete participant, SID: " + participant.sid
                    + " identity: " + participant.identity
                    );
            client.conversations.conversations(conversationSid).remove();
        });
