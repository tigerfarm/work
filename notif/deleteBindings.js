// -----------------------------------------------------------------------------
console.log("+++ Delete list of bindings.");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;
client.notify.services(notifyServiceSid).bindings
        .each({ startDate: new Date(Date.UTC(2017, 4, 26)) },
                bindings => {
                    console.log("+ Delete: " + bindings.sid + " " + bindings.identity + " " + bindings.bindingType + " " + bindings.address);
                    client.notify.services(notifyServiceSid).bindings(bindings.sid).remove();
                }
        );

// -----------------------------------------------------------------------------
