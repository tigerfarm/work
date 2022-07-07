console.log("++ Fetch Studio log information.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
var theFlow = 'FW3dd41a97e6326810a2bb64fca9a47d22';
console.log("+ Account SID: " + process.env.ACCOUNT_SID + " theFlow: " + theFlow);
client.studio.v1.flows('FW3dd41a97e6326810a2bb64fca9a47d22')
        .executions('FN1549dcbf62f5bfff136bc86911477b5a')
        .fetch()
        .then(e => {
            console.log(
                    "++ SID: " + e.sid + "\n"
                    + '+ Status: ' + e.status + "\n"
                    + '+ dateCreated: ' + e.dateCreated + "\n"
                    );
        }
        );
