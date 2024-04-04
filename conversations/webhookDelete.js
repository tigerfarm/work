console.log("++ Delete webhook configuration from a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
webhookSid = 'WH679c5309ec154804a581734784ea6301';
console.log("+ Conversation SID: " + conversationSid
        );
client.conversations.conversations(conversationSid)
        .webhooks(webhookSid)
        .fetch()
        .then(webhook => {
            console.log(
                    "+ Delete webhook data, SID: " + webhook.sid
                    + '\n+ configuration.filters: ' + webhook.configuration.filters
                    + '\n+ configuration.url:     ' + webhook.configuration.url
                    + '\n+ configuration.method:  ' + webhook.configuration.method
                    );
            client.conversations.conversations(conversationSid)
                    .webhooks(webhookSid).remove();
        });

