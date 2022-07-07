console.log("++ List Stuio logs for a specific flow.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
var theFlow = 'FW3dd41a97e6326810a2bb64fca9a47d22';
console.log("+ Account SID: " + process.env.ACCOUNT_SID + " theFlow: " + theFlow);
client.studio.v1.flows(theFlow)
        .executions
        .list({
            // Dates didn't work for me.
            // dateCreatedFrom: new Date(Date.UTC(2022, 1, 1, 0, 0, 0)),
            // dateCreatedTo: new Date(Date.UTC(2022, 6, 30, 0, 0, 0)),
            limit: 20
        })
        .then(executions => executions.forEach(e => {
                console.log(
                        '++ SID: ' + e.sid
                        + ' Status: ' + e.status
                        + ' dateCreated: ' + e.dateCreated
                        );
            }));
