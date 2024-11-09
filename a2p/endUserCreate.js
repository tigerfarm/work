console.log("++ Create EndUser of type: authorized_representative_1.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
async function runFunction() {
    const endUser = await client.trusthub.v1.endUsers.create({
        attributes: {
            // first_name: "rep1",
            // last_name: "acme",
            job_position: "CEO",
            phone_number: "+11234567890",
            email: "rep1@acme.com",
            business_title: "ceo",
        },
        friendlyName: "auth_rep_1",
        type: "authorized_representative_1",
    });
    console.log("+ SID: " + endUser.sid);
}
runFunction().catch(function (err) {
    console.error("- Error: " + err.message + ", code: " + err.code);
    console.log("--- Exit.");
});

