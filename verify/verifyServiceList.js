console.log("+++ List Verify services.");
//
// https://www.twilio.com/docs/verify/api/service#list-all-services-1
//
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Twilio account SID: " + process.env.MAIN_ACCOUNT_SID
        );
async function listServices() {
    const services = await client.verify.v2
            .services
            .list({limit: 20});
    services.forEach((s) => {
        console.log("++ " + s.sid + s.friendlyName);
        console.log("+++ codeLength: " + s.codeLength + ", defaultTemplateSid: "+ s.defaultTemplateSid);
        // console.log("+++ " + JSON.stringify(s));
    });
}
listServices();
