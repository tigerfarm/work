console.log("++ Fetch a participant from a Conversation.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
participantSid = 'MBe8f5443183464a7ead8e6290d3bdcaac';
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
