console.log("++ Create a text message for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

conversationSid = "CH5ae2655888904021a43f0d69d6cf9917";     // Frontline "notify" conversation
participantIdentity = 'davenotify';
messageText = 'From davenotify, msg 2';
console.log("+ Conversation SID: " + conversationSid
        + " Participant Identity: " + participantIdentity
        + " messageText: " + messageText
        );
client.conversations.conversations(conversationSid)
        .messages
        .create({author: participantIdentity, body: messageText})
        .then(message => console.log(
                    "+ Created message, SID: " + message.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });
