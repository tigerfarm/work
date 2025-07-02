console.log("++ List Messaging Services with a verified domain name.");
// Program is not tested.
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Account SID: " + process.env.MAIN_ACCOUNT_SID);
client.messaging.v1.linkshorteningMessagingService({
    domainSid:"DNac01d2597153be7120d9e4f4368f8314",
    messagingServiceSid:"MG634319110a48b2e82f1a08247cd8f0ba"
    }).list()
        .then(m =>
            m.forEach(
                    m => console.log("+ Message service, SID: " + m.sid)
            ));
