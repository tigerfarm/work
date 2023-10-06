console.log("+++ List all messages for a services's conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;     // Default
// conversationSid = process.env.CONVERSATION_SID;
// serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55'; // Default
serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6'; // Testing
console.log("+ Conversations service SID: " + serviceSid);
//
// conversationSid = "CH0d499dee76f04d5b97ee6bf27e72a3cd"; // Default: tfpecho
conversationSid = "CH1509b3a92b8c4c7bbcf8d11ff9857fb1";
console.log("+ Conversation SID: " + conversationSid);

client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Conversations SID/uniqueName/friendlyName: " + conversation.sid
                    + "/" + conversation.uniqueName
                    + "/" + conversation.friendlyName
                    + "/state:" + conversation.state
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
                            if (message.media !== null) {
                                // [{"category":"media","filename":"0graphic1w.jpg","size":92724,"content_type":"image/jpeg","sid":"MEd373156040049ffa58a23a40ba2679e5"},{...}...]
                                // console.log(JSON.stringify(message.media));
                                message.media.forEach(media => {
                                    console.log("++ SID: " + media.sid + " " + media.filename);
                                });
                            }
                        }));
        });

