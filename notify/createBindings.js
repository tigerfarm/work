// -----------------------------------------------------------------------------
// $ node createBindings.js peter $PHONE_NUMBER1 one
// $ node createBindings.js paul $PHONE_NUMBER2 other
// $ node createBindings.js mary $PHONE_NUMBER3 other
// $ node createBindings.js david $PHONE_NUMBER4
// $ node listBindingsByTag.js

console.log("+++ Start.");

var theIdentity = process.argv[2] || "test";
var thePhoneNumber = process.argv[3] || "+16505552222";
var theTag = process.argv[4] || "";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

console.log("+ Create SMS binding for: " + theIdentity + ", Phone Number = " + thePhoneNumber + ", tag = " + theTag);

client.notify.services(process.env.NOTIFY_SERVICE_SID).bindings
        .create({
            bindingType: 'sms',
            identity: theIdentity,
            address: thePhoneNumber,
            tag: theTag
        })
        .then(binding => console.log("+ Created : " + binding.sid));

// -----------------------------------------------------------------------------
