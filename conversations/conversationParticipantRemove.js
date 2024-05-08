console.log("++ Remove a Participants from a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CHf53a3e86bb574d8b9fafeeb032619fb0";
console.log("+ Conversation SID: " + conversationSid);

client.conversations.conversations(conversationSid)
        .participants('MB71115fa234804782acb6c4e9d06bd33f')
        .remove().then(message => console.log(
                    "+ Removed."
                    ))
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });
