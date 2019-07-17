// -----------------------------------------------------------------------------
console.log("+++ Start.");

// theTag = ['one', 'other'];
// theTag = "one";
// theTag = "all";
var theTag = process.argv[2] || "all";

var testNumber = process.argv[3] || "0";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

console.log("+ Send notifications tagged with: " + theTag);
client.notify.services(process.env.NOTIFY_SERVICE_SID).notifications
//        .create({tag: ['one'], body: `"Hello one - 1"`})
//        .create({tag: 'all', body: "Hello one - 1"})
        .create({tag: theTag, body: "Hello one - " + testNumber})
        .then(notification =>
            console.log("+ Notification SID: " + notification.sid));

// -----------------------------------------------------------------------------
