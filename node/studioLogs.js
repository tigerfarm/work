console.log("++ List Studio logs for a specific flow.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
var theFlow = 'FWccdfe27a5c84fab28d550190d9de0ee6';
console.log("+ Account SID: " + process.env.ACCOUNT_SID + " theFlow: " + theFlow);
client.studio.v2.flows(theFlow)
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
