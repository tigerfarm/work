// Docs: https://www.twilio.com/docs/voice/api/queue-resource
console.log('+++ Start.');
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
//
console.log("++ Get voice queue list.");
client.queues.list({
    limit: 20
}).then(queues => queues.forEach(q => {
        var si = q.dateCreated.toString().indexOf(' ') + 1;
        console.log('+ '
                + ' DateCreated:' + q.dateCreated.toString().substring(si, si + 12)
                + ' SID:' + q.sid
                + ' currentSize:' + q.currentSize + "   "
                + ' maxSize:' + q.maxSize
                + ' friendlyName:' + q.friendlyName
                + ' averageWaitTime:' + q.averageWaitTime
                );
    }));

