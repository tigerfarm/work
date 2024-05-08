console.log("++ Create credentials.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
client.conversations.v1.credentials
        .create({
            friendlyName: 'test1',
            type: 'fcm',
            secret: 'abc'
        })
        .then(c => console.log("+ Credential created, SID: " + c.sid));