console.log("+++ List and delete all messages for a services's conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
//
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CHe02e49468eb64f8aaa92a845f10ece78";
// serviceSid = "IS0e9b3863450252891f81f312a6e3a7d7";       // Testing
// serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55';       // Default
// serviceSid = 'IS186702e405b74452a449d67b9265669f';       // Frontline
// conversationSid = "CH7db02b3cb4d747d2bbf8eca71207f7dd";  // Default: tfpecho
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
            console.log("+ Delete all messages in the conversation.");
            console.log("          SID                                 Author, Message");
            client.conversations.services(serviceSid).conversations(conversationSid)
                    .messages
                    .list({limit: 200})
                    .then(messages => messages.forEach(message => {
                            console.log(
                                    "+ Remove: " + message.sid
                                    // + "  " + message.index
                                    + "  " + message.author
                                    );
                            client.conversations.services(serviceSid).conversations(conversationSid)
                                    .messages(message.sid).remove();
                        }));
        });

