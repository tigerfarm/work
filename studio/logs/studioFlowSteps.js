console.log("++ Read Studio execution steps.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
console.log("+ Start");
client.studio.v1.flows('FWa0a3e78899bc5d6ce69aa090bec43d14')
        .executions('FNa3c89a204c9ef273cecb76362b49604c')
        .steps
        .list({limit: 20})
        .then(steps => steps.forEach(s => {
            console.log("++ " + s.sid 
            + " " + s.name
            + " >" + s.transitionedTo
            );
    }));