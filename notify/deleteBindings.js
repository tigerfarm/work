// -----------------------------------------------------------------------------
console.log("+++ Start.");

var theTag = process.argv[2] || "all";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;
// theFilter = {startDate: new Date(Date.UTC(2017, 4, 26))};
theFilter = {tag: theTag};
console.log("+ Delete where tag = " + theTag + ", (SID :Tags: identity bindingType address)");
client.notify.services(notifyServiceSid).bindings.each(
        theFilter,
        bindings => {
            console.log("+ Delete: " + bindings.sid + " " + bindings.identity + " " + bindings.bindingType + " " + bindings.address);
            client.notify.services(notifyServiceSid).bindings(bindings.sid).remove();
        }
);

// -----------------------------------------------------------------------------
