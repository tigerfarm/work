console.log("++ Start.");
// Documentation: https://www.twilio.com/docs/lookup/v2-api/caller-name
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
async function theFunction() {
    const phoneNumber = await client.lookups.v2
            .phoneNumbers(process.env.MAIN_PN_UK)   // MAIN_PN_UK MY_PHONE_NUMBER
            // .phoneNumbers('+578005190710.')  // +
            .fetch();
            // .fetch({ fields: "caller_name" });   // "data package" Pay for information.
            // .fetch({ fields: "line_status" });   // "data package" Pay for information. This one is in beta, needs enabling
    console.log("+ "
            // + phoneNumber.countryCode
            // + " "
            + phoneNumber.phoneNumber
            + '\n+ JSON: ' + JSON.stringify(phoneNumber)
            );
}

theFunction();
// eof