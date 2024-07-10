console.log("++ Configure a Messaging Service with a verified domain name.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
theLinkDomain = "DNac01d2597153be7120d9e4f4368f8314";
theLinkMsgService = "MG634319110a48b2e82f1a08247cd8f0ba";
console.log("+ Account SID: " + process.env.MAIN_ACCOUNT_SID
        + ", theLinkDomain: " + theLinkDomain
        + ", theLinkMsgService: " + theLinkMsgService);
// Associates a domain shortening SID with a messaging service SID.
client.messaging.v1
        .linkshorteningMessagingService(
                theLinkDomain,
                theLinkMsgService
                ).create()
        .then((message) => console.log("+ Message sent, SID: " + message.sid))
        .catch(function (err) {
            console.error("- Error: " + err.message + ", code: " + err.code);
        });
