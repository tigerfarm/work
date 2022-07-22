console.log("++ Fetch a conversation using either the SID or unique name.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationId = "studio1u";
// conversationId = "CHeae275b5ee0145ea9ffadd40ac0ec377";
console.log("+ Fetch a conversation using: " + conversationId);
client.conversations.conversations(conversationId)
        .fetch()
        .then(conversation => {
            console.log(
                    "+ Conversations SID: " + conversation.sid
                    + "\n++ uniqueName:   " + conversation.uniqueName
                    + "\n++ friendlyName: " + conversation.friendlyName
                    );
        })
        .catch(function (err) {
            console.error("- Error code: " + err.code + ", "+ err);
            exit();
        });
