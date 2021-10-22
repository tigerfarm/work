console.log("+++ List all messages for a services's conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
//
// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline

// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CH183bde74b2314d2faef9a1c757b8f028";

console.log("+ Service SID: " + serviceSid + ", Conversation SID: " + conversationSid );
client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Conversations SID/uniqueName/friendlyName: " + conversation.sid
                    + "/" + conversation.uniqueName
                    + "/" + conversation.friendlyName
                    );
            console.log("+ Delete all messages in the conversation.");
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
                        }));
        });

