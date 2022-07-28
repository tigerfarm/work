console.log("+++ List all messages for a services's conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
//
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;     // Default
conversationSid = process.env.CONVERSATION_SID;
//
// serviceSid = 'IS186702e405b74452a449d67b9265669f';   // Frontline
// conversationSid = "CH0d499dee76f04d5b97ee6bf27e72a3cd"; // Default: tfpecho
//
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Conversations SID/uniqueName/friendlyName: " + conversation.sid
                    + "/" + conversation.uniqueName
                    + "/" + conversation.friendlyName
                    );
            //
            console.log("  SID                                 Index, Author, Message");
            client.conversations.services(serviceSid).conversations(conversationSid)
                    .messages
                    .list({limit: 200})
                    .then(messages => messages.forEach(message => {
                            console.log(
                                    "+ " + message.sid
                                    + "  " + message.index
                                    + "  " + message.author
                                    // + ", \"" + message.body.substring(0, 25) + "...\""
                                    + ", \"" + message.body + "\""
                                    );
                        }));
        });

