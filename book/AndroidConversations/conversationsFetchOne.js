console.log("++ List Conversations.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = 'CH8d7417553a9d4b1d801ca278787699c6';

client.conversations.conversations(conversationSid)
      .fetch()
      .then(conversation => console.log(
      "+ Conversations SID: " + conversation.sid
      + " " + conversation.friendlyName
      ));
