console.log("+++ Create verification using template attribute.");
// Use of the locale attribute, requires the Verify service set to Default:
//  Twilio Console: Develop tab/Verify/Services, select a service, Settings/General:
//      Message template configuration/Default Templates (For SMS/WhatsApp/Voice only)
//
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
theTo = process.env.MY_PHONE_NUMBER;
//
// List of supported languages:
// https://www.twilio.com/docs/verify/supported-languages#verify-default-template
templateSID = 'HJ3694769091271a301c5873c6849932b3';
//
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", verifyServiceSID: " + verifyServiceSID
        + ", to: " + theTo
        + ", templateSID: " + templateSID
        );
async function createVerification() {
    const verification = await client.verify.v2
            .services(verifyServiceSID)
            .verifications.create({
                templateSid: templateSID,
                channel: "sms",    // Channels: sms whatsapp
                to: theTo
            }).catch(function (err) {
        console.error("-- Error: " + err.message + ", code: " + err.code);
        console.log("--- Exit.");
    });
    if (verification === undefined) {
        return;
    }
    console.log("++ verification.sid: " + verification.sid);
}
createVerification();
