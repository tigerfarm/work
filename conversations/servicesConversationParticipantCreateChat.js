console.log("++ Create an Chat participant for a conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
// serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
// conversationSid = "CHf0220442f8974f559ba663c660f0bcea";
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
//
participantIdentity = 'daveg1';
console.log("+ Participant Identity: " + participantIdentity );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants
        .create({
            identity: participantIdentity,
            attributes: JSON.stringify({name: participantIdentity})
        })
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
        });
