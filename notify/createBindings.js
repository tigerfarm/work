// -----------------------------------------------------------------------------
console.log("+++ Create a Binding.");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// $ node createBindings.js peter $PHONE_NUMBER1 one
// $ node createBindings.js paul $PHONE_NUMBER2 other
// $ node createBindings.js mary $PHONE_NUMBER3 other
// $ node createBindings.js david $PHONE_NUMBER4
// $ node listBindingsByTag.js
var theIdentity = process.argv[2] || "test1";
var thePhoneNumber = process.argv[3] || "+16505551111";
var theTag = process.argv[4] || "";

console.log("+ Create SMS binding for: " + theIdentity + ", Phone Number = " + thePhoneNumber + ", tag = " + theTag);
console.log("+ NOTIFY_SERVICE_SID: " + process.env.NOTIFY_SERVICE_SID);
client.notify.services(process.env.NOTIFY_SERVICE_SID).bindings
        .create({
            bindingType: 'sms',
            identity: theIdentity,
            address: thePhoneNumber,
            tag: theTag
        })
        .then(
        binding => console.log("+ Created : " + binding.sid)
        ).catch(function (err) {
            if (err) {
                console.error("- Error: ", err.message);
                exit();
        }});

// -----------------------------------------------------------------------------
