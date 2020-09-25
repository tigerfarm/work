// -----------------------------------------------------------------------------
console.log("+++ Fetch a binding.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
const notifyServiceSid = process.env.MASTER_NOTIFY_SERVICE_SID;
console.log("+ List, " + notifyServiceSid + ": SID, identity bindingType address)");
client.notify.services(notifyServiceSid)
        .bindings('BS117d136bdf6f6ce8e7cc22b72c763274').fetch()
        .then(binding => console.log("+ " + binding.sid + " " + binding.bindingType + ":" + binding.identity + "<" + binding.address + ">"));
// 
// -----------------------------------------------------------------------------
