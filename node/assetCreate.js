console.log("++ Send SMS message.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
theFriendlyName = "asset1a";
const serviceSid = 'ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
console.log("+ serviceSid: " + serviceSid
        + ", theFriendlyName: " + theFriendlyName
        );
client.erverless.v1.services(serviceSid)
        .assets
        .create({
            friendlyName: theFriendlyName
        }, function (err) {
            if (err) {
                console.error("- Error: " + err.message + ", code: " + err.code);
                console.log("--- Exit.");
            }
        }).then((asset) => console.log("+ Asset created: " + asset.sid));

