console.log("++ Create an Chat participant for a conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";
const recipientPhoneNumber = process.env.MASTER_PHONE_NUMBER_1;
participantIdentity = 'dave1';
console.log("+ Conversation SID: " + conversationSid + " Participant Identity: " + participantIdentity);


// Doesn't work
(async function () {
    await client.conversations.services(serviceSid)
            .conversations(conversationSid)
            .participants
            .create({
                messagingBinding: {
                    projectedAddress: process.env.MASTER_PHONE_NUMBER_1
                },
                identity: participantIdentity,
                attributes: JSON.stringify({name: participantIdentity})
            });
});
