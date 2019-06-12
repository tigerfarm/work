console.log("++ Send SMS message.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
let theMessageSid = 'SMbb2b59ffc26d9ec0ff1da00ed5207f3b';
console.log("+ Account SID: " + process.env.ACCOUNT_SID + " Message SID: " + theMessageSid);
client.messages(theMessageSid)
      .fetch()
      .then(message => console.log('++ From: ' + message.from + ' To: ' + message.to + ' Text: ' + message.body));
      
