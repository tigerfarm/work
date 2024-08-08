console.log("+++ List Verifiy templates.");
// Getting Started with Verification Templates:
// https://www.twilio.com/docs/verify/verification-templates
//
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        );
async function listVerificationTemplates() {
    const templates = await client.verify.v2.templates.list({limit: 200});
    templates.forEach((t) => {
        // console.log("++ translations: " + t.translations);
        // console.log(JSON.stringify(t));
        console.log("++ SID: " + t.sid
                + " accountSid: " + t.accountSid
                + " friendlyName: " + t.friendlyName
                + ", channels: " + t.channels
                );
        console.log("+++ translations.en.locale: " + t.translations.en.locale
                + ", Is default: " + t.translations.en.is_default_translation
                + ", Text: " + t.translations.en.text
                );
    });
}
listVerificationTemplates();
