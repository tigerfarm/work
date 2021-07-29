console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
participantIdentity = 'dave3';
console.log("+ Conversation SID: " + conversationSid
        + " Participant Identity: " + participantIdentity
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants
        .create({
            identity: participantIdentity,
            attributes: JSON.stringify({name: participantIdentity})
        })
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ));

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource
