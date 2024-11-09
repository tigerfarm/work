console.log("++ Fetch and list data for an EndUser.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
async function runFunction() {

    const endUser = await client.trusthub.v1
            .endUsers("IT82ce2d033753e5e6bc38930f0b18447d")
            .fetch();
    console.log(
            "+ SID: " + endUser.sid 
            + " friendlyName: " + endUser.friendlyName
            + " type: " + endUser.type
            );
    console.log(
            "+ attributes: " + JSON.stringify(endUser.attributes) 
            );
}
runFunction().catch(function (err) {
    console.error("- Error: " + err.message + ", code: " + err.code);
    console.log("--- Exit.");
});

