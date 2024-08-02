console.log("++ List SMS logs.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Account SID: " + process.env.MAIN_ACCOUNT_SID);
console.log("+ Account SID                      direction status From   To");
client.messages.list({
    // dateSentAfter: new Date(Date.UTC(2024, 0, 1, 0, 0, 0)),
    // dateSentAfter: "2024-05-23T21:17:00.000Z",
    dateSent: "2024-05-23T21:50:55.000Z",
    // to: process.env.MAIN_PN_7002,
    // from: process.env.MAIN_PN_7002,
    limit: 20
}).then(messages =>
    messages.forEach(
            m => console.log(m.sid, m.direction, m.status, m.from, m.to, m.dateSent)
    ));
