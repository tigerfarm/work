console.log("++ Fetch a participant from a Conversation.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
participantSid = 'MBe61f6a9b04fa4b76829f9fa90c511158';
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
