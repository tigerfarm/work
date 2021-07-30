console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
participantSid = 'MB466c691bc70d4b00940d2f80c5abdae8';
console.log("+ Conversation SID: " + conversationSid
        + " Participant Identity: " + participantSid
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .fetch()
        .then(participant => {
            console.log(
                    "+ Delete participant, SID: " + participant.sid
                    + " identity: " + participant.identity
                    );
            client.conversations.conversations(conversationSid).participants(participantSid).remove();
        });
