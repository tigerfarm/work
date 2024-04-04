// -----------------------------------------------------------------------------
console.log("+++ List bindings for a Notify service.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
// const notifyServiceSid = process.env.MASTER_NOTIFY_SERVICE_SID;
const notifyServiceSid = "IS6b86eea51935a036f0ae440652761e8a";       // Notify: Android Notify app
// const notifyServiceSid = "IS186702e405b74452a449d67b9265669f";       // Frontline
// const notifyServiceSid = "IS0e9b3863450252891f81f312a6e3a7d7";      // Notify: tignotifyweb
//
console.log("+ Notify service SID: " + notifyServiceSid);
console.log("+ The listing:");
console.log("++ Binding-SID bindingType(fcm,apn):identity<address>)");
client.notify.services(notifyServiceSid).bindings
        .list({limit: 20})
        .then(bindings => bindings.forEach(
                    binding => console.log("++ " + binding.sid + " " + binding.bindingType + ":" + binding.identity + "<" + binding.address + ">")
            ));
// Example:
// ++ BS117d136bdf6f6ce8e7cc22b72c763274 fcm:davea<fa...7V>
// 
// -----------------------------------------------------------------------------
