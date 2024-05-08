console.log("++ Start.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
client.lookups.v2.phoneNumbers(process.env.MAIN_PHONE_NUMBER_1)
        .fetch()
        .then(phone_number => console.log("+ "
                    + phone_number.countryCode
                    + " "
                    + phone_number.phoneNumber
                    )
        );
// eof