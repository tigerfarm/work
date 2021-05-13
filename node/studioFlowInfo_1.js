console.log("++ Send SMS message.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
console.log("+== Start");
client.studio.v1.flows('FW3a27faef056fe9d0959a94c0466a1a98')
        .executions('FN054df3765878847c7e340d8d6e1f1afb')
        .fetch()
        .then(execution => console.log(execution.status));

