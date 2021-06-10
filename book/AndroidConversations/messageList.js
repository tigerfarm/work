console.log("++ List Participants for a Conversation.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
console.log("+ Conversation SID: " + conversationSid);
console.log("  SID                                 Author, Message");
client.conversations.conversations(conversationSid)
      .messages
      .list({limit: 20})
      .then(messages => messages.forEach(message => console.log(
      "+ " + message.sid
      // + "  " + message.index
      + "  " + message.author
      + ", \"" + message.body + "\""
      )));

