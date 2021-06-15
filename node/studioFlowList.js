console.log("++ List Studio executions.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
console.log("+++ Start");
client.studio.v1.flows('FW97fb3aabed8cc508bc8c08af2ce50916')
        .executions
        .list({
            // I couldn't get dateCreatedFrom to work.
            // dateCreatedFrom: new Date(Date.UTC(2021, 6, 1, 0, 0, 0)),
            // dateCreatedTo: new Date(Date.UTC(2021, 6, 12, 0, 0, 0)),
            limit: 20
        })
        .then(executions => executions.forEach(execution => {
                if (execution.status === "active") {
                    console.log("+ " + execution.sid + " " + execution.status + " " + execution.dateCreated);
                }
            }))
        .catch(function (err) {
            console.error("- " + " " + err);
        });
