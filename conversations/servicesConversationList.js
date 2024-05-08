console.log("++ List a Service's Conversations.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
// var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN, {logLevel: 'debug'});
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55'; // Default
serviceSid = 'IS186702e405b74452a449d67b9265669f'; // Frontline
var acounter = 0;
client.conversations.services(serviceSid).conversations.list({limit: 200})
        .then(conversations => {
            conversations.forEach(c => {
                // + Conversation SID: CHcf287d6014d34cc68b89946c9baddd49 fn:c98 un:c98 state:active acounter = 89
                acounter++;
                console.log(
                        "+ Conversation SID: " + c.sid
                        + " fn:" + c.friendlyName
                        + " un:" + c.uniqueName
                        + " state:" + c.state
                        + " acounter = " + acounter
                        );
            });
            console.log("+ total count = " + acounter);
        });