console.log("++ Remove a participant from a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CHeedba31ca8114e099294549b22fe3336";
participantSid = 'MBceaae8f55ed94a55a218d3e2da8e8137';
console.log("+ Conversation SID: " + conversationSid + " Participant Identity: " + participantSid );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .fetch()
        .then(participant => {
            console.log(
                    "+ Remove participant, SID: " + participant.sid
                    + " identity: " + participant.identity
                    );
            client.conversations.services(serviceSid).conversations(conversationSid).participants(participantSid).remove();
        });
