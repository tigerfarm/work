// -----------------------------------------------------------------------------
console.log("+++ Start.");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
client_1 = client.notify.services(process.env.NOTIFY_SERVICE_SID);
client_2 = client.notify.services("IS3a46cc3e6ca7a1b8bd7aea51c875d33a");

// theTag = ['one', 'other'];
theTag = "one";
// theTag = "all";
console.log("+ Send notifications tagged with: " + theTag);
client_1.notifications
        .create({tag: theTag, body: "Hello one - 2"})
        .then(notification =>
            console.log("+ Notification SID: " + notification.sid));

// -----------------------------------------------------------------------------
