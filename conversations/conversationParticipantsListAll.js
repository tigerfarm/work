console.log("++ List Participants for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

client.conversations.v1.participantConversations
  // .list({address: '+6596155405', limit: 20})
  .list({limit: 20})
  .then(participantConversations => participantConversations
  .forEach(p => console.log(p.conversationSid)));
