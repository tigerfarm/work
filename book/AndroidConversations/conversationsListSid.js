console.log("++ List Conversations.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// client.conversations(conversationSid).conversations.list({
//    sid: process.env.CONVERSATIONS_SERVICE_SID,  (conversationSid)
conversationSid = process.env.CONVERSATION_SID;
client.conversations.conversations
        .list({limit: 20})
        .then(conversations => conversations
                    .forEach(c => console.log(
                                "+ Conversations SID: " + c.sid
                                + " " + c.friendlyName
                                )));
      