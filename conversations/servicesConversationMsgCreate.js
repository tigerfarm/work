console.log("++ Create a text message for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6';      // Testing
//
// conversationSid = process.env.CONVERSATION_SID;
// conversationSid = "CH5ae2655888904021a43f0d69d6cf9917";     // Frontline conversation for notifications
conversationSid = "CHe02e49468eb64f8aaa92a845f10ece78";
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
//
participantIdentity = 'dave';
messageText = 'dave4n';
console.log("+ Participant Identity: " + participantIdentity
        + ", message: " + messageText
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .messages
        .create({
            author: participantIdentity, body: messageText
            , xTwilioWebhookEnabled: true
        })
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

