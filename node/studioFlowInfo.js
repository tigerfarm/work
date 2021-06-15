console.log("++ Send SMS message.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
console.log("+== Start");
client.studio.v1.flows('FWe39d37c4df87e3e805ffdce705ce4c89')
        .executions('FN031c463011e5df5fa80a7902dace3f96')
        .fetch()
        .then(execution => {
            console.log(execution.sid);
            console.log(execution.status);
});

