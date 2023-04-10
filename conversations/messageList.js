console.log("++ List text messages for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
console.log("+ Conversation SID: " + conversationSid);
console.log("  SID                                 Author, Message");
client.conversations.conversations(conversationSid)
        .messages
        .list({limit: 200})
        .then(messages => messages.forEach(message => {
                theMessage = "+ " + message.sid
                        // + "  " + message.index
                        + "  " + message.author;
                if (message.media == null) {
                    theMessage = theMessage + ", \"" + message.body + "\"";
                } else {
                    // + IM81e23614fafb4eb89f8e1156fc0dd91f, message.media: "[{"category":"media","size":1089915,"filename":"image000000.jpg","content_type":"image/jpeg","sid":"ME553f506046f101dbd061eed4ba9a63bc"}]"
                    theMessage = theMessage + ", message.media: \"" + JSON.stringify(message.media) + "\"";
                }
                console.log(theMessage);
            }));

