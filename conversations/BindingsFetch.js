// -----------------------------------------------------------------------------
console.log("+++ List bindings.");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;
const notifyServiceSid = process.env.CONVERSATIONS_SERVICE_SID;
// List by: date: .each({startDate: new Date(Date.UTC(2017, 4, 26))},
// List for "all" tags, for a specific tag, or a list of tags.
console.log("+ Notify ServiceSid = " + notifyServiceSid);
// const bindingSid = "BS11106535b4343375a8657d4f6471009f";
const bindingSid = "BS6b39de20803a34e5c2007e5e6b95d402";
console.log("+ bindingSid = " + bindingSid);
theTag = "all";
// theTag = "one";
// theTag = "other";
// theTag = ['one', 'other'];
console.log("+ List where tags = " + theTag + ", (SID :Tags: identity bindingType address)");
// {tag: 'one'}
// startDate: new Date(Date.UTC(2017, 4, 26))
client.notify.services(notifyServiceSid)
        .bindings(bindingSid)
        .fetch()
        .then(bindings => {
                    console.log("+ " + bindings.sid + " :" + bindings.tags + ": " + bindings.identity + " " + bindings.bindingType + " " + bindings.address);
                }
        );

// 
// -----------------------------------------------------------------------------
