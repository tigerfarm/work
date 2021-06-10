console.log("++ Upate a participant's identity.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
participantSid = 'MB8ac4eca2a94c4636b8c88c4a784679a6';
// participantIdentity = 'smsP1';
participantIdentity = 'chat3b';
console.log("+ Conversation SID: " + conversationSid
        + ", participant Sid: " + participantSid
        + " with new Identity: " + participantIdentity
        );
client.conversations.conversations(conversationSid)
        .participants(participantSid)
        .update(JSON.stringify({identity: 'abc'}))
        .then(participant => {
            console.log(
            "+ Conversation SID: " + participant.conversationSid
            + ", participant SID: " + participant.sid
            );
        });
// .update({identity: participantIdentity})
// .then(participant => {
//     console.log("+ identity updated.");
//    client.conversations.conversations(conversationSid)
//            .participants(participant.sid).fetch()
//            .then(theParticipant => {
//                console.log("+ Participant updated identity: " + theParticipant.identity);
//            });
// });
