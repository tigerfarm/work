// -----------------------------------------------------------------------------
console.log("+++ List Services.");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.notify.services.each(services =>
    console.log("+ " + services.sid
            + " " + services.friendlyName
            )
);

// -----------------------------------------------------------------------------
