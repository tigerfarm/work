console.log("++ Fetch, then update a conversation's data.");
// https://www.twilio.com/docs/conversations/api/conversation-resource
// 
// Note, both active and inactive conversations are displayed in Frontline. Closed conversations are not displayed.
//
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6'; // Testing
// serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
conversationSid = 'CH1509b3a92b8c4c7bbcf8d11ff9857fb1';
console.log("++ Conversation SID: " + conversationSid);
client.conversations.v1.conversations(conversationSid)
      .update({friendlyName: 'Important Customer Question'})
      .then(conversation => console.log(conversation.friendlyName));

