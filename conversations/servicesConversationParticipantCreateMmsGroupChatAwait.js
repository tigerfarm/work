console.log("++ Create an Chat participant for an MMS conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
//
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";
const recipientPhoneNumber = process.env.MASTER_PHONE_NUMBER_1;
participantIdentity = 'dave13';
console.log("+ Conversation SID: " + conversationSid + " Participant Identity: " + participantIdentity);
//
(async () => {
    try {
        // Returns the response from the Twilio HTTP request.
        return await client.conversations.services(serviceSid)
                .conversations(conversationSid)
                .participants
                .create({
                    messagingBinding: {
                        projectedAddress: process.env.MASTER_PHONE_NUMBER_1
                    },
                    identity: participantIdentity,
                    attributes: JSON.stringify({name: participantIdentity})
                });
    } catch (e) {
        console.log("- Error status:code:message: " + e.status + ":" + e.code + ":" + e.message);
        // return e;
    }
})().then(res => {
    if (typeof (res) === "undefined") {
        // There was an error above.
        return;
    }
    // Process the response.
    console.log("+ Response: ");
    console.log("+ Conversation participant SID: " + res.sid);
    console.log("+ messagingBinding.type, projected_address: " + res.messagingBinding.type + ", " + res.messagingBinding.projected_address);
    // console.log(res);
});

