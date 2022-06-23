console.log("++ Create a text message for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = "CHe5581f6e4299402aa77ef237a44c3c40";
participantIdentity = 'daveg1';
// messageText = 'From daveg, msg 1';
messageText = 'Hello Riley, this is your dad testing a group texting program. Please send a reply message, thanks.';
console.log("+ Conversation SID: " + conversationSid
        + " Participant Identity: " + participantIdentity
        + " messageText: " + messageText
        );
client.conversations.conversations(conversationSid)
        .messages
        .create({author: participantIdentity, body: messageText})
        .then(message => console.log(
                    "+ Created message, SID: " + message.sid
                    ));
