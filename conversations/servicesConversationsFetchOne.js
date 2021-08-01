console.log("++ List Conversations.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
console.log("+ Fetch using conversatoin sid, retrieves: <sid> <uniqueName> <friendlyName>");
client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Conversations SID: " + conversation.sid
                    + " " + conversation.uniqueName
                    + " " + conversation.friendlyName
                    );
            console.log("+ Fetch using unique name.");
            client.conversations.services(serviceSid).conversations(conversation.uniqueName)
                    .fetch()
                    .then(conversation => {
                        console.log(
                                "+ Conversations SID: " + conversation.sid
                                + " " + conversation.uniqueName
                                + " " + conversation.friendlyName
                                );
                    });
        });
