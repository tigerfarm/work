// -----------------------------------------------------------------------------
console.log("+++ List bindings.");
const accountSid = process.env.MASTER_ACCOUNT_SID;
const authToken = process.env.MASTER_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const notifyServiceSid = process.env.MASTER_NOTIFY_SERVICE_SID;
console.log("+ List, " + notifyServiceSid + ": SID bindingType:identity<address>)");
client.notify.services(notifyServiceSid).bindings
        .list({limit: 20})
        .then(bindings => bindings.forEach(
                    binding => console.log("+ " + binding.sid + " " + binding.bindingType + ":" + binding.identity + "<" + binding.address + ">")
            ));
// 
// -----------------------------------------------------------------------------
