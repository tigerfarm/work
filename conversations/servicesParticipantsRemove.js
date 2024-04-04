console.log("++ Remove a participant from a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

serviceSid = 'IS186702e405b74452a449d67b9265669f';       // Frontline
conversationSid = "CH8aeaf8fdb8e54440a1a281bb9cf0d360";
participantSid = 'MBc2b6e65aaac84afda5d73fd261680fc3';
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
