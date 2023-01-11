console.log("++ Create A2P Messaging campaign use case for default and advanced opt-out users.");
// https://www.twilio.com/docs/sms/a2p-10dlc/onboarding-isv-api-low-volume?code-sample=code-create-a2p-messaging-campaign-use-case-for-default-and-advanced-opt-out-users&code-language=Node.js&code-sdk-version=3.x
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
client.messaging.v1.services('MG634319110a48b2e82f1a08247cd8f0ba')
        .usAppToPerson
        .create({
            optInKeywords: ['START', 'BEGIN'],
            optInMessage: 'Thanks for subscribing',
            description: 'Send marketing messages about sales and offers',
            message_flow: 'End user consent is received by email today',
            messageSamples: ['Message Sample 1', 'Message Sample 2'],
            usAppToPersonUsecase: 'MARKETING',
            hasEmbeddedLinks: true,
            hasEmbeddedPhone: true,
            brandRegistrationSid: 'BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
        }, function (err) {
            if (err) {
                console.error("- Error: " + err.message + ", code: " + err.code);
                console.log("--- Exit.");
            }
        }).then(us_app_to_person => console.log(us_app_to_person.sid));
