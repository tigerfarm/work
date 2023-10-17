console.log("++ List Conversations.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

console.log("+ Conversations SID/friendlyName/uniqueName/createdBy");
// or, without ".v1"
// client.conversations.conversations.list({limit: 20})
client.conversations.v1.conversations.list({limit: 20})
        .then(conversations => conversations.forEach(c => console.log(
                        "++ " + c.sid
                        + "/" + c.friendlyName
                        + "/" + c.uniqueName
                        + "/" + c.createdBy
                        + "/" + c.state
                        )
            )
        );
      