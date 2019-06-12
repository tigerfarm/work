console.log("++ List SMS logs.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
console.log("+ Account SID: " + process.env.ACCOUNT_SID);
client.messages.list({
    dateSentBefore: new Date(Date.UTC(2019, 2, 1, 0, 0, 0)),
    dateSentAfter: new Date(Date.UTC(2019, 0, 1, 0, 0, 0)),
    limit: 20
}).then(messages =>
    messages.forEach(
            m => console.log(m.sid)
    ));
