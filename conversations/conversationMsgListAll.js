console.log("+++ List all messages for a services's conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
// conversationSid = "CHe5581f6e4299402aa77ef237a44c3c40"; // Default: tfpecho
conversationSid = "CH5ae2655888904021a43f0d69d6cf9917";     // Frontline "notify" conversation
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
                                    "+ " + message.sid
                                    + "  " + message.index
                                    + "  " + message.author
                                    + ", \"" + message.body
                                    // + ", \"" + message.body.substring(0, 25) + "...\""
                                    );
                        }))
                    .catch(function (err) {
                        console.error("- " + err);
                        exit();
                    });
        });

