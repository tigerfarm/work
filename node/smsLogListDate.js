console.log("++ List SMS logs.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Account SID: " + process.env.MAIN_ACCOUNT_SID);
dateSentBefore = new Date(Date.UTC(2023, 10, 5, 0, 0, 0));
dateSentAfter = new Date(Date.UTC(2023, 7, 1, 0, 0, 0));
theCounter = 1;
client.messages.list({
    dateSentBefore: dateSentBefore,
    dateSentAfter: dateSentAfter,
    // status: "received",  // "status" is ignored.
    limit: 300
}).then(messages => {
    messages.forEach(m => {
        console.log(theCounter++, m.sid, m.direction, m.status, m.to)
    });
});
