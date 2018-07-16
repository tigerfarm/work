// -----------------------------------------------------------------------------
console.log("+++ Start echo.");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;
console.log("+ ACCOUNT_SID      :" + accountSid + ":");
console.log("+ AUTH_TOKEN       :" + authToken + ":");
console.log("+ NOTIFY_SERVICE_SID :" + notifyServiceSid + ":");
const twilio = require('twilio');
const client = twilio(accountSid,authToken);
const notify = client.notify.services(notifyServiceSid);
bindings = client.notify.services(notifyServiceSid).bindings.list({tag: "test"});
console.log("+ Helper library works.");
// -----------------------------------------------------------------------------
console.log("+++ Exit.");
