//
console.log("+++ Start echo.");
//
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
console.log("+ ACCOUNT_SID      :" + accountSid + ":");
console.log("+ AUTH_TOKEN       :" + authToken + ":");
//
const twilio = require('twilio');
const client = twilio(accountSid,authToken);
const notify = client.notify.services(process.env.NOTIFY_SERVICE_SID);
console.log("+ Helper library works.");
//
const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;
const syncServiceSid = process.env.SYNC_SERVICE_SID;
const syncMap = process.env.SYNC_MAP_NAME;
console.log("+ NOTIFY_SERVICE_SID :" + notifyServiceSid + ":");
console.log("+ SYNC_SERVICE_SID   :" + syncServiceSid + ":");
console.log("+ SYNC_MAP_NAME      :" + syncMap + ":");
//
console.log("+ PHONE_NUMBER_1     :" + process.env.PHONE_NUMBER_1 + ":");
console.log("+ PHONE_NUMBER_2     :" + process.env.PHONE_NUMBER_2 + ":");
console.log("+ PHONE_NUMBER_3     :" + process.env.PHONE_NUMBER_3 + ":");
console.log("+ PHONE_NUMBER_4     :" + process.env.PHONE_NUMBER_4 + ":");
console.log("+ PHONE_NUMBER_5     :" + process.env.PHONE_NUMBER_5 + ":");
console.log("+ PHONE_NUMBER_6     :" + process.env.PHONE_NUMBER_6 + ":");
//
console.log("+++ Exit.");
