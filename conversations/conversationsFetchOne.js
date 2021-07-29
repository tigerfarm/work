console.log("++ List Conversations.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;

client.conversations.conversations(conversationSid)
      .fetch()
      .then(conversation => console.log(
      "+ Conversations SID: " + conversation.sid
      + " " + conversation.friendlyName
      ));
