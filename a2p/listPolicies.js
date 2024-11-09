console.log("++ List policies.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
async function runFunction() {
    console.log("+ SID  friendlyName");
    counter = 0;
    const policies = await client.trusthub.v1.policies.list(
            // {limit: 20}
            );
    policies.forEach((p) => {
        console.log(counter++ + "+ Policy: " + p.sid + " " + p.friendlyName);
    });
}
runFunction().catch(function (err) {
    console.error("- Error: " + err.message + ", code: " + err.code);
    console.log("--- Exit.");
});