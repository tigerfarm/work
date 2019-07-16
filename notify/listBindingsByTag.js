// -----------------------------------------------------------------------------
console.log("+++ Start.");

theTag = "all";
var theTag = process.argv[2] || "all";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;
console.log("+ List where tags = " + theTag + ", (SID :Tags: identity bindingType address)");
client.notify.services(notifyServiceSid)
        .bindings
        .each({tag: theTag},
                bindings => {
                    console.log("+ " + bindings.sid + " :" + bindings.tags + ": " + bindings.identity + " " + bindings.bindingType + " " + bindings.address);
                }
        );

// -----------------------------------------------------------------------------
