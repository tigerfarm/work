console.log("++ List Participants for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
// conversationSid = "CH4e0b0b2d666c4690aa909e13ba8957eb";
console.log("+ Conversation SID: " + conversationSid);
client.conversations.conversations(conversationSid)
      .participants
      .list({limit: 20})
      .then(participants => participants.forEach(p => console.log(
      "+ Participant SID: " + p.sid
      + " identity: " + p.identity
      )));
