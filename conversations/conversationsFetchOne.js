console.log("++ List Conversations.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

conversationSid = "CH8aeaf8fdb8e54440a1a281bb9cf0d360";
// conversationSid = "IS5c86b7d0d6e44133acb09734274f94f6";

console.log("+ Fetch using conversation sid, retrieves: <sid> <uniqueName> <friendlyName>");
client.conversations.v1.conversations(conversationSid)
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
