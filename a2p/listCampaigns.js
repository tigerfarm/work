console.log("++ List campaign's resource SID.");
// https://www.twilio.com/docs/messaging/api/usapptoperson-resource#code-list-all-usapptoperson-resources-associated-with-a-messaging-service
//
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
async function runFunction() {
    console.log("+ Usa2p resource SID:");
    const usAppToPeople = await client.messaging.v1
            .services("MG8602f0e431cba458ff299d5e2722b785")
            .usAppToPerson.list({limit: 20});

    usAppToPeople.forEach((usAppToPerson) => 
    console.log("++ " + usAppToPerson.sid
            + "\n description:          " + usAppToPerson.description
            + "\n usAppToPersonUsecase: " + usAppToPerson.usAppToPersonUsecase
            + "\n campaignStatus:       " + usAppToPerson.campaignStatus
            + "\n campaignId:           " + usAppToPerson.campaignId
            ));
}
runFunction().catch(function (err) {
    console.error("- Error: " + err.message + ", code: " + err.code);
    console.log("--- Exit.");
});