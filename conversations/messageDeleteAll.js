console.log("++ Delete all messages for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// conversationSid = process.env.CONVERSATION_SID;
conversationSid = process.env.CONVERSATIONS_ECHO_SID;
console.log("+ Conversation SID: " + conversationSid);
console.log("  SID                                 Author, Message");
client.conversations.conversations(conversationSid)
        .messages
        .list({limit: 200})
        .then(messages => messages.forEach(message => {
                console.log(
                        "+ " + message.sid
                        // + "  " + message.index
                        + "  " + message.author
                        + ", \"" + message.body + "\""
                        );
                client.conversations.conversations(conversationSid)
                        .messages(message.sid).remove();
            }));

