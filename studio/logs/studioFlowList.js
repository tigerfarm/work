console.log("++ List Studio executions.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
console.log("+++ Start");
// https://studio.twilio.com/v2/Flows/FWa0a3e78899bc5d6ce69aa090bec43d14/Executions
client.studio.v1.flows('FWa0a3e78899bc5d6ce69aa090bec43d14')
        .executions
        .list({
            // dateCreatedFrom: new Date('2022-04-12'),  // yyyy-MM-dd'T'HH:mm:ss'Z'
            // dateCreatedTo: new Date('2022-04-18'),
            // Documentation format didn't work for me: dateCreatedFrom: new Date('2022, 4, 18, 0, 0, 0'),
            limit: 20
        })
        .then(executions => executions.forEach(execution => {
                // Wed Apr 20 2022 17:25:48 GMT-0700 (Pacific Daylight Time)
                var logMsg = "+ " + execution.sid + " " + execution.dateCreated + " " + execution.status;
                if (execution.status === "active") {
                    logMsg = logMsg + " ***"
                }
                console.log(logMsg);
            }))
        .catch(function (err) {
            console.error("- " + " " + err);
        });
