console.log("++ Send SMS message.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
console.log("+== Start");
client.studio.v1.flows('FWa0a3e78899bc5d6ce69aa090bec43d14')
        .executions('FNa3c89a204c9ef273cecb76362b49604c')
        .fetch()
        .then(execution => {
            console.log(execution.sid);
            console.log(execution.status);
});

