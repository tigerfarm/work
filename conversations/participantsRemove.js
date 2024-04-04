console.log("++ Delete a participant from a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
// conversationSid = "CH56053c069586435795bf7c14417cead9";
participantSid = 'MB875702719b9148e58f3b6035e39c7f3c';
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
