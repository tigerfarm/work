// -----------------------------------------------------------------------------
console.log("+++ Send to a list.");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;
counter = 0;
let sendList = [];
sendList[counter] = JSON.stringify({"binding_type": "sms", "address": "+16508668225"});
counter += 1;
sendList[counter] = JSON.stringify({"binding_type": "sms", "address": "+16508668188"});
counter += 1;
sendList[counter] = JSON.stringify({"binding_type": "sms", "address": "+16508668232"});
counter += 1;
sendList[counter] = JSON.stringify({"binding_type": "sms", "address": "+16508661233"});
counter += 1;
console.log("+ counter = " + counter + ", sendList: " + sendList);
client.notify.services(notifyServiceSid).notifications.create({
    body: 'Hello there from Sync-Functions-Notify.',
    toBinding: sendList
}).then(notification => console.log(notification.sid))
        .catch(error => console.log(error));
