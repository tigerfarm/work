console.log("++ List and remove conversations.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

console.log("+ Conversations SID/friendlyName/uniqueName/createdBy");
client.conversations.conversations.list({limit: 20})
        .then(conversations => conversations.forEach(c => {
                console.log(
                        "++ Remove: " + c.sid
                        + "/" + c.friendlyName
                        + "/" + c.uniqueName
                        + "/" + c.createdBy
                        + "/" + c.state
                        );
                client.conversations.conversations(c.sid).remove();
            })
        );
      