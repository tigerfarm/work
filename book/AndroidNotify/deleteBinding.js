// -----------------------------------------------------------------------------
console.log("+++ Delete a binding.");
const client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
// const notifyServiceSid = process.env.MASTER_NOTIFY_SERVICE_SID;
const notifyServiceSid = "IS6b86eea51935a036f0ae440652761e8a";      // Notify: p1Android
// const notifyServiceSid = "IS186702e405b74452a449d67b9265669f";   // Frontline
console.log("+ Notify SID:        " + notifyServiceSid);
const bindingSid = "BS17fd5e6df3e1937c4b80018e5ae84d12";
console.log("+ Delete Binding SID: " + bindingSid);
client.notify.services(notifyServiceSid).bindings(bindingSid).remove();
// 
// -----------------------------------------------------------------------------
