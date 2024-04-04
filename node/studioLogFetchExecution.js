console.log("++ Fetch Studio flow execution information.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
var theFlow = 'FWccdfe27a5c84fab28d550190d9de0ee6';
var theFlowExecution = 'FN0a117940e3a8444a3c8767bea9127abc';
// console.log("+ Account SID: " + process.env.MAIN_ACCOUNT_SID);
console.log("+ theFlow SID: " + process.env.MAIN_ACCOUNT_SID + " theFlowExecution: " + theFlowExecution);
client.studio.v2.flows(theFlow)
        .executions(theFlowExecution)
        .fetch()
        .then(e => {
            console.log(
                    "++ theFlowExecution SID: " + e.sid + "\n"
                    + '+ Status: ' + e.status + "\n"
                    + '+ dateCreated: ' + e.dateCreated + "\n"
                    );
        }
        );
