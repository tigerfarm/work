console.log("+++ List all messages for a services's conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;     // Default
// conversationSid = process.env.CONVERSATION_SID;
// serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55';   // Default
serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6';   // Testing
// serviceSid = 'IS186702e405b74452a449d67b9265669f';      // Frontline service
console.log("+ Conversations service SID: " + serviceSid);
//
// conversationSid = "CH0d499dee76f04d5b97ee6bf27e72a3cd"; // Default: tfpecho
conversationSid = "CHe02e49468eb64f8aaa92a845f10ece78";
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
                            theMonth = message.dateCreated.getMonth() + 1;
                            pMonth = "";
                            if (theMonth < 10) {
                                pMonth = "0";
                            }
                            theDay = message.dateCreated.getDay() + 1;
                            pDay = "";
                            if (theDay < 10) {
                                pDay = "0";
                            }
                            theHours = message.dateCreated.getHours() + 1;
                            pHours = "";
                            if (theHours < 10) {
                                pHours = "0";
                            }
                            theMinutes = message.dateCreated.getMinutes() + 1;
                            pMinutes = "";
                            if (theMinutes < 10) {
                                pMinutes = "0";
                            }
                            console.log(
                                    "+ " + message.sid
                                    + "  " + message.index
                                    // 0123456789012345678901234567890123456789012345678901234567890
                                    // Tue Aug 01 2023 10:46:15 GMT-0700 (Pacific Daylight Time)
                                    + " " + pMonth + theMonth
                                    + "/" + pDay + theDay
                                    + "/" + message.dateCreated.getFullYear()
                                    + " " + pHours + theHours + ":" + pMinutes + theMinutes
                                    // + "  " + message.dateCreated.toString().substring(4, 21)
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

