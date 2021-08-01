console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
participantSid = 'MB47ac8a7b1b20447189373bbe5db39030';
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
