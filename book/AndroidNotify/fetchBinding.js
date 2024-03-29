// -----------------------------------------------------------------------------
console.log("+++ Fetch a binding.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
// const notifyServiceSid = process.env.MASTER_NOTIFY_SERVICE_SID;
const notifyServiceSid = "IS6b86eea51935a036f0ae440652761e8a";      // Notify: p1Android
// const notifyServiceSid = "IS186702e405b74452a449d67b9265669f";   // Frontline
console.log("+ Notify SID:        " + notifyServiceSid);
const bindingSid = "BScd0c5960bb3534ee2f1e802e92066782";
console.log("+ Fetch Binding SID: " + bindingSid);
client.notify.services(notifyServiceSid)
        .bindings(bindingSid).fetch()
        .then(binding => console.log(
                        "++ Type:        " + binding.bindingType 
                    + "\n++ Identity:    "+ binding.identity
                    + "\n++ Addres:     <" + binding.address + ">"
                    ));
// 
// -----------------------------------------------------------------------------
