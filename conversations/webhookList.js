console.log("++ List webhook filters for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
console.log("+ Conversation SID: " + conversationSid
        );
client.conversations.conversations(conversationSid)
        .webhooks
        .list({limit: 20})
        .then(webhooks => webhooks.forEach(webhook => console.log(
                        "+ webhook SID: " + webhook.sid
                        + ' configuration.filters: ' + webhook.configuration.filters
                        )
            ));

