console.log("++ List Services Conversations.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
client.conversations.services(serviceSid).conversations.list({limit: 20})
      .then(conversations => conversations.forEach(c => console.log(
      "+ Conversations SID: " + c.sid
      + " " + c.friendlyName
      )));