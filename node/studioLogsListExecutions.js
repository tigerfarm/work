console.log("++ List Studio flow execution information.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
var theFlow = 'FWccdfe27a5c84fab28d550190d9de0ee6';
console.log("+ Account SID: " + process.env.MAIN_ACCOUNT_SID + " theFlow: " + theFlow);
client.studio.v1.flows(theFlow)
        .executions
        .list({
            // Dates didn't work for me.
            // dateCreatedFrom: new Date(Date.UTC(2022, 1, 1, 0, 0, 0)),
            // dateCreatedTo: new Date(Date.UTC(2022, 6, 30, 0, 0, 0)),
            limit: 3
        })
        .then(executions => executions.forEach(e => {
                console.log(
                        // '++ SID: ' + e.sid
                        // + ' Status: ' + e.status
                        // + ' dateCreated: ' + e.dateCreated
                        // + ' contactChannelAddress: ' + e.contactChannelAddress
                        JSON.stringify(e)
                        );
            }));
