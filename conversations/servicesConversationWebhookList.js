console.log("++ List a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
// var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN, {logLevel: 'debug'});
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS186702e405b74452a449d67b9265669f'; // Frontline

/*
 client.conversations.services('ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
 .conversations('CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
 .webhooks('WHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
 .fetch()
 .then(webhook => console.log(webhook.sid));
 
 client.conversations.conversations('CH0d499dee76f04d5b97ee6bf27e72a3cd')
 .webhooks
 .list({limit: 20})
 .then(webhooks => webhooks.forEach(w => console.log(w.sid)));
 
 client.conversations.configuration
 .webhooks()
 .fetch()
 .then(webhook => console.log(
 "+ Conversation webhook.method: " + webhook.method
 + "+ Conversation webhook.filters: " + webhook.filters
 ));
 */
// client.conversations.services(serviceSid).conversations
client.conversations.configuration
        .webhooks()
        .list({limit: 20})
        .then(webhooks => webhooks.forEach(w => console.log(w.sid)));

client.conversations.services(serviceSid)
      .conversations()
      .webhooks
      .list({limit: 20})
      .then(webhooks => webhooks.forEach(w => console.log(w.sid)));


