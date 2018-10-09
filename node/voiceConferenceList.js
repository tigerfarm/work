var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
client.conferences.each({
    status: 'in-progress'
},
        conferences => console.log("+ Create: " + conferences.dateCreated + " SID: "+ conferences.sid + " " + conferences.friendlyName)
);