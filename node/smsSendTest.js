console.log("++ Send SMS message.");
let client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
client.messages
        .create({body: 'Hi there', from: process.env.MASTER_PHONE_NUMBER_1, to: process.env.MY_PHONE_NUMBER})
        .then(
                message => console.log(message.sid)
        );

