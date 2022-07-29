console.log("++ Create a text message for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
// serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
// conversationSid = "CH183bde74b2314d2faef9a1c757b8f028";
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
//
participantIdentity = 'daveg1';
messageText = 'msg3';
console.log("+ Participant Identity: " + participantIdentity
        + " messageText: " + messageText
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .messages
        .create({author: participantIdentity, body: messageText})
        .then(message => console.log(
                    "+ Created message, SID: " + message.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });

// https://www.twilio.com/docs/conversations/api/conversation-message-resource?code-sample=code-create-a-conversation-message&code-language=Node.js&code-sdk-version=3.x
// author: The channel specific identifier of the message's author. Defaults to system.
// body: The content of the message, can be up to 1,600 characters long.
