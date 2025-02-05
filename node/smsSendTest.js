console.log("++ Send SMS message.");
let client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
client.messages.create(
        {body: 'm2a', from: process.env.MAIN_PN_7002, to: process.env.MAIN_PN_8003}
).then(
        message => console.log(message.sid)
);

