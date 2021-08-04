console.log("++ List Conversations.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

console.log("+ Conversations SID/friendlyName/uniqueName/createdBy");
client.conversations.conversations.list({limit: 20})
      .then(conversations => conversations.forEach(c => console.log(
      "++ " + c.sid
      + "/" + c.friendlyName
      + "/" + c.uniqueName
      + "/" + c.createdBy
      )));
      