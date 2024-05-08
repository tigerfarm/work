console.log("+++ List and delete all messages for a services's conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;      // Service, Testing: IS5c86b7d0d6e44133acb09734274f94f6
serviceSid = "IS5c86b7d0d6e44133acb09734274f94f6";       // Testing
// serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55';       // Default
// serviceSid = 'IS186702e405b74452a449d67b9265669f';       // Frontline
// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CHe02e49468eb64f8aaa92a845f10ece78";
//
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Conversations SID:uniqueName/friendlyName:" 
                    + " " + conversation.sid
                    + ":" + conversation.uniqueName
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
                                    + "  " + message.body
                                    );
                            client.conversations.services(serviceSid).conversations(conversationSid)
                                    .messages(message.sid).remove();
                        }));
        });

