console.log("++ Delete a participant from a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
participantSid = 'MB5878e13ebe9a4566a478323b1da8c77e';
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
            client.conversations.conversations(conversationSid).participants(participantSid).remove();
        });
