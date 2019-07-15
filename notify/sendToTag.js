// -----------------------------------------------------------------------------
console.log("+++ Start.");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

theTag = "one";
// theTag = "all";
console.log("+ Send notifications tagged with: " + theTag);
client.notify.services(process.env.NOTIFY_SERVICE_SID).notifications
//        .create({tag: ['one'], body: `"Hello one - 1"`})
        .create({tag: 'all', body: "Hello one - 1"})
        .then(notification =>
            console.log("+ Notification SID: " + notification.sid));

// -----------------------------------------------------------------------------
