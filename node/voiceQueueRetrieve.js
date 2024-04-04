// Docs: https://www.twilio.com/docs/voice/api/queue-resource
console.log('+++ Start.');
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
//
theQueueSid = 'QUa4f793e7fd93bf8cbf0502aa03103979';
console.log("+ Retrive a voice queue list, SID: " + theQueueSid);
//
// Doesn't work for retrieving based on the friendlyName.
client.queues.list(
        {friendlyName: "support"},
        {limit: 20}
        ).then(queues => queues.forEach(
            q => console.log('+ '
            + ' SID:' + q.sid
            + ' currentSize:' + q.currentSize + "   "
            + ' maxSize:' + q.maxSize
            + ' friendlyName:' + q.friendlyName
            + ' averageWaitTime:' + q.averageWaitTime
            )
    ));