console.log("++ Fetch a participant from a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
participantSid = 'MB1eadf2bc497c465fb73c30ee37a02192';
console.log("+ Conversation SID: " + conversationSid
        + " participant Sid: " + participantSid
        );
client.conversations.conversations(conversationSid)
      .participants(participantSid)
      .fetch()
      .then(participant => console.log(
      "+ Participant SID: " + participant.sid
      + " identity: " + participant.identity
      ));
