// -----------------------------------------------------------------------------
console.log("+++ List bindings.");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;
// List by: date: .each({startDate: new Date(Date.UTC(2017, 4, 26))},
// List by: {tag: "all"}
console.log("+ List by: all.");
client.notify.services(notifyServiceSid)
        .bindings
        .each({tag: "all"},
                bindings => {
                    console.log("+ " + bindings.sid + " " + bindings.tags + " " + bindings.identity + " " + bindings.bindingType + " " + bindings.address);
                }
        );

// {tag: 'one'}
// startDate: new Date(Date.UTC(2017, 4, 26))
// 
// -----------------------------------------------------------------------------
