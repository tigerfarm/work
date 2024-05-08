console.log("++ Fetch a conversation's data.");
// https://www.twilio.com/docs/conversations/api/conversation-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55'; // Default
serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6'; // Testing
// serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
//
// conversationSid = process.env.CONVERSATION_SID;
// conversationSid = process.env.CONVERSATIONS_ECHO_SID;
conversationSid = 'CH1509b3a92b8c4c7bbcf8d11ff9857fb1';
//
console.log("++ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log("+ Fetch using the conversation sid: " + conversationSid);
            console.log(
                    "++ Conversation SID: " + conversation.sid
                    + "\n++ friendlyName:    " + conversation.friendlyName
                    + "\n++ uniqueName:      " + conversation.uniqueName
                    + "\n++ state:           " + conversation.state
                    );
            if (conversation.uniqueName !== null) {
                console.log("+ Fetch using unique name: " + conversation.uniqueName);
                client.conversations.services(serviceSid).conversations(conversation.uniqueName)
                        .fetch()
                        .then(c => {
                            console.log(
                                    "++ Conversation SID: " + c.sid
                                    + "\n++ friendlyName:    " + c.friendlyName
                                    + "\n++ uniqueName:      " + c.uniqueName
                                    + "\n++ state:           " + c.state
                                    );
                        });
            }
        });
