// twilio api:core:messages:fetch --sid SM2feb3243087344fcae1652e603fa5462

console.log("++ Fetch SMS message log information.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
let theMessageSid = 'SM2feb3243087344fcae1652e603fa5462';
console.log("+ Account SID: " + process.env.ACCOUNT_SID + " Message SID: " + theMessageSid);
client.messages(theMessageSid)
      .fetch()
      .then(message => console.log('++ Status: ' + message.status + ', ' + message.from + ' To: ' + message.to + ' Text: ' + message.body));
      
