console.log("++ List Services.");
// https://www.twilio.com/docs/conversations/api/service-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
// var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

client.conversations.services.list({limit: 20})
        .then(services => services.forEach(s =>
                console.log(
                        "+ Service SID: " + s.sid
                        + " " + s.friendlyName
                        )));
      
