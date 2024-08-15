console.log("+++ TOTP: create New Factor.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
verifyServiceSID = "VA112d25d22d3305f3eae4d3b9e2f2a8d5";
//
// Do not use Personally Identifiable Information for identity.
// Use an immutable user identifier like a UUID, GUID, or SID.
// Min 8 characters
// theIdentitySID = "ff483d1ff591898a9942916050d2ca3f";
theIdentitySID = "ffiddv1a";
friendlyName = "Dave account 1a";
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        + "\n+ verifyServiceSID: " + verifyServiceSID
        + "\n+ theIdentitySID: " + theIdentitySID
        + "\n+ friendlyName: " + friendlyName
        );
async function createNewFactor() {
    const newFactor = await client.verify.v2
            .services(verifyServiceSID)
            .entities(theIdentitySID)
            .newFactors.create({
                factorType: "totp",
                friendlyName: friendlyName,
            }).catch(function (err) {
        console.error("-- Error: " + err.message + ", code: " + err.code);
    });
    if (newFactor === undefined) {
        return;
    }
    console.log("++ newFactor.sid (factor SID): " + newFactor.sid);
    console.log("++ newFactor JSON: " + JSON.stringify(newFactor));
}
createNewFactor();
