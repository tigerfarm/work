// -----------------------------------------------------------------------------
console.log("+++ Start echo.");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_AUTH_TOKEN;
console.log("+ accountSid       :" + accountSid + ":");
console.log("+ authToken        :" + authToken + ":");

const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;
console.log("+ notifyServiceSid :" + notifyServiceSid + ":");

const yourPhoneNumber = process.env.YOUR_PHONE_NUMBER;
const phoneNumber1 = process.env.PHONE_NUMBER_1;
const phoneNumber2 = process.env.PHONE_NUMBER_2;
const phoneNumber3 = process.env.PHONE_NUMBER_3;
console.log("+ yourPhoneNumber  :" + yourPhoneNumber + ":");
console.log("+ phoneNumber1     :" + phoneNumber1 + ":");
console.log("+ phoneNumber2     :" + phoneNumber2 + ":");
console.log("+ phoneNumber3     :" + phoneNumber3 + ":");

const twilio = require('twilio');
const client = twilio(accountSid,authToken);
const notify = client.notify.services(notifyServiceSid);
bindings = client.notify.services(notifyServiceSid).bindings.list({tag: "test"});
console.log("+ Helper library works.");

// -----------------------------------------------------------------------------
console.log("+++ Exit.");
