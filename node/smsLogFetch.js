// twilio api:core:messages:fetch --sid SM2feb3243087344fcae1652e603fa5462
console.log("++ Fetch SMS message log information.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

let theMessageSid = 'SMf245bfde04c75ebf70af9fa1d0314dd8';       // SMS or WhatsApp message SID
console.log("+ Account SID: " + process.env.ACCOUNT_SID + " Message SID: " + theMessageSid);
client.messages(theMessageSid)
        .fetch()
        .then(message => console.log(
                    '++ Status: ' + message.status + ', ' + message.from + ' To: ' + message.to + ' Text: ' + message.body
                    + '\nMessage SID: ' + message.sid
                    + '\nMessage SID: ' + JSON.stringify(message.sid)
                    + '\nThe received JSON data:'
                    + '\n' + JSON.stringify(message)
                    ));
// eof