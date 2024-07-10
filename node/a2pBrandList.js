console.log("++ List account brands.");
// https://www.twilio.com/docs/messaging/api/brand-registration-resource#list-an-accounts-brandregistration-resources
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Brands for SID: " + process.env.MAIN_ACCOUNT_SID
        );
(async () => {
    try {
        const brandRegistrations = await client.messaging.v1.brandRegistrations.list({
            limit: 20,
        });
        brandRegistrations.forEach((b) => {
            console.log("++ Brand SID: " + b.sid
                    + " brandType:" + b.brandType
                    + " status:" + b.status
                    );
            console.log("++ All: " + JSON.stringify(b));
        });
    } catch (e) {
        return e;
    }
})().then(
        res => {
            if (typeof res !== "undefined") {
                console.log("Result: " + res)
            }
        });
