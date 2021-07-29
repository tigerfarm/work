console.log("++ List Services Conversations.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

client.conversations.services('IS4ebcc2d46cda47958628e59af9e53e55').fetch()
        .then(s => 
                console.log(
                        "+ Service SID: " + s.sid
                        + " " + s.friendlyName
                        ));