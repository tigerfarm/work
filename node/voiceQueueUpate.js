// Docs: https://www.twilio.com/docs/voice/api/queue-resource
console.log('+++ Start.');
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
//
theQueueSid = 'QUa4f793e7fd93bf8cbf0502aa03103979';
console.log("+ Update a voice queue list, SID: " + theQueueSid);
client.queues(theQueueSid).fetch().then(
        queue => {
            theFriendlyName = queue.friendlyName;
            console.log("+ Queue Friendly Name: " + theFriendlyName);
            client.queues(theQueueSid).update(
                    {maxSize: 12}
            ).then(queue => console.log(
                        '+ Updated: ' + theFriendlyName
                        + ' maxSize = ' + queue.maxSize));
        })
        .catch(function (err) {
            if (err.toString().indexOf('not found') > 0) {
                console.error("- Error: Queue SID not found.");
            } else if (err) {
                console.error("- Error: " + err);
                exit();
            }
        });
