console.log("++ Upate a participant's identity.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
participantSid = 'MBe8f5443183464a7ead8e6290d3bdcaac';
// participantIdentity = 'smsP1';
participantIdentity = 'chat3b';
console.log("+ Conversation SID: " + conversationSid
        + ", participant Sid: " + participantSid
        + " with new Identity: " + participantIdentity
        );
client.conversations.conversations(conversationSid)
        .participants(participantSid)
        // .update({identity: "abc"})
        // Not allowed to update identity.
        .update({ attributes: JSON.stringify({name: "abc"}) })
        .then(participant => {
            console.log(
                    "+ Conversation SID: " + participant.conversationSid
                    + ", participant SID: " + participant.sid
                    );
        })
        .catch(function (err) {
            console.error("- " + " " + err);
        });
