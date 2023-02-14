console.log("++ Fetch a conversation's data.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55'; // Default
serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6'; // Web application: tfpconversations
//
// conversationSid = process.env.CONVERSATION_SID;
// conversationSid = process.env.CONVERSATIONS_ECHO_SID;
// conversationSid = 'CHf9c45437d4bd4de2bc8ee2821db1c94b';
conversationSid = 'CHe02e49468eb64f8aaa92a845f10ece78'; // Web application: tfpconversations, conversation: abc
//
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
        });
console.log("++ Fetch a conversation's data.");
