console.log("+++ List and remove all messages for a services's conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
//
conversationSid = "CHe5581f6e4299402aa77ef237a44c3c40"; // Default: tfpecho
console.log("+ Service SID: default service SID, Conversation SID: " + conversationSid);
client.conversations.conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Conversations SID/uniqueName/friendlyName: " + conversation.sid
                    + "/" + conversation.uniqueName
                    + "/" + conversation.friendlyName
                    );
            //
            console.log("  SID                                 Index, Author, Message");
            client.conversations.conversations(conversationSid)
                    .messages
                    .list({limit: 200})
                    .then(messages => messages.forEach(message => {
                            console.log(
                                    "+ Remove: " + message.sid
                                    + "  " + message.index
                                    + "  " + message.author
                                    + ", \"" + message.body
                                    // + ", \"" + message.body.substring(0, 25) + "...\""
                                    );
                            client.conversations.v1.conversations(conversationSid)
                                    .messages(message.sid)
                                    .remove();
                        }));
        });

