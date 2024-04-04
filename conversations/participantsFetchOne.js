console.log("++ Fetch a participant from a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

conversationSid = "CH0269d9f270744259977cff1ae19d5a5f";
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
