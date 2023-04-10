console.log("++ List Services Conversations.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
client.conversations.services(serviceSid).fetch()
        .then(s => 
                console.log(
                        "+ Service SID: " + s.sid
                        + " " + s.friendlyName
                        ));