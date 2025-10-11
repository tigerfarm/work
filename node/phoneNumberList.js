console.log("++ Start.");
// const client = require('twilio')(process.env.ACCOUNT_SID_TFP, process.env.AUTH_TOKEN_TFP);
const client = require('twilio')(process.env.API_KEY_TFP, process.env.API_KEY_SECRET_TFP, {accountSid: process.env.ACCOUNT_SID_TFP});

console.log('+ Phone Number list.');
var count = 0;
var phoneNumberList = '';
client.incomingPhoneNumbers.list({
    limit: 20
}).then(i => {i.forEach(
            i => {
                if (count > 0) {
                    phoneNumberList = phoneNumberList + ':';
                }
                count++;
                phoneNumberList = phoneNumberList + i.phoneNumber;
                console.log('++ ' + i.phoneNumber);
            });
            console.log('++ phoneNumberList: ' + phoneNumberList);
            });

// eof