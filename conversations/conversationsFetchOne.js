console.log("++ List Conversations.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
// conversationSid = "IS5c86b7d0d6e44133acb09734274f94f6";

console.log("+ Fetch using conversation sid, retrieves: <sid> <uniqueName> <friendlyName>");
client.conversations.conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Conversations SID: " + conversation.sid
                    + " " + conversation.uniqueName
                    + " " + conversation.friendlyName
                    );
            console.log("+ Fetch using unique name.");
            client.conversations.conversations(conversation.uniqueName)
                    .fetch()
                    .then(conversation => {
                        console.log(
                                "+ Conversations SID: " + conversation.sid
                                + " " + conversation.uniqueName
                                + " " + conversation.friendlyName
                                );
                    });
        });
