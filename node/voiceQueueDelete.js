// Docs: https://www.twilio.com/docs/voice/api/queue-resource
console.log('+++ Start.');
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
//
theQueueSid = 'QUb795b5eb3a0248f437fb4d965e3f7ade';
console.log("+ Delete a voice queue list, SID: " + theQueueSid);
client.queues(theQueueSid).fetch().then(
        queue => {
            theFriendlyName = queue.friendlyName;
            console.log("+ Queue Friendly Name: " + theFriendlyName);
            client.queues(theQueueSid).remove().then(queue => console.log('+ Removed: ' + theFriendlyName));
        })
        .catch(function (err) {
            if (err.toString().indexOf('not found') > 0) {
                console.error("- Error: Queue SID not found.");
            } else if (err) {
                console.error("- Error: " + err);
                exit();
            }
        });
